import { api } from '~/utils/api'
import { LoadingPage } from './loading'
import { Tab, RadioGroup, Transition, Dialog } from '@headlessui/react'
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckCircle, XCircle } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import SquatOneRM from './settings/squatOneRM'
import BenchOneRM from './settings/benchOneRM'
import DeadOneRM from './settings/deadOneRM'
import Weight from './settings/weight'
import Gender from './settings/gender'

const userIdAtom = atom('')
const isAdminAtom = atom(false)

const inputIdAtom = atom('')
const inputValAtom = atom('')
const inputIsOpenAtom = atom(false)
const inputIsNotesAtom = atom(false)

const timeAtom1 = atom('')
const timeAtom2 = atom('')
const isTimeOpenAtom = atom(false)

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const RadioOption = ({
  value,
  lift,
  round,
  isComplete,
}: {
  value: string
  lift: string
  round: string
  isComplete: boolean
}) => {
  const isAdmin = useAtomValue(isAdminAtom)
  const userId = useAtomValue(userIdAtom)

  const setIsOpen = useSetAtom(inputIsOpenAtom)
  const setInputId = useSetAtom(inputIdAtom)
  const setInputVal = useSetAtom(inputValAtom)

  const { data: plan } = api.plans.get.useQuery({
    userId: userId,
  })
  if (!plan) return null
  return (
    <RadioGroup.Option value={value}>
      {({ checked }) => (
        <div
          className={classNames(
            'p-2',
            checked && !isComplete ? 'scale-105 text-white' : 'text-gray-600',
            isAdmin ? 'cursor-pointer' : '',
          )}
          onClick={() => {
            if (!isAdmin) return
            setInputId(
              plan.value?.find((v) => v.name === `${lift}${round}${value}`)
                ?.id || '',
            )
            setInputVal(
              plan.value?.find((v) => v.name === `${lift}${round}${value}`)
                ?.value || '',
            )
            setIsOpen(true)
          }}
        >
          <div
            className={classNames(
              '',
              plan.value?.find((v) => v.name === `${lift}${round}${value}`)
                ?.isComplete
                ? plan.value?.find((v) => v.name === `${lift}${round}${value}`)
                    ?.isGoodLift
                  ? 'scale-110 text-green-500'
                  : 'scale-110 text-red-500'
                : '',
            )}
          >
            {
              plan.value?.find((v) => v.name === `${lift}${round}${value}`)
                ?.value
            }
            <span className='text-xl font-semibold'>kg</span>
          </div>
        </div>
      )}
    </RadioGroup.Option>
  )
}

const AttemptPanel = ({ lift, round }: { lift: string; round: number }) => {
  const ctx = api.useContext()
  const [checked, setChecked] = useState('2')
  const userId = useAtomValue(userIdAtom)
  const isAdmin = useAtomValue(isAdminAtom)

  const { data: plan } = api.plans.get.useQuery({
    userId: userId,
  })

  const { mutate: completeField } = api.plans.complete.useMutation({
    onMutate: async (newData) => {
      await ctx.plans.get.cancel({ userId: userId })
      const previousValue = ctx.plans.get.getData({ userId: userId })

      if (!previousValue) return

      ctx.plans.get.setData(
        {
          userId: userId,
        },
        {
          ...previousValue,
          value: previousValue.value?.map((v) => {
            if (v.id === newData.id) {
              return {
                ...v,
                isComplete: newData.value,
                isGoodLift: newData.isGood || false,
              }
            }
            return v
          }),
        },
      )
      return { previousValue }
    },
    onError: (err, newData, rollback) => {
      ctx.plans.get.setData(
        {
          userId: userId,
        },
        rollback?.previousValue,
      )
    },
  })

  const onCheck = (value: boolean) => {
    completeField({
      id:
        plan?.value?.find((v) => v.name === `${lift}${round}${checked}`)?.id ||
        '',
      value: true,
      isGood: value,
    })
  }

  const onClear = () => {
    completeField({
      id: plan?.value?.find((v) => v.name === `${lift}${round}1`)?.id || '',
      value: false,
    })
    completeField({
      id: plan?.value?.find((v) => v.name === `${lift}${round}2`)?.id || '',
      value: false,
    })
    completeField({
      id: plan?.value?.find((v) => v.name === `${lift}${round}3`)?.id || '',
      value: false,
    })
  }

  const isComplete =
    plan?.value?.find((v) => v.name === `${lift}${round}1`)?.isComplete ||
    plan?.value?.find((v) => v.name === `${lift}${round}2`)?.isComplete ||
    plan?.value?.find((v) => v.name === `${lift}${round}3`)?.isComplete

  if (!plan) return null
  return (
    <div className='relative flex items-center justify-between px-8 py-4 text-xl font-semibold'>
      <div className='text-6xl font-bold text-yellow-500'>{round}</div>
      <RadioGroup
        value={checked}
        onChange={(e) => {
          if (isComplete) return
          if (isAdmin) return
          setChecked(e)
        }}
      >
        <div className='flex flex-col items-center text-5xl font-bold'>
          <RadioOption
            value='1'
            lift={lift}
            round={`${round}`}
            isComplete={isComplete || false}
          />
          <RadioOption
            value='2'
            lift={lift}
            round={`${round}`}
            isComplete={isComplete || false}
          />
          <RadioOption
            value='3'
            lift={lift}
            round={`${round}`}
            isComplete={isComplete || false}
          />
        </div>
      </RadioGroup>
      <div className='flex flex-col gap-8'>
        <CheckCircle
          className={classNames(
            'h-8 w-8 text-gray-600',
            isAdmin ? 'hidden' : '',
          )}
          onClick={() => {
            if (isAdmin) return
            if (isComplete) return
            onCheck(true)
          }}
        />
        <XCircle
          className={classNames(
            'h-8 w-8 text-gray-600',
            isAdmin ? 'hidden' : '',
          )}
          onClick={() => {
            if (isAdmin) return
            if (isComplete) return
            onCheck(false)
          }}
        />
      </div>
      <XMarkIcon
        className={classNames(
          'absolute right-0 top-4 h-6 w-6 text-gray-400',
          isAdmin ? 'hidden' : '',
        )}
        onClick={() => {
          if (isAdmin) return
          onClear()
        }}
      />
    </div>
  )
}

const TimeWrapper = () => {
  const ctx = api.useContext()

  const userId = useAtomValue(userIdAtom)
  const isOpen = useAtomValue(isTimeOpenAtom)
  const setIsOpen = useSetAtom(isTimeOpenAtom)
  const id = useAtomValue(inputIdAtom)

  const [value1, setValue1] = useAtom(timeAtom1)
  const [value2, setValue2] = useAtom(timeAtom2)

  const { mutate } = api.plans.updateTime.useMutation({
    onSuccess: () => {
      void ctx.plans.get.invalidate({ userId: userId })
    },
  })

  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsOpen(true)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto text-gray-200'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-visible rounded-2xl bg-gray-900 p-6 text-left align-middle transition-all'>
                <div className='flex justify-center text-xl'>
                  <Input
                    className='w-12 bg-gray-900 text-xl'
                    value={value1}
                    onChange={(e) => {
                      if (e.target.value.length > 2) return
                      setValue1(e.target.value)
                    }}
                  />
                  <span className='flex h-10 items-center py-2 text-xl'>:</span>
                  <Input
                    className='w-12 bg-gray-900 text-xl'
                    value={value2}
                    onChange={(e) => {
                      if (e.target.value.length > 2) return
                      setValue2(e.target.value)
                    }}
                  />
                </div>
                <div className='mt-4 flex justify-center gap-2'>
                  <Button
                    onClick={() => {
                      if (value1.length == 1) {
                        mutate({ id: id, time: '0' + value1 + value2 })
                      } else {
                        mutate({ id: id, time: value1 + value2 })
                      }
                      setIsOpen(false)
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const ModalWrapper = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (args: boolean) => void
}) => {
  const ctx = api.useContext()

  const userId = useAtomValue(userIdAtom)
  const value = useAtomValue(inputValAtom)
  const setValue = useSetAtom(inputValAtom)
  const id = useAtomValue(inputIdAtom)
  const isNotes = useAtomValue(inputIsNotesAtom)

  const { mutate } = api.plans.update.useMutation({
    onSuccess: () => {
      void ctx.plans.get.invalidate({ userId: userId })
    },
  })

  const { mutate: mutateNotes } = api.plans.updateNotes.useMutation({
    onSuccess: () => {
      void ctx.plans.get.invalidate({ userId: userId })
    },
  })
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsOpen(true)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto text-gray-200'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-visible rounded-2xl bg-gray-900 p-6 text-left align-middle transition-all'>
                <Input
                  className='bg-gray-900'
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                  }}
                />
                <div className='mt-4 flex justify-center gap-2'>
                  <Button
                    onClick={() => {
                      if (!value) return
                      if (isNotes) {
                        mutateNotes({ id: id, notes: value })
                      } else {
                        mutate({ id: id, value: value })
                      }
                      setIsOpen(false)
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const LiftPanel = ({ lift }: { lift: string }) => {
  const ctx = api.useContext()
  const userId = useAtomValue(userIdAtom)
  const isAdmin = useAtomValue(isAdminAtom)

  const setInputId = useSetAtom(inputIdAtom)
  const setInputVal = useSetAtom(inputValAtom)
  const setInputIsOpen = useSetAtom(inputIsOpenAtom)
  const setInputIsNotes = useSetAtom(inputIsNotesAtom)

  const setIsTimeOpen = useSetAtom(isTimeOpenAtom)
  const setValue1 = useSetAtom(timeAtom1)
  const setValue2 = useSetAtom(timeAtom2)

  const { data: plan } = api.plans.get.useQuery({
    userId: userId,
  })

  const { mutate: deleteWarmup } = api.plans.deleteValue.useMutation({
    onSuccess: () => {
      void ctx.plans.get.invalidate({ userId: userId })
    },
  })

  const { mutate: completeField } = api.plans.complete.useMutation({
    onMutate: async (newData) => {
      await ctx.plans.get.cancel({ userId: userId })
      const previousValue = ctx.plans.get.getData({ userId: userId })

      if (!previousValue) return

      ctx.plans.get.setData(
        {
          userId: userId,
        },
        {
          ...previousValue,
          value: previousValue.value?.map((v) => {
            if (v.id === newData.id) {
              return {
                ...v,
                isComplete: newData.value,
              }
            }
            return v
          }),
        },
      )
      return { previousValue }
    },
    onError: (err, newData, rollback) => {
      ctx.plans.get.setData(
        {
          userId: userId,
        },
        rollback?.previousValue,
      )
    },
  })

  if (!plan) return null
  return (
    <div>
      <Tab.Panel>
        <div className='flex flex-col gap-8'>
          <h2 className='text-3xl font-bold '>Warmup</h2>
          <div className='flex flex-col divide-y divide-dashed divide-gray-600 rounded-xl border border-gray-800 p-4 text-xl'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                className={classNames(
                  'relative grid grid-cols-8 items-center py-2 font-semibold',
                  plan.value?.find((v) => v.name === `${lift}w${i}`)?.value ===
                    ''
                    ? 'hidden'
                    : '',
                  plan.value?.find((v) => v.name === `${lift}w${i}`)?.isComplete
                    ? 'text-yellow-500'
                    : '',
                )}
                key={i}
              >
                <div
                  className='col-span-2 cursor-pointer'
                  onClick={() => {
                    setValue1(
                      plan.value
                        ?.find((v) => v.name === `${lift}w${i}`)
                        ?.time?.slice(0, 2) || '',
                    )
                    setValue2(
                      plan.value
                        ?.find((v) => v.name === `${lift}w${i}`)
                        ?.time?.slice(2) || '',
                    )
                    setInputId(
                      plan.value?.find((v) => v.name === `${lift}w${i}`)?.id ||
                        '',
                    )
                    setIsTimeOpen(true)
                  }}
                >
                  {plan.value
                    ?.find((v) => v.name === `${lift}w${i}`)
                    ?.time?.slice(0, 2)}
                  :
                  {plan.value
                    ?.find((v) => v.name === `${lift}w${i}`)
                    ?.time?.slice(2)}
                </div>
                <div
                  className={`col-span-2 place-self-center ${
                    isAdmin ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => {
                    if (!isAdmin) return
                    setInputIsNotes(false)
                    setInputId(
                      plan.value?.find((v) => v.name === `${lift}w${i}`)?.id ||
                        '',
                    )
                    setInputVal(
                      plan.value?.find((v) => v.name === `${lift}w${i}`)
                        ?.value || '',
                    )
                    setInputIsOpen(true)
                  }}
                >
                  {plan.value?.find((v) => v.name === `${lift}w${i}`)?.value}kg
                </div>
                <div className='place-self-end'>
                  <XMarkIcon className='h-7 w-7' />
                </div>
                <div
                  className={`col-span-2 place-self-center ${
                    isAdmin ? 'cursor-pointer px-4' : ''
                  }`}
                  onClick={() => {
                    if (!isAdmin) return
                    setInputIsNotes(true)
                    setInputId(
                      plan.value?.find((v) => v.name === `${lift}w${i}`)?.id ||
                        '',
                    )
                    setInputVal(
                      plan.value?.find((v) => v.name === `${lift}w${i}`)
                        ?.notes || '',
                    )
                    setInputIsOpen(true)
                  }}
                >
                  {plan.value?.find((v) => v.name === `${lift}w${i}`)?.notes}
                </div>
                <div
                  className='place-self-end'
                  onClick={() => {
                    if (isAdmin) return
                    completeField({
                      id:
                        plan.value?.find((v) => v.name === `${lift}w${i}`)
                          ?.id || '',
                      value:
                        !plan.value?.find((v) => v.name === `${lift}w${i}`)
                          ?.isComplete || false,
                    })
                  }}
                >
                  {!isAdmin && <CheckCircle className='h-6 w-6' />}
                </div>
                {isAdmin && (
                  <div className='absolute right-0 top-3'>
                    <XCircle
                      className='h-6 w-6 cursor-pointer hover:text-red-500'
                      onClick={() => {
                        deleteWarmup({
                          id:
                            plan.value?.find((v) => v.name === `${lift}w${i}`)
                              ?.id || '',
                        })
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
            {isAdmin && false && (
              <div className='flex w-full justify-center py-2'>
                <PlusCircleIcon
                  className='h-8 w-8 cursor-pointer border-t-0 text-gray-200 hover:text-yellow-500'
                  onClick={() => {
                    console.log('add warmup')
                  }}
                />
              </div>
            )}
          </div>
          <div className='flex flex-col gap-6'>
            <h2 className='text-3xl font-bold '>Attempts</h2>
            <div className='flex flex-col divide-y divide-dashed divide-gray-400 rounded-xl border border-gray-800 p-4'>
              {[1, 2, 3].map((i) => (
                <AttemptPanel
                  key={i}
                  lift={lift}
                  round={i}
                />
              ))}
            </div>
          </div>
        </div>
      </Tab.Panel>
    </div>
  )
}

const TabWrapper = ({ title }: { title: string }) => (
  <Tab
    className={({ selected }) =>
      classNames(
        'cursor-pointer px-3 py-2 focus:outline-none',
        selected
          ? 'border-b-2 border-yellow-500 font-semibold text-yellow-500'
          : '',
      )
    }
  >
    {title}
  </Tab>
)

const calculateOldWilks = (
  bodyWeight: number,
  weightLifted: number,
  isFemale: boolean,
) => {
  const maleCoeff = [
    -216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-6, -1.291e-8,
  ]
  const femaleCoeff = [
    594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913,
    4.731582e-5, -9.054e-8,
  ]
  let denominator = isFemale ? femaleCoeff[0] : maleCoeff[0]
  let coeff = isFemale ? femaleCoeff : maleCoeff
  let minbw = isFemale ? 26.51 : 40
  let maxbw = isFemale ? 154.53 : 201.9
  let bw = Math.min(Math.max(bodyWeight, minbw), maxbw)

  for (let i = 1; i < coeff.length; i++) {
    denominator += coeff[i] * Math.pow(bw, i)
  }

  let score = (500 / denominator) * weightLifted
  return score.toFixed(2)
}

const calculateNewWilks = (
  bodyWeight: number,
  weightLifted: number,
  isFemale: boolean,
) => {
  const maleCoeff = [
    47.4617885411949, 8.47206137941125, 0.073694103462609, -1.39583381094385e-3,
    7.07665973070743e-6, -1.20804336482315e-8,
  ]
  const femaleCoeff = [
    -125.425539779509, 13.7121941940668, -0.0330725063103405,
    -1.0504000506583e-3, 9.38773881462799e-6, -2.3334613884954e-8,
  ]
  let denominator = isFemale ? femaleCoeff[0] : maleCoeff[0]
  let coeff = isFemale ? femaleCoeff : maleCoeff
  let minbw = 40
  let maxbw = isFemale ? 150.95 : 200.95
  let bw = Math.min(Math.max(bodyWeight, minbw), maxbw)

  for (let i = 1; i < coeff.length; i++) {
    denominator += coeff[i] * Math.pow(bw, i)
  }

  let score = (600 / denominator) * weightLifted
  return score.toFixed(2)
}

const calculateDOTS = (
  bodyWeight: number,
  weightLifted: number,
  isFemale: boolean,
) => {
  const maleCoeff = [
    -307.75076, 24.0900756, -0.1918759221, 0.0007391293, -0.000001093,
  ]

  const femaleCoeff = [
    -57.96288, 13.6175032, -0.1126655495, 0.0005158568, -0.0000010706,
  ]

  let denominator = isFemale ? femaleCoeff[0] : maleCoeff[0]
  if (!denominator) return '0.00'
  const coeff = isFemale ? femaleCoeff : maleCoeff
  const maxbw = isFemale ? 150 : 210
  const bw = Math.min(Math.max(bodyWeight, 40), maxbw)

  for (let i = 1; i < coeff.length; i++) {
    denominator += coeff[i] * Math.pow(bw, i)
  }

  const score = (500 / denominator) * weightLifted
  return score.toFixed(2)
}

const CompPlan = ({
  userId,
  isAdmin = false,
}: {
  userId: string
  isAdmin: boolean
}) => {
  const { data: plan, isLoading: planLoading } = api.plans.get.useQuery({
    userId: userId,
  })

  const { data: settings } = api.settings.get.useQuery({
    userId: userId,
  })

  console.log('plan', plan)

  const gender = settings?.gender
  const isFemale = gender === 'female' ? true : false
  const weight = Number(settings?.weight)
  const _squat = () => {
    const squats = plan?.value?.filter(
      (v) => v.name.includes('s') && !v.name.includes('sw'),
    )
    console.log('squats', squats)
    if (
      squats?.reduce(
        (acc, idx) => (idx.isComplete && idx.isGoodLift ? false : acc),
        true,
      )
    )
      return Number(plan?.value?.find((v) => v.name === 's12')?.value || '')
    return (
      squats?.reduce((acc, idx) => {
        if (!idx.isComplete) return acc
        if (!idx.isGoodLift) return acc
        if (Number(idx.value) > acc) return Number(idx.value)
        return acc
      }, 0) || 0
    )
  }
  const _bench = () => {
    const benches = plan?.value?.filter(
      (v) => v.name.includes('b') && !v.name.includes('bw'),
    )
    console.log('benches', benches)
    if (
      benches?.reduce(
        (acc, idx) => (idx.isComplete && idx.isGoodLift ? false : acc),
        true,
      )
    )
      return Number(plan?.value?.find((v) => v.name === 'b12')?.value || '')
    return (
      benches?.reduce((acc, idx) => {
        if (!idx.isComplete) return acc
        if (!idx.isGoodLift) return acc
        if (Number(idx.value) > acc) return Number(idx.value)
        return acc
      }, 0) || 0
    )
  }
  const _deadlift = () => {
    const deadlifts = plan?.value?.filter((v) => v.name.includes('d'))
    console.log('deadlifts', deadlifts)
    if (
      deadlifts?.reduce(
        (acc, idx) => (idx.isComplete && idx.isGoodLift ? false : acc),
        true,
      )
    )
      return Number(plan?.value?.find((v) => v.name === 'd12')?.value || '')
    return (
      deadlifts?.reduce((acc, idx) => {
        if (!idx.isComplete) return acc
        if (!idx.isGoodLift) return acc
        if (Number(idx.value) > acc) return Number(idx.value)
        return acc
      }, 0) || 0
    )
  }
  const squat = _squat()
  const bench = _bench()
  const deadlift = _deadlift()
  const total = squat + bench + deadlift

  const DOTS = calculateDOTS(weight, total, isFemale)
  const oldWILKS = calculateOldWilks(weight, total, isFemale)
  const newWILKS = calculateNewWilks(weight, total, isFemale)

  const setUserId = useSetAtom(userIdAtom)
  const setAdmin = useSetAtom(isAdminAtom)

  const inputIsOpen = useAtomValue(inputIsOpenAtom)
  const setModalIsOpen = useSetAtom(inputIsOpenAtom)

  useEffect(() => {
    setUserId(userId)
    setAdmin(isAdmin)
  }, [userId, isAdmin, setUserId, setAdmin])

  if (planLoading) return <LoadingPage />
  if (!plan) return null
  return (
    <div className='my-4 text-lg'>
      <div className='flex flex-col gap-2 mb-4 max-w-xl'>
        <div className='flex justify-around gap-1'>
          <SquatOneRM
            defaultValue={settings?.squatOneRepMax || 0}
            userId={userId}
          />
          <BenchOneRM
            defaultValue={settings?.benchOneRepMax || 0}
            userId={userId}
          />
          <DeadOneRM
            defaultValue={settings?.deadliftOneRepMax || 0}
            userId={userId}
          />
        </div>
        <div className='flex justify-around gap-1'>
          <Weight
            defaultValue={settings?.weight || 0}
            userId={userId}
          />
          <Gender
            defaultValue={settings?.gender || ''}
            userId={userId}
          />
        </div>
      </div>
      {weight ? (
        <div className='flex gap-1 px-6 font-semibold'>
          {gender === null || gender === '' ? (
            <div>
              <div>missing gender</div>
            </div>
          ) : (
            <div>
              <div>Total: {total}kg</div>
              <div>Dots: {DOTS}</div>
              <div>Old WILKS: {oldWILKS}</div>
              <div>New WILKS: {newWILKS}</div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div>Add weight for user</div>
        </div>
      )}
      <Tab.Group defaultIndex={0}>
        <div className='flex w-full max-w-screen-md flex-col gap-4 lg:gap-16'>
          <Tab.List className='flex w-full justify-around text-2xl'>
            <TabWrapper title='Squat' />
            <TabWrapper title='Bench' />
            <TabWrapper title='Deadlift' />
          </Tab.List>
          <Tab.Panels className='w-full px-4 py-2 '>
            <LiftPanel lift='s' />
            <LiftPanel lift='b' />
            <LiftPanel lift='d' />
          </Tab.Panels>
        </div>
      </Tab.Group>
      <ModalWrapper
        isOpen={inputIsOpen}
        setIsOpen={setModalIsOpen}
      />
      <TimeWrapper />
    </div>
  )
}

export default CompPlan

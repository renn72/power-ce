import { api } from '~/utils/api'
import { LoadingPage } from './loading'
import { Tab, RadioGroup, Transition, Dialog } from '@headlessui/react'
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckCircle, XCircle } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const userIdAtom = atom('')
const isAdminAtom = atom(false)

const inputIdAtom = atom('')
const inputValAtom = atom('')
const inputIsOpenAtom = atom(false)
const inputIsNotesAtom = atom(false)

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

  console.log('plan', plan)

  if (!plan) return null
  return (
    <Tab.Panel>
      <div className='flex flex-col gap-8'>
        <h2 className='text-3xl font-bold '>Warmup</h2>
        <div className='flex flex-col divide-y divide-dashed divide-gray-600 rounded-xl border border-gray-800 p-4 text-xl'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              className={classNames(
                'relative grid grid-cols-7 items-center py-2 font-semibold',
                plan.value?.find((v) => v.name === `${lift}w${i}`)?.value === ''
                  ? 'hidden'
                  : '',
                plan.value?.find((v) => v.name === `${lift}w${i}`)?.isComplete
                  ? 'text-yellow-500'
                  : '',
              )}
              key={i}
            >
              <div className=''>{i}.</div>
              <div
                className={`col-span-2 place-self-start ${
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
                    plan.value?.find((v) => v.name === `${lift}w${i}`)?.value ||
                      '',
                  )
                  setInputIsOpen(true)
                }}
              >
                {plan.value?.find((v) => v.name === `${lift}w${i}`)?.value}kg
              </div>
              <div className='place-self-center'>
                <XMarkIcon className='h-7 w-7' />
              </div>
              <div
                className={`col-span-2 place-self-start ${
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
                    plan.value?.find((v) => v.name === `${lift}w${i}`)?.notes ||
                      '',
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
                      plan.value?.find((v) => v.name === `${lift}w${i}`)?.id ||
                      '',
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
          {isAdmin && (
            <div className='flex w-full justify-center py-2'>
              <PlusCircleIcon
                className='h-8 w-8 border-t-0 text-gray-200 cursor-pointer hover:text-yellow-500'
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

  const setUserId = useSetAtom(userIdAtom)
  const setAdmin = useSetAtom(isAdminAtom)

  const inputId = useAtomValue(inputIdAtom)
  const inputVal = useAtomValue(inputValAtom)
  const inputIsOpen = useAtomValue(inputIsOpenAtom)
  const setModalIsOpen = useSetAtom(inputIsOpenAtom)

  useEffect(() => {
    setUserId(userId)
    setAdmin(isAdmin)
  }, [userId, isAdmin])

  if (planLoading) return <LoadingPage />
  if (!plan) return null
  return (
    <div className='my-8 text-lg'>
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
    </div>
  )
}

export default CompPlan

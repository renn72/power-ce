import { api } from '~/utils/api'
import { LoadingPage } from './loading'
import { Tab, RadioGroup } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const RadioOption = ({
  value,
  lift,
  round,
  userId,
  isComplete,
}: {
  value: string
  lift: string
  round: string
  userId: string
  isComplete: boolean
}) => {
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
          )}
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

const AttemptPanel = ({
  lift,
  userId,
  round,
}: {
  lift: string
  userId: string
  round: number
}) => {
  const ctx = api.useContext()
  const [checked, setChecked] = useState('2')

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
      <div className='text-5xl font-bold text-yellow-500'>{round}</div>
      <RadioGroup
        value={checked}
        onChange={(e) => {
          if (isComplete) return
          setChecked(e)
        }}
      >
        <div className='flex flex-col items-center text-4xl font-bold'>
          <RadioOption
            value='1'
            lift={lift}
            round={`${round}`}
            userId={userId}
            isComplete={isComplete || false}
          />
          <RadioOption
            value='2'
            lift={lift}
            round={`${round}`}
            userId={userId}
            isComplete={isComplete || false}
          />
          <RadioOption
            value='3'
            lift={lift}
            round={`${round}`}
            userId={userId}
            isComplete={isComplete || false}
          />
        </div>
      </RadioGroup>
      <div className='flex flex-col gap-8'>
        <CheckCircle
          className={classNames('h-8 w-8 text-gray-600')}
          onClick={() => {
            if (isComplete) return
            onCheck(true)
          }}
        />
        <XCircle
          className={classNames('h-8 w-8 text-gray-600')}
          onClick={() => {
            if (isComplete) return
            onCheck(false)
          }}
        />
      </div>
      <XMarkIcon
        className='absolute right-0 top-4 h-6 w-6 text-gray-400'
        onClick={onClear}
      />
    </div>
  )
}

const LiftPanel = ({ lift, userId }: { lift: string; userId: string }) => {
  const ctx = api.useContext()
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
    <Tab.Panel>
      <div className='flex flex-col gap-8'>
        <h2 className='text-3xl font-bold '>Warmup</h2>
        <div className='flex flex-col divide-y divide-dashed divide-gray-600 rounded-xl border border-gray-800 p-4 text-xl'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              className={classNames(
                'grid grid-cols-7 items-center py-2 font-semibold',
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
              <div className='col-span-2 place-self-start'>
                {plan.value?.find((v) => v.name === `${lift}w${i}`)?.value}kg
              </div>
              <div className='place-self-center'>
                <XMarkIcon className='h-7 w-7' />
              </div>
              <div className='col-span-2 place-self-center'>
                {plan.value?.find((v) => v.name === `${lift}w${i}`)?.notes}
              </div>
              <div
                className='place-self-end'
                onClick={() => {
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
                <CheckCircle className='h-6 w-6' />
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-6'>
          <h2 className='text-3xl font-bold '>Attempts</h2>
          <div className='flex flex-col divide-y divide-dashed divide-gray-400 rounded-xl border border-gray-800 p-4'>
            {[1, 2, 3].map((i) => (
              <AttemptPanel
                key={i}
                lift={lift}
                userId={userId}
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

  console.log('plan', plan)

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
            <LiftPanel
              lift='s'
              userId={userId}
            />
            <LiftPanel
              lift='b'
              userId={userId}
            />
            <LiftPanel
              lift='d'
              userId={userId}
            />
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  )
}

export default CompPlan

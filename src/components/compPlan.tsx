import { api } from '~/utils/api'
import { LoadingPage } from './loading'
import { Tab } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CheckCircle } from 'lucide-react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
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
          <div className='flex flex-col border border-gray-800 rounded-xl divide-y divide-gray-400 divide-dashed p-4'>
            {[1, 2, 3].map((i) => (
              <div
                className='flex items-center gap-12 px-8 text-xl font-semibold py-4'
                key={i}
              >
                <div className='text-5xl font-bold text-yellow-500'>{i}</div>
                <div className='flex flex-col items-center gap-1 text-4xl font-bold'>
                  <div className='text-gray-500'>
                    {plan.value?.find((v) => v.name === `${lift}${i}1`)?.value}
                    <span className='text-xl font-semibold'>kg</span>
                  </div>
                  <div>
                    {plan.value?.find((v) => v.name === `${lift}${i}2`)?.value}
                    <span className='text-xl font-semibold'>kg</span>
                  </div>
                  <div className='text-gray-500'>
                    {plan.value?.find((v) => v.name === `${lift}${i}3`)?.value}
                    <span className='text-xl font-semibold'>kg</span>
                  </div>
                </div>
              </div>
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
      <Tab.Group defaultIndex={1}>
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

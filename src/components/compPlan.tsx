import { api } from '~/utils/api'
import { LoadingPage } from './loading'
import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const TabWrapper = ({ title }: { title: string }) => (
  <Tab
    className={({ selected }) =>
      classNames(
        'px-3 py-2 focus:outline-none cursor-pointer',
        selected
          ? 'border-b-2 border-yellow-500 font-semibold text-yellow-500'
          : '',
      )
    }
  >
    {title}
  </Tab>
)

const CompPlan = ({ userId }: { userId: string }) => {
  const { data: plan, isLoading: planLoading } = api.plans.get.useQuery({
    userId: userId,
  })

  console.log('plan', plan)

  if (planLoading) return <LoadingPage />
  if (!plan) return null
  return (
    <div className='my-8'>
      <Tab.Group defaultIndex={1}>
        <div className='flex flex-col w-full max-w-screen-md gap-4 lg:gap-16'>
          <Tab.List className='flex justify-around text-2xl w-full'>
            <TabWrapper title='Squat' />
            <TabWrapper title='Bench' />
            <TabWrapper title='Deadlift' />
          </Tab.List>
          <Tab.Panels className='w-full '>
            <Tab.Panel></Tab.Panel>

            <Tab.Panel></Tab.Panel>

            <Tab.Panel></Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  )
}

export default CompPlan

import React, {
  useState, Fragment,
} from 'react'
import dayjs from 'dayjs'

import {
  Dialog,
  Transition,
} from '@headlessui/react'
import { Input, } from '@/components/ui/input'
import { toast, } from 'react-hot-toast'

import {
  ArrowUpIcon,
  ArrowDownIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { api, } from '~/utils/api'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const LiftCard = (
  {
    lift,
    oneRM,
    date,
    onUpdateOneRM,
    percentage,
  }: {
    lift: string,
    oneRM: string,
    date: string,
    onUpdateOneRM: (arg0: string, arg1: number) => void,
    percentage: string,
  }
) => {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false)

  const [
    newOneRM,
    setNewOneRM,
  ] = useState(parseFloat(oneRM))

  const onSave = () => {
    const liftname = lift === 'Dead' ? 'deadlift' : lift.toLowerCase()
    onUpdateOneRM(liftname, newOneRM)
    closeModal()
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const increment = () => {
    setNewOneRM(Math.floor(newOneRM / 2.5) * 2.5 + 2.5)
  }
  const decrement = () => {
    setNewOneRM(Math.ceil(newOneRM / 2.5) * 2.5 - 2.5)
  }

  return (
    <div className={
      `flex flex-col items-start justify-center
      py-1 md:py-2 px-2 md:px-4
`}>
      <div className='text-xs md:text-base text-gray-400 font-semi md:py-2 flex justify-between w-full'>
        <div>
          {lift}
        </div>
        <div className={`text-xxs md:text-sm ${+percentage > 0 ? 'text-green-500' : 'text-red-400'}`}>
          <ArrowUpIcon className={`inline-block h-4 w-4 ${oneRM && +percentage > 0 ? '' : 'hidden'}`} />
          <ArrowDownIcon className={`inline-block h-4 w-4 ${oneRM && +percentage < 0 ? '' : 'hidden'}`} />
          {percentage ? `${percentage}%` : ''}
        </div>
      </div>
      <div className='text-2xl md:text-4xl text-gray-100 font-bold md:py-2'>
        {oneRM}
        <span className='text-gray-400 text-xxs md:text-sm'>
          {oneRM ? ' kg' : 'unset'}
        </span>
      </div>
      <div className='flex flex-col md:flex-row justify-between items-center w-full'>
        <div className='text-xxs md:text-xs text-gray-400 font-semi md:py-2'>
          {oneRM ? date : ''}
        </div>
        <div
          className='text-xs text-gray-400 font-semi px-6 hover:text-gray-200 cursor-pointer'
          onClick={() => openModal()}
        >
          <PencilSquareIcon className='inline-block h-6 w-6' />
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
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
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-center align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-semibold leading-6 text-gray-900'
                  >
                    {lift} One Rep Max
                  </Dialog.Title>
                  <div className='mt-2 grid grid-cols-4 place-items-center justify-between items-center'>
                    <PlusCircleIcon className='inline-block h-10 w-10 hover:scale-110 text-gray-500 hover:text-gray-900 cursor-pointer' onClick={increment} />
                    <Input
                      type='number'
                      value={newOneRM}
                      onChange={(e) => setNewOneRM(parseFloat(e.target.value))}
                      className='text-3xl text-gray-900 bg-gray-100 col-span-2 font-semibold py-6 text-center focus:ring-gray-500 focus:border-gray-500 border-gray-300 rounded-md'
                    />
                    <MinusCircleIcon className='inline-block h-10 w-10 text-gray-500 hover:scale-110 hover:text-gray-900 cursor-pointer' onClick={decrement} />
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
                      onClick={onSave}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

const OneRMCard = () => {
  const ctx = api.useContext()
  const {
    data: userCoreOneRM, isLoading: userCoreOneRMLoading,
  } = api.oneRepMax.getUserCoreLifts.useQuery()
  const { mutate: updateUserCoreOneRM, } = api.oneRepMax.create.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success('Saved')
      void ctx.oneRepMax.getUserCoreLifts.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const squats = userCoreOneRM
    ?.filter((oneRM) => oneRM.lift === 'squat')
  const squat = squats?.[0]
  const squatPercentage = squats?.length > 1 ? (((parseFloat(squats[0]?.weight) / parseFloat(squats[1]?.weight)) - 1) * 100).toFixed(1) : ''

  const benchs = userCoreOneRM
    ?.filter((oneRM) => oneRM.lift === 'bench')
    .sort((a, b) => b.weight - a.weight)
  const bench = benchs?.[0]
  const benchPercentage = benchs?.length > 1 ? (((parseFloat(benchs[0]?.weight) / parseFloat(benchs[1]?.weight)) - 1) * 100).toFixed(1) : ''

  const deadlifts = userCoreOneRM
    ?.filter((oneRM) => oneRM.lift === 'deadlift')
    .sort((a, b) => b.weight - a.weight)
  const deadlift = deadlifts?.[0]
  const deadliftPercentage = deadlifts?.length > 1 ? (((parseFloat(deadlifts[0]?.weight) / parseFloat(deadlifts[1]?.weight)) - 1) * 100).toFixed(1) : ''

  const onUpdateOneRM = (lift: string, weight: number) => {
    updateUserCoreOneRM({
      weight: weight, lift: lift.toLowerCase(),
    })
  }

  if (userCoreOneRMLoading) return <div>loading</div>
  return (
    <>
      <div
        className={`grid text-gray-300 grid-cols-3 md:grid-cols-3 
                    border rounded-md border-gray-600
                    divide-x md:divide-x divide-gray-600
`}
      >
        <LiftCard
          lift='Squat'
          oneRM={squat?.weight.toString() || ''}
          date={dayjs(squat?.createdAt).fromNow()}
          onUpdateOneRM={onUpdateOneRM}
          percentage={squatPercentage}
        />
        <LiftCard
          lift='Bench'
          oneRM={bench?.weight.toString() || ''}
          date={dayjs(bench?.createdAt).fromNow()}
          onUpdateOneRM={onUpdateOneRM}
          percentage={benchPercentage}
        />
        <LiftCard
          lift='Dead'
          oneRM={deadlift?.weight.toString() || ''}
          date={dayjs(deadlift?.createdAt).fromNow()}
          onUpdateOneRM={onUpdateOneRM}
          percentage={deadliftPercentage}
        />
      </div>
    </>
  )
}

export default OneRMCard

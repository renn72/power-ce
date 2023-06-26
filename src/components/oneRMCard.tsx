import React from 'react'
import dayjs from 'dayjs'

import { api, } from '~/utils/api'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const LiftCard = (
  {
    lift,
    oneRM,
    date,
  }: {
    lift: string,
    oneRM: string,
    date: string,
  }
) => {
  return (
    <div className={
      `flex flex-col items-start justify-center
      py-2 px-4
`}>
      <div className='text-base text-gray-400 font-semi py-2'> {lift}</div>
      <div className='text-4xl text-gray-100 font-bold py-2'>
        {oneRM}
        <span className='text-gray-400 text-sm'> kg</span>
      </div>
      <div className='flex justify-between w-full'>
        <div className='text-xs text-gray-400 font-semi py-2'>
          {date}
        </div>
        <div className='text-xs text-gray-400 font-semi px-6 py-2 hover:text-gray-200 cursor-pointer'>
          update
        </div>
      </div>
    </div>
  )
}

const OneRMCard = () => {
  const {
    data: userCoreOneRM, isLoading: userCoreOneRMLoading,
  } = api.oneRepMax.getUserCoreLifts.useQuery()
  console.log('userCoreOneRM', userCoreOneRM)

  const squat = userCoreOneRM
    ?.filter((oneRM) => oneRM.lift === 'squat')
    .sort((a, b) => b.weight - a.weight)[0]
  console.log('squat', squat)

  const bench = userCoreOneRM
    ?.filter((oneRM) => oneRM.lift === 'bench')
    .sort((a, b) => b.weight - a.weight)[0]
  console.log('bench', bench)

  const deadlift = userCoreOneRM
    ?.filter((oneRM) => oneRM.lift === 'deadlift')
    .sort((a, b) => b.weight - a.weight)[0]
  console.log('deadlift', deadlift)

  if (userCoreOneRMLoading) return <div>loading</div>
  return (
    <>
      <div
        className={`grid text-gray-300 grid-cols-3 h-36 
                    border rounded-md border-gray-600
                    divide-x divide-gray-600
`}
      >
        <LiftCard
          lift='Squat'
          oneRM={squat?.weight.toString() || ''}
          date={dayjs(squat?.createdAt).fromNow()}
        />
        <LiftCard
          lift='Bench'
          oneRM={bench?.weight.toString() || ''}
          date={dayjs(bench?.createdAt).fromNow()}
        />
        <LiftCard
          lift='Deadlift'
          oneRM={deadlift?.weight.toString() || ''}
          date={dayjs(deadlift?.createdAt).fromNow()}
        />
      </div>
    </>
  )
}

export default OneRMCard

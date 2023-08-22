import { useState, } from 'react'

import { api, } from '~/utils/api'
import getWeight from '~/utils/getWeight'

const ProgramView = ({ userId, }: { userId: string }) => {

  const {
    data: userPrograms, isLoading: userProgramsLoading,
  } = api.userPrograms.getAll.useQuery()
  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()
  const { data: programsData, } = api.blocks.getAllPrograms.useQuery()
  const { data: userCoreOneRM, } = api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId, })

  const userProgram = userPrograms?.find((userProgram) => userProgram.userId === userId && userProgram.isProgramActive)
  const program = programsData?.find((program) => program.id === userProgram?.programId)
  console.log('program', program)
  console.log('rm', userCoreOneRM)

  if (!userProgram || !program) return null

  const checkWeight = (lift: string | null, onerm: number | null) => {
    if (!lift || !onerm) return ''
    const w = userCoreOneRM?.find((coreLift) => coreLift?.lift === lift.toLowerCase())?.weight

    if (!w) return ''

    return getWeight(+w, onerm,)
  }

  const blocksTitle = blocksData?.map((block) => block.name)
  return (
    <>
      <div className='flex flex-col gap-8 text-base sm:text-lg md:px-2'>
        {
          program.week.map((week, weekIndex) => (
            <div key={week.id}>
              <h1
                className='text-2xl font-bold mb-4'
              >Week {weekIndex + 1}</h1>
              <div className='grid grid-cols-7 md:px-2'>
                {
                  week.day.map((day, dayIndex) => (
                    <div key={day.id} className='hover:bg-gray-900 hover:rounded-md p-2'>
                      {
                        day.isRestDay
                          ? (
                            <div>
                              <h2
                                className='text-xl font-bold mb-4'
                              >
                                Day {dayIndex + 1}
                              </h2>
                              <h2 className='w-44'>Rest Day</h2>
                            </div>

                          )
                          : (
                            <div className='flex flex-col gap-4'>
                              <h2
                                className='text-xl font-bold mb-4'
                              >
                                Day {dayIndex + 1}
                              </h2>
                              <div className='flex flex-col divide-y divide-dashed divide-gray-600'>
                                {
                                  day.exercise.map((exercise, exerciseIndex) => (
                                    <div key={exercise.id}
                                      className='flex flex-col gap-1 py-2'
                                    >
                                      <div>
                                        <h3
                                          className='capitalize'
                                        >
                                          {exercise.name}
                                        </h3>
                                        <h3
                                          className='text-gray-600 text-xxs leading-none capitalize'
                                        >
                                          {exercise.lift != 'unlinked' && exercise.lift}
                                        </h3>
                                      </div>
                                      <div
                                        className='flex gap-4'>
                                        <h3>{exercise.sets}</h3>
                                        <h3>X</h3>
                                        <h3>{exercise.reps} reps</h3>
                                      </div>
                                      <div>
                                        {
                                          exercise.weightType === 'onerm'
                                          && (
                                            <div className='flex'>
                                              <h4>
                                                {checkWeight(exercise.lift, exercise?.onerm,)}
                                              </h4>
                                              <h4>-</h4>
                                              <h4>
                                                {checkWeight(exercise.lift, exercise?.onermTop,)}kg
                                              </h4>
                                            </div>

                                          )

                                        }
                                      </div>
                                      <h3
                                        className='text-gray-600 text-xxs'
                                      >
                                        {exercise.weightType}
                                      </h3>

                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          )
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default ProgramView

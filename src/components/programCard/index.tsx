import { type UserProgram, } from '@prisma/client'
import { api, } from '~/utils/api'
import getWeight from '~/utils/getWeight'

import ProgramDay from './programDay'
import { useUser, } from '@clerk/nextjs'

const ProgramCard = ({ userProgram, }: { userProgram: UserProgram }) => {
  const { user, } = useUser()
  const { data: programs, } = api.blocks.getAllUserPrograms.useQuery()
  const { data: userCoreOneRM, } = api.oneRepMax.getUserCoreLifts.useQuery({ userId: user?.id || '', })
  const program = programs?.find((program) => program.id === userProgram.programId)

  const checkWeight = (lift: string | null, onerm: number | null) => {
    if (!lift || !onerm) return ''
    const w = userCoreOneRM?.find((coreLift) => coreLift?.lift === lift.toLowerCase())?.weight

    if (!w) return ''

    return getWeight(+w, onerm,)
  }

  if (!program) return <div>Program not found</div>
  return (
    <>
      {userProgram.isProgramActive
        ? (
          <>
            <div className='flex flex-col gap-8 text-base sm:text-lg md:px-2'>
              {
                program.week.map((week, weekIndex) => (
                  <div key={week.id}>
                    <h1
                      className='text-2xl font-bold mb-4'
                    >Week {weekIndex + 1}</h1>
                    <div className='grid grid-cols-1 md:grid-cols-7 md:px-2'>
                      {
                        week.day.map((day, dayIndex) => (
                          <div key={day.id} className='hover:bg-gray-900/70 hover:rounded-md p-2'>
                            {
                              day.isRestDay
                                ? (
                                  <div>
                                    <h2
                                      className='text-xl font-bold mb-4'
                                    >
                                      Day {dayIndex + 1}
                                    </h2>
                                    <h2 className='lg:w-44 text-gray-400'>Rest Day</h2>
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
                                            className='flex flex-col gap-1 py-2 hover:bg-gray-900 hover:rounded-md cursor-pointer'
                                          >
                                            <div>
                                              <h3
                                                className='capitalize text-yellow-500'
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
                                              className='flex gap-4 '>
                                              <h3>{exercise.sets}</h3>
                                              <h3>X</h3>
                                              <h3>{exercise.reps}</h3>
                                              <h3>reps</h3>
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
        : (

          <div>
            Program: {userProgram.isProgramActive ? 'Active, ' : 'Inactive, '}
            Name: {program?.name}
          </div>
        )}
    </>
  )
}

export default ProgramCard

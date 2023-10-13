import { StarIcon } from '@heroicons/react/20/solid'

import { api } from '~/utils/api'
import getWeight from '~/utils/getWeight'
import { getDate } from '~/utils/utils'

import { LoadingPage } from '~/components/loading'

import { GitCommit, PlaySquare, Zap } from 'lucide-react'

import { Prisma } from '@prisma/client'

const exerciseWithSetSS = Prisma.validator<Prisma.ExerciseArgs>()({
  include: {
    set: true,
    ss: true,
  },
})

type Exercise = Prisma.ExerciseGetPayload<typeof exerciseWithSetSS>

const ExerciseView = ({
  userId,
  exercise,
}: {
  userId: string
  exercise: Exercise
}) => {
  const { data: userCoreOneRM } = api.oneRepMax.getUserCoreLifts.useQuery({
    userId: userId,
  })

  const checkWeight = (lift: string | null, onerm: number | null) => {
    if (!lift || !onerm) return ''
    const w = userCoreOneRM?.find(
      (coreLift) => coreLift?.lift === lift.toLowerCase(),
    )?.weight
    if (!w) return ''
    return getWeight(+w, onerm)
  }

  const isOneRm = (lift: string | null) => {
    if (!lift) return false
    const w = userCoreOneRM?.find(
      (coreLift) => coreLift?.lift === lift?.toLowerCase(),
    )?.weight
    if (!w) return false
    return true
  }

  const isSS = exercise?.ss && exercise?.ss.length > 0
  if (!exercise) return null

  return (
    <>
      <div>
        {exercise.isComplete || !isAdmin ? (
          <div className='flex flex-col gap-1 py-2 hover:rounded-md hover:bg-gray-900'>
            <div>
              <div className='flex justify-between text-lg'>
                <h3 className='font-semibold capitalize text-yellow-500'>
                  {exercise.name}
                </h3>
                <StarIcon className='h-5 w-5 text-yellow-500' />
              </div>
              <h3 className='text-xxs capitalize leading-none text-gray-600'>
                {exercise.lift}
              </h3>
            </div>
            <div className='mr-5 flex justify-between text-lg tracking-tight'>
              <div className='flex gap-4 '>
                <h3>{exercise.sets}</h3>
                <h3>X</h3>
                <h3>{exercise.reps}</h3>
                <h3>{exercise.repUnit ? exercise.repUnit : 'reps'}</h3>
              </div>
              <div>
                {exercise.weightType === 'onerm' && (
                  <div>
                    {isOneRm(exercise.lift) ? (
                      <div className='flex'>
                        <h4>
                          {exercise.onerm ? (
                            checkWeight(exercise.lift, exercise?.onerm)
                          ) : (
                            <div className='text-red-500'>Missing %</div>
                          )}
                        </h4>
                        <h4>{exercise.onermTop && '-'}</h4>
                        <h4>
                          {exercise.onermTop &&
                            checkWeight(exercise.lift, exercise.onermTop)}
                          kg
                        </h4>
                      </div>
                    ) : (
                      <div className='text-red-500'>Missing 1rm</div>
                    )}
                  </div>
                )}
                {exercise.weightType === 'rpe' && (
                  <div className='flex items-baseline gap-2'>
                    <h4>RPE Target:</h4>
                    <h4 className='flex items-baseline justify-center'>
                      {exercise?.targetRpe && +exercise?.targetRpe}
                    </h4>
                  </div>
                )}
                {exercise.weightType === 'weight' && (
                  <div className='flex items-baseline'>
                    <h4>
                      {exercise?.weightBottom ? (
                        +exercise?.weightBottom
                      ) : (
                        <div className='text-red-500'>Missing W</div>
                      )}
                    </h4>
                    <h4>{exercise?.weightTop && '-'}</h4>
                    <h4>
                      {exercise?.weightTop && +exercise?.weightTop}
                      kg
                    </h4>
                  </div>
                )}
              </div>
            </div>
            <GitCommit
              size={20}
              className='flex w-full justify-center text-yellow-500'
            />
            <div className='flex flex-col gap-1 text-base'>
              {exercise?.set.map((s) => (
                <div
                  key={s.id}
                  className='grid grid-cols-7 gap-x-1 tracking-tighter'
                >
                  {/* <h4 className=''>{setIndex + 1}.</h4> */}
                  <h4 className=''>{s?.rep}</h4>
                  {s.weight && +s.weight !== 0 && (
                    <h4 className='col-span-2'>{+s.weight}kg</h4>
                  )}
                  <h4 className='col-span-2'>rpe {s?.rpe && +s?.rpe}</h4>
                  {s.estiamtedOnerm && Number(s.estiamtedOnerm) != 0 && (
                    <h4 className='col-span-2'>E1rm {+s.estiamtedOnerm}kg</h4>
                  )}
                </div>
              ))}
            </div>
            <div className='hidden'>
              {exercise.notes && (
                <div className='text-sm text-gray-400'>{exercise.notes}</div>
              )}
            </div>
            {exercise.flield2 && exercise.flield2 !== '' && (
              <h4>
                <div>Notes:</div>
                <div className='mb-4 text-sm'>{exercise.flield2}</div>
              </h4>
            )}
            <h4 className='text-xs font-light text-gray-400'>
              {getDate(exercise.flield1)}
            </h4>
          </div>
        ) : (
          <div
            className='flex cursor-pointer flex-col gap-1 py-2 hover:rounded-md hover:bg-gray-900'
            onClick={() => openModal(exercise.id)}
          >
            <div>
              <h3 className='text-lg capitalize text-yellow-500'>
                {isSS ? 'Super Set' : exercise.name}
              </h3>
              <h3 className='text-xxs capitalize leading-none text-gray-600'>
                {exercise.lift}
              </h3>
            </div>
            {isSS ? (
              <div>
                <div className='relative flex flex-col items-baseline gap-1 text-sm'>
                  <h3>{exercise.sets} X</h3>
                  <div className='flex flex-col pl-3'>
                    {exercise.ss.map((s) => (
                      <div
                        key={s.id}
                        className='flex gap-2 '
                      >
                        <h3>{s.reps}</h3>
                        <h3>-</h3>
                        <h3>{s.name}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col  gap-1'>
                <div className='flex justify-between  gap-4'>
                  <div className='flex gap-4'>
                    <h3>{exercise.sets}</h3>
                    <h3>X</h3>
                    <h3>{exercise.reps}</h3>
                    <h3>{exercise.repUnit ? exercise.repUnit : 'reps'}</h3>
                  </div>
                  <div>
                    {exercise.weightType === 'onerm' && (
                      <div>
                        {isOneRm(exercise.lift) ? (
                          <div className='flex'>
                            <h4>
                              {exercise.onerm ? (
                                checkWeight(exercise.lift, exercise?.onerm)
                              ) : (
                                <div className='text-red-500'>Missing %</div>
                              )}
                            </h4>
                            <h4>{exercise.onermTop && '-'}</h4>
                            <h4>
                              {exercise.onermTop &&
                                checkWeight(exercise.lift, exercise.onermTop)}
                              kg
                            </h4>
                          </div>
                        ) : (
                          <div className='text-red-500'>Missing 1rm</div>
                        )}
                      </div>
                    )}
                    {exercise.weightType === 'rpe' && (
                      <div className='flex items-baseline gap-2'>
                        <h4>RPE Target:</h4>
                        <h4 className='flex items-baseline justify-center'>
                          {exercise?.targetRpe && +exercise?.targetRpe}
                        </h4>
                      </div>
                    )}
                    {exercise.weightType === 'weight' && (
                      <div className='flex items-baseline'>
                        <h4>
                          {exercise?.weightBottom ? (
                            +exercise?.weightBottom
                          ) : (
                            <div className='text-red-500'>Missing W</div>
                          )}
                        </h4>
                        <h4>{exercise?.weightTop && '-'}</h4>
                        <h4>
                          {exercise?.weightTop && +exercise?.weightTop}
                          kg
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div>
              {exercise.notes && (
                <div className='text-sm text-gray-400'>{exercise.notes}</div>
              )}
            </div>
            <div className='flex justify-between'>
              <h3 className='text-xxs text-gray-600'>{exercise.weightType}</h3>
              <div
                className=''
                onClick={(e) => e.stopPropagation()}
              >
                {exercise.htmlLink && (
                  <a
                    href={exercise.htmlLink}
                    target='_blank'
                    rel='noreferrer'
                    className=''
                  >
                    <PlaySquare
                      size={26}
                      fill='#EAB308'
                      color='black'
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const ProgramView = ({ userId, dayId }: { userId: string; dayId: string }) => {
  const { data: day, isLoading: dayLoading } = api.days.get.useQuery({
    id: dayId,
  })

  if (dayLoading) return <LoadingPage />
  if (!day) return null

  return (
    <>
      <div
        className={`p-2 hover:rounded-md hover:bg-gray-900/70 ${
          day.isRestDay === true ? 'cols-span-1' : 'col-span-2'
        }`}
      >
        {day.isRestDay ? (
          <div>
            <h2 className='pt-2 font-normal text-gray-400 lg:w-44'>Rest Day</h2>
          </div>
        ) : (
          <div className='flex flex-col gap-2 text-base'>
            <div className={`flex justify-between gap-8 `}>
              <h2
                className={`flex text-2xl ${
                  day.isComplete ? 'font-bold text-green-500' : 'font-bold '
                }`}
              ></h2>
              {day.isComplete && (
                <StarIcon className='h-6 w-6 text-yellow-500' />
              )}
              {day.isComplete && (
                <span className='flex items-center gap-1 text-2xl font-semibold text-yellow-500'>
                  <Zap className='h-5 w-5' />
                  <span className='font-extrabold'>{day.energyRating}</span>
                </span>
              )}
            </div>
            <div className='flex flex-col divide-y divide-dashed divide-gray-600'>
              {day.exercise.map((exercise, exerciseIdx) => (
                <ExerciseView
                  key={exercise.id}
                  userId={userId}
                  exercise={exercise}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProgramView

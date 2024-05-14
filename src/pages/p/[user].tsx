import { useRouter } from 'next/router'

import { Day } from '~/types'

import { useSession } from 'next-auth/react'

import { StarIcon } from '@heroicons/react/20/solid'

import { api } from '~/utils/api'
import getWeight from '~/utils/getWeight'
import { getDate } from '~/utils/utils'

import { LoadingPage } from '~/components/loading'

import {
  ArrowDownToLine,
  ArrowUpToLine,
  GitCommit,
  PauseOctagonIcon,
  PlaySquare,
  Zap,
} from 'lucide-react'

const ExerciseView = ({
  userId,
  weekIdx,
  dayIdx,
  exerciseIdx,
  programId,
  isAdmin,
}: {
  userId: string
  weekIdx: number
  dayIdx: number
  exerciseIdx: number
  programId: string
  isAdmin: boolean
}) => {
  const { data: program } = api.blocks.get.useQuery({
    id: programId,
  })
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

  const exercise = program?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]
  const isSS = exercise?.ss && exercise?.ss.length > 0
  if (!exercise) return null

  return (
    <>
      <div>
        {exercise.isComplete || !isAdmin ? (
          <div className='flex flex-col gap-1 py-2 hover:rounded-md hover:bg-gray-900'>
            <div>
              <div className='flex justify-between text-lg'>
                <h3
                  className={`capitalize ${
                    exercise.isComplete
                      ? 'font-bold text-green-500'
                      : 'font-semibold text-yellow-500 '
                  }`}
                >
                  <div
                    className={`${
                      Number(exercise?.sets) > exercise.set.length
                        ? 'text-orange-500'
                        : Number(exercise?.sets) < exercise.set.length
                        ? 'text-indigo-400'
                        : ''
                    }`}
                  >
                    {isSS ? 'Super Set' : exercise.name}
                  </div>
                </h3>
                <StarIcon className='h-5 w-5 text-yellow-500' />
              </div>
            </div>
            <h4 className='text-xs font-light text-gray-400'>
              {getDate(exercise.flield1)}
            </h4>
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
                            <>
                              {isAdmin && (
                                <div className='text-red-500'>No %</div>
                              )}
                            </>
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
                            <>
                              {isAdmin && (
                                <div className='text-red-500'>No 1RM</div>
                              )}
                            </>
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
                            <>
                              {isAdmin && (
                                <div className='text-red-500'>No W</div>
                              )}
                            </>
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
          </div>
        ) : (
          <div
            className='flex cursor-pointer flex-col gap-1 py-2 hover:rounded-md hover:bg-gray-900'
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
                <div className='relative flex flex-col items-baseline gap-1 overflow-hidden text-sm'>
                  <h3>{exercise.sets} X</h3>
                  <div className='flex flex-col pl-3 '>
                    {exercise.ss.map((s) => (
                      <div
                        key={s.id}
                        className='flex items-center gap-2'
                      >
                        <div
                          className='w-4'
                          onClick={(e) => e.stopPropagation()}
                        >
                          {s.htmlLink && s.htmlLink !== '' && (
                            <a
                              href={s.htmlLink}
                              target='_blank'
                              rel='noreferrer'
                            >
                              <PlaySquare className='h-4 w-4 text-yellow-500' />
                            </a>
                          )}
                        </div>
                        <h3>{s.reps}</h3>
                        <h3>-</h3>
                        <h3>{s.name}</h3>
                        {s.notes && (
                          <div className='w-fit overflow-hidden whitespace-nowrap'>
                            {s.notes}
                          </div>
                        )}
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
              {exercise?.tempoDown ||
              exercise?.tempoUp ||
              exercise?.tempoPause ? (
                <div className='flex gap-4 text-sm'>
                  <div>Tempo:</div>
                  {exercise?.tempoDown && (
                    <div className='flex items-center gap-0 tracking-tighter'>
                      <h4>{exercise.tempoDown}</h4>
                      <ArrowDownToLine size={16} />
                    </div>
                  )}
                  {exercise?.tempoPause && (
                    <div className='flex items-center gap-0 tracking-tighter'>
                      <h4>{exercise.tempoPause}</h4>
                      <PauseOctagonIcon size={16} />
                    </div>
                  )}
                  {exercise?.tempoUp && (
                    <div className='flex items-center gap-0 tracking-tighter'>
                      <h4>{exercise.tempoUp}</h4>
                      <ArrowUpToLine size={16} />
                    </div>
                  )}
                </div>
              ) : null}
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

const ProgramView = () => {
  const { data: allUsers} = api.users.getAllUsers.useQuery()
  const allUsersNames = allUsers?.map(
    (u) =>
  {
      return {
        id: u.id,
        name: ((u?.firstName?.trim() || '') + (u?.lastName?.trim()?.slice(0, 1) || ''))?.toLowerCase()
      }
    })
  console.log(allUsersNames)
  const { data: session } = useSession()

  const router = useRouter()
  const userName = router.query.user as string
  const user = allUsersNames?.find((u) => u.name === userName)
  const userFurstName = allUsers?.find((u) => u.id === user?.id)?.firstName || ''
  const userId = session?.user?.id || ''
  const { data: program, isLoading: programLoading } = api.blocks.getUserActiveProgramFull.useQuery({
    userId: user?.id || '',
  })
  const dayId = program?.week.reduce((acc, week) => {
    week.day.forEach((day) => {
      if (!day.isComplete && acc === '' && !day.isRestDay) {
        acc = day.id
      }
    })
    return acc
  }, '')
  const day = program?.week
    .map((week) => week.day)
    .flat()
    .find((day) => day.id === dayId) as Day

  console.log(day)
  const weekIndex = program?.week.findIndex((w) =>
    w.day.find((d) => d.id === dayId),
  ) as number

  const dayIndex = program?.week[weekIndex]?.day?.findIndex(
    (d) => d.id === dayId,
  ) || 0

  const programId = program?.id || ''

  const { data: allWarmups, isLoading: warmupsLoading } =
    api.warmups.getAll.useQuery()

  if (!program) return null

  const isAdmin = true

  if (programLoading || warmupsLoading) return <LoadingPage />

  return (
    <>
      <div
        key={day.id}
        className={`p-2 hover:rounded-md hover:bg-gray-900/70 ${
day.isRestDay === true ? 'cols-span-1' : 'col-span-2'
}`}
      >
        {day.isRestDay ? (
          <div>
            <h2 className='mb-2 text-xl font-bold'>
              Day {dayIndex + 1}
            </h2>
            <h2 className='pt-2 font-normal text-gray-400 lg:w-44'>
              Rest Day
            </h2>
          </div>
        ) : (
            <div className='flex flex-col gap-2 text-base'>
                <h2 className='text-2xl font-bold'>
                  {userFurstName}
                </h2>
              <div className={`flex justify-between gap-8 `}>
                <h2
                  className={`flex text-2xl ${
day.isComplete
? 'font-bold text-green-500'
: 'font-bold '
}`}
                >
                  Day {dayIndex + 1}
                </h2>
                {day.isComplete && (
                  <StarIcon className='h-6 w-6 text-yellow-500' />
                )}
                {day.isComplete && (
                  <span className='flex items-center gap-1 text-2xl font-semibold text-yellow-500'>
                    <Zap className='h-5 w-5' />
                    <span className='font-extrabold'>
                      {day.energyRating}
                    </span>
                  </span>
                )}
              </div>
              <div
              >
                {day.warmupTemplateId === '' ||
                  day.warmupTemplateId === null ? (
                    <div>
                      <h2>Warm Up</h2>
                      <div className='text-sm text-gray-600'>none</div>
                    </div>
                  ) : (
                    <div className='flex flex-col gap-2 text-base'>
                      <h2>Warm Up</h2>
                      <div className='px-4'>
                        {
                          allWarmups?.find(
                            (warmup) =>
                              warmup.id === day.warmupTemplateId,
                          )?.name
                        }
                        <div className='flex flex-col gap-1'>
                          {allWarmups
                            ?.find(
                              (warmup) =>
                                warmup.id === day.warmupTemplateId,
                            )?.warmups?.map((warmup) => (
                              <div
                                key={warmup.id}
                                className='flex items-center gap-1'
                              >
                                <div
                                  className='w-6'
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {warmup.link && (
                                    <a
                                      target='_blank'
                                      rel='noreferrer'
                                      className=''
                                      href={warmup.link}
                                    >
                                      <PlaySquare className='h-4 w-4 text-yellow-500' />
                                    </a>
                                  )}
                                </div>
                                <div className='ml-2 text-sm capitalize text-gray-600'>
                                  {warmup.name}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <div className='flex flex-col divide-y divide-dashed divide-gray-600'>
                {day.exercise.map((exercise, exerciseIdx) => (
                  <ExerciseView
                    key={exercise.id}
                    userId={userId}
                    weekIdx={weekIndex}
                    dayIdx={dayIndex}
                    exerciseIdx={exerciseIdx}
                    programId={programId}
                    isAdmin={isAdmin}
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

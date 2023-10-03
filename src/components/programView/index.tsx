import { useState, Fragment } from 'react'

import { StarIcon } from '@heroicons/react/20/solid'

import { api } from '~/utils/api'
import getWeight from '~/utils/getWeight'
import { getDate } from '~/utils/utils'

import { Dialog, Transition } from '@headlessui/react'
import { LoadingPage } from '~/components/loading'

import ExerciseDialog from './exerciseDialog'
import { GitCommit, PlaySquare, Zap } from 'lucide-react'

const ExerciseView = ({
  userId,
  weekIdx,
  dayIdx,
  exerciseIdx,
  programId,
  isAdmin,
  openModal,
}: {
  userId: string
  weekIdx: number
  dayIdx: number
  exerciseIdx: number
  programId: string
  isAdmin: boolean
  openModal: (id: string) => void
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
                {exercise.name}
              </h3>
              <h3 className='text-xxs capitalize leading-none text-gray-600'>
                {exercise.lift}
              </h3>
            </div>
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

const ProgramView = ({
  userId,
  isAdmin,
  programId,
}: {
  userId: string
  isAdmin: boolean
  programId: string
}) => {
  const { data: program, isLoading: programLoading } = api.blocks.get.useQuery({
    id: programId,
  })

  const [isOpen, setIsOpen] = useState(false)
  const [exerciseId, setExerciseId] = useState('')

  if (!program) return null

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = (id: string) => {
    setExerciseId(id)
    setIsOpen(true)
  }

  if (programLoading) return <LoadingPage />

  return (
    <>
      <div className='mt-8 flex flex-col gap-8 text-base sm:text-lg md:px-2'>
        {program.week.map((week, weekIndex) => (
          <div key={week.id}>
            <h1 className='mb-2 text-2xl font-bold'>Week {weekIndex + 1}</h1>
            <div
              className={`grid grid-cols-1 md:px-2 lg:grid-cols-5 2xl:${
                'grid-cols-' +
                week.day
                  .reduce(
                    (acc, d) => (d.isRestDay === true ? acc + 1 : acc + 2),
                    0,
                  )
                  .toString()
              } `}
            >
              {week.day.map((day, dayIndex) => (
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
                            openModal={openModal}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        {isAdmin ? (
          <Dialog
            as='div'
            className='relative z-10 text-gray-200'
            onClose={closeModal}
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
              <div className='fixed inset-0 bg-black bg-opacity-75' />
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
                  <Dialog.Panel className='w-full max-w-7xl transform overflow-visible rounded-2xl border border-gray-800 bg-black p-6 text-left align-middle shadow-xl transition-all'>
                    <ExerciseDialog
                      exerciseId={exerciseId}
                      closeModal={closeModal}
                      userId={userId}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        ) : null}
      </Transition>
    </>
  )
}

export default ProgramView

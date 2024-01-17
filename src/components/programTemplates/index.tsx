import { useState, Fragment } from 'react'

import { api } from '~/utils/api'

import { Dialog, Transition } from '@headlessui/react'
import { LoadingPage } from '~/components/loading'

import ExerciseDialog from './exerciseDialog'
import { cn } from '@/lib/utils'

import ExerciseView from './exerciseView'
import Warmup from './warmup'

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
            <div className='flex'>
              {week.day.map((day, dayIndex) => (
                <div
                  key={day.id}
                  className={cn(
                    'p-2 hover:rounded-md hover:bg-gray-900/70',
                    day.isRestDay === true ? 'shrink' : 'shrink',
                  )}
                >
                  {day.isRestDay ? (
                    <div className='min-w-20'>
                      <h2 className='mb-2 text-xl font-bold'>
                        Day {dayIndex + 1}
                      </h2>
                      <h2 className='pt-2 font-normal text-gray-400'>
                        Rest Day
                      </h2>
                    </div>
                  ) : (
                    <div className='flex flex-col gap-2 text-base'>
                      <h2 className={`flex-bold flex text-2xl`}>
                        Day {dayIndex + 1}
                      </h2>
                      <Warmup
                        day={day}
                        program={program}
                      />
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
          <div>
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
                        programId={programId}
                        exerciseId={exerciseId}
                        closeModal={closeModal}
                        userId={userId}
                      />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </div>
        ) : null}
      </Transition>
    </>
  )
}

export default ProgramView

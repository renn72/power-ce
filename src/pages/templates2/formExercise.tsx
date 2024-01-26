import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment } from 'react'

import { useFormContext, } from 'react-hook-form'

import ExerciseView from '~/components/exerciseView'
import FormExerciseDialog from './formExerciseDialog'

import { type PrismaExercise as Exercise } from '~/store/types'
import { type PrismaBlock } from '~/store/types'

const FormExercise = ({
  exerciseIdx,
  dayIdx,
  weekIdx,
}: {
  exercise: Exercise
  exerciseIdx: number
  dayIdx: number
  weekIdx: number
}) => {
  const formMethods = useFormContext<PrismaBlock>()
  const { watch, } = formMethods
  const [isOpen, setIsOpen] = useState(false)
  const onRemoveExercise = (index: number) => {
    console.log('remove exercise')
  }
  const exercise = watch(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}`)
  return (
    <div
      className=''
      onClick={() => {
        setIsOpen(true)
      }}
    >
      <ExerciseView
        exercise={exercise}
        exerciseIdx={exerciseIdx}
        isAdmin={true}
      />
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
          <div>
            <Dialog
              as='div'
              className='relative z-10 text-gray-200'
              onClose={() => setIsOpen(false)}
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
                      <FormExerciseDialog
                        exerciseIdx={exerciseIdx}
                        dayIdx={dayIdx}
                        weekIdx={weekIdx}
                        onRemoveExercise={onRemoveExercise}
                        setIsOpen={setIsOpen}
                      />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </div>
      </Transition>
    </div>
  )
}

export default FormExercise

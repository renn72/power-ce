import {
  useState, Fragment,
} from 'react'
import {
  type Exercise, type UserProgram,
} from '@prisma/client'
import { type Day, } from '~/store/types'
import { api, } from '~/utils/api'

import {
  Dialog, Transition,
} from '@headlessui/react'

const DayModal = ({ day, }: { day: Day }) => {

  return (
    <>
      {day.isRestDay ? (
        <div>
          Rest Day
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            {day.exercise.map((exercise) => (
              <div key={exercise.id} className='flex flex-row justify-between'>
                <div>
                  {exercise.name}
                </div>
                <div>
                  {exercise.sets} x {exercise.reps}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

const ProgramDay = ({
  day, dayIdx,
}: { day: Day, dayIdx: number }) => {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <>
      <div
        className='border border-gray-600 rounded-lg p-2 hover:bg-gray-600 hover:scale-105 transform transition-all'
        onClick={() => openModal()}
      >
        <div>
          Day {dayIdx + 1}
        </div>
        {day.isRestDay
          ? (
            <div>
              Rest Day
            </div>
          )
          : day.exercise.map((exercise) => (
            <div key={exercise.id}>

              <div>
                {exercise.name}
              </div>
            </div>
          ))}
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
                <Dialog.Panel className='w-full text-gray-200 bg-gray-800 max-w-3xl transform overflow-hidden rounded-2xl p-5 text-left align-middle shadow-sm shadow-gray-800 transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 flex justify-between items-center'
                  >
                    <h3>
                      Day {dayIdx + 1}
                    </h3>
                    <button className='px-2 py-1' onClick={() => closeModal()}>X</button>
                  </Dialog.Title>
                  <div className='mt-2 flex justify-center'>
                    <DayModal day={day} />
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

const ProgramCard = ({ userProgram, }: { userProgram: UserProgram }) => {
  const { data: programs, } = api.blocks.getAllUserPrograms.useQuery()
  const program = programs?.find((program) => program.id === userProgram.programId)
  console.log(program)
  return (
    <>
      {userProgram.isProgramActive
        ? (
          <div
            className='border border-gray-600 rounded-lg shadow-md shadow-gray-400/20 p-4'
          >
            Name: {program?.name}
            <div
              className='flex flex-col gap-4'
            >
              {program?.week.map((week, weekIdx) => (
                <div
                  key={week.id}
                  className='border border-gray-600 rounded-lg p-2 '
                >
                  <div>
                    Week: {weekIdx + 1}
                  </div>
                  <div
                    className='grid grid-cols-7 gap-2'
                  >
                    {week.day.map((day, dayIdx) => (
                      <ProgramDay
                        key={day.id}
                        day={day}
                        dayIdx={dayIdx}
                      />
                    ))}
                  </div>
                </div>
              ))
              }
            </div>
          </div>

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

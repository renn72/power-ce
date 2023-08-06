import {
  useState, Fragment,
} from 'react'
import { type Day, } from '~/store/types'
import { api, } from '~/utils/api'

import {
  Dialog, Transition, RadioGroup,
} from '@headlessui/react'

import DayModal from './dayModal'

import checkWeight from '~/utils/checkWeigth'

const ProgramDay = ({
  day, dayIdx,
}: { day: Day, dayIdx: number }) => {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false)
  const [
    selectedEngery,
    setSelectedEngery,
  ] = useState(day.energyRating || 'A')

  const { data: userCoreOneRM, } = api.oneRepMax.getUserCoreLifts.useQuery()

  const squat = +userCoreOneRM?.filter((coreLift) => coreLift?.lift === 'squat')[0]?.weight || 0
  const deadlift = +userCoreOneRM?.filter((coreLift) => coreLift?.lift === 'deadlift')[0]?.weight || 0
  const bench = +userCoreOneRM?.filter((coreLift) => coreLift?.lift === 'bench')[0]?.weight || 0
  const coreLifts = [
    squat,
    deadlift,
    bench,
  ]

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const ctx = api.useContext()

  const { mutate: updateDayEnergy, } = api.programs.updateDayEnergy.useMutation({
    onSuccess: () => {
      console.log('success')
      void ctx.blocks.getAllUserPrograms.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
    },
  })

  const onSetEnergy = (e: string) => {
    console.log(e)
    setSelectedEngery(e)
    updateDayEnergy({
      id: day.id,
      energyRating: e,
    })
  }

  return (
    <>
      <div
        className='border border-gray-600 rounded-lg p-1 hover:bg-gray-600 hover:scale-105 transform transition-all cursor-pointer min-h-[6rem]'
        onClick={() => openModal()}
      >
        <div className='font-bold'>
          Day {dayIdx + 1}
        </div>
        {day.isRestDay
          ? (
            <div className=''>
              Rest Day
            </div>
          )
          : day.exercise.map((exercise) => (
            <div
              key={exercise.id}
              className='flex flex-row justify-start gap-2 '
            >
              <div className='break-words'>
                {exercise.name}
              </div>
              {exercise.sets && exercise.reps && (
                <div className='flex gap-1'>
                  <div>
                    {exercise.sets} x {exercise.reps}
                  </div>
                  {exercise.lift && exercise.onerm && (
                    <div>
                      {checkWeight(exercise, false, null, coreLifts)}kg
                    </div>
                  )
                  }
                </div>
              )}
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
            <div className='flex min-h-full items-center justify-center p-2 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full min-h-[600px] text-gray-200 bg-gray-800 max-w-3xl transform overflow-hidden rounded-2xl p-2 text-left align-middle shadow-sm shadow-gray-800 transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-base md:text-lg font-medium leading-6 flex justify-between items-center'
                  >
                    <div className='flex justify-between items-center gap-2 md:gap-8'>
                      <div className='font-bold'>
                        Day {dayIdx + 1}
                      </div>
                      <RadioGroup value={selectedEngery} onChange={onSetEnergy}>
                        <div className={`flex gap-2 p-2  items-center`}>
                          <RadioGroup.Label className=''>Energy Level</RadioGroup.Label>
                          {[
                            'A',
                            'B',
                            'C',
                            'D',
                          ].map((energy) => (
                            <RadioGroup.Option
                              key={energy}
                              value={energy}
                              className={({
                                active, checked,
                              }) => `${active
                                ? ''
                                : ''
                              }
                              ${checked ? 'bg-gray-400 bg-opacity-75 text-white font-extrabold' : 'bg-gray-700 text-gray-200'}
                                  relative flex cursor-pointer rounded-lg px-2 py-1 shadow-md focus:outline-none`
                              }
                            >
                              {({
                                active, checked,
                              }) => (
                                <>
                                  <div className='flex w-full items-center justify-between'>
                                    <div className='flex items-center'>
                                      <div className='text-sm'>
                                        <RadioGroup.Label
                                          as='p'
                                          className={`font-medium  ${checked ? 'text-gray-100' : 'text-gray-300'
                                            }`}
                                        >
                                          {energy}
                                        </RadioGroup.Label>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                    <button className='px-2 py-1' onClick={() => closeModal()}>X</button>
                  </Dialog.Title>
                  <div className='mt-2 flex justify-center'>
                    <DayModal day={day} selectedEngery={selectedEngery} />
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

export default ProgramDay

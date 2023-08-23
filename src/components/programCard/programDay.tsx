import {
  useState, Fragment,
} from 'react'
import { type Day, } from '~/store/types'
import { api, } from '~/utils/api'

import {
  Dialog, Transition, RadioGroup,
} from '@headlessui/react'

import { useUser, } from '@clerk/nextjs'
import DayModal from './dayModal'

import getWeight from '~/utils/getWeight'

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

  const { user, } = useUser()
  const { data: userCoreOneRM, } = api.oneRepMax.getUserCoreLifts.useQuery({ userId: user?.id || '', })
  const checkWeight = (lift: string | null, onerm: number | null) => {
    if (!lift || !onerm) return ''
    const w = userCoreOneRM?.find((coreLift) => coreLift?.lift === lift.toLowerCase())?.weight

    if (!w) return ''

    return getWeight(+w, onerm,)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = (id: string) => {
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
        className='flex flex-col gap-4'
        onClick={() => openModal('')}
      >
        <h2
          className='text-xl font-bold mb-4'
        >
          Day {dayIdx + 1}
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/90' />
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
                <Dialog.Panel className='w-full min-h-[600px] text-gray-200 bg-black border-gray-800 border max-w-3xl transform overflow-hidden rounded-xl p-1 md:p-3 text-left align-middle transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-base md:text-lg font-medium leading-6 flex justify-between items-center'
                  >
                    <div className='flex justify-between items-center gap-2 md:gap-12'>
                      <div className='font-bold text-xl'>
                        Day {dayIdx + 1}
                      </div>
                      <RadioGroup value={selectedEngery} onChange={onSetEnergy}>
                        <div className={`flex gap-2 p-2  items-center`}>
                          <RadioGroup.Label className='tracking-tighter'>Energy Level</RadioGroup.Label>
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
                              ${checked ? 'bg-yellow-500 text-black font-extrabold' : 'bg-gray-900 text-gray-700'}
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
                                          className={`${checked ? 'text-black' : 'text-gray-400'
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

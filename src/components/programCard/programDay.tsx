import {
  useState, Fragment,
} from 'react'
import { type Day, } from '~/store/types'
import { api, } from '~/utils/api'

import {
  Dialog, Transition, RadioGroup,
  Disclosure,
} from '@headlessui/react'

import {
  ChevronUpIcon, StarIcon, TicketIcon,
} from '@heroicons/react/20/solid'
import { StarIcon as StarIconHollow, } from '@heroicons/react/24/outline'

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
    let energyAdjust = 1
    if (selectedEngery === 'B') energyAdjust = 0.98
    if (selectedEngery === 'C') energyAdjust = 0.96
    if (selectedEngery === 'D') energyAdjust = 0.94

    if (lift == 'weight') {
      return getWeight(+onerm, 100 * energyAdjust,)

    }
    const w = userCoreOneRM?.find((coreLift) => coreLift?.lift === lift.toLowerCase())?.weight

    if (!w) return ''

    return getWeight(+w, onerm * energyAdjust,)
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
      >
        <Disclosure defaultOpen={true} >
          {({ open, }) => (
            <div className='flex flex-col md:gap-8'>
              <div className='flex flex-col sm:flex-row md:gap-6'>
                <Disclosure.Button className={`${open ? 'border-b border-yellow-500' : 'hover:border-white border-b border-black'} w-full flex items-center gap-2 text-lg font-medium pb-4`}>
                  <h2
                    className='text-xl font-bold'
                  >
                    Day {dayIdx + 1}
                  </h2>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform text-white/80' : 'text-white/30'
                      } h-8 w-8 text-gray-400`}
                  />
                  {day?.isComplete ? (<StarIcon className='h-4 w-4 text-yellow-500' />) : (<StarIconHollow className='h-6 w-6 text-gray-600' />)}
                </Disclosure.Button>
                <div className='flex gap-2'>
                </div>
              </div>

              <Transition
                className='transition-all duration-300 ease-out'
                enterFrom='transform scale-70 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-70 opacity-0'
              >
                <Disclosure.Panel className=''>
                  <div
                    onClick={() => openModal(day.id)}
                    className='flex flex-col divide-y divide-dashed divide-gray-600'>
                    {
                      day.exercise.map((exercise, exerciseIndex) => (
                        <div key={exercise.id}
                          className='flex flex-col gap-1 py-2 hover:bg-gray-900 cursor-pointer'
                        >
                          <div className='flex items-baseline justify-between gap-1 md:gap-2 w-full'>
                            <h3
                              className='capitalize text-yellow-500'
                            >
                              {exercise.name}
                            </h3>
                            <div>
                              {
                                exercise.isComplete ? <StarIcon className='h-4 w-4 text-yellow-500/60' /> : <StarIconHollow className='h-4 w-4 text-gray-600' />
                              }
                            </div>
                          </div>
                          <div>
                            <div
                              className='flex gap-4 '>
                              <h3>{exercise.sets}</h3>
                              <h3>X</h3>
                              <h3>{exercise.reps}</h3>
                              <h3>{exercise.repUnit ? exercise.repUnit : 'reps'}</h3>
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
                              {
                                exercise.weightType === 'rpe'
                                && (
                                  <div className='flex gap-2 items-baseline'>
                                    <h4>
                                      RPE Target
                                    </h4>
                                    <h4>-</h4>
                                    <h4 className='text-xl font-semibold border border-gray-400 rounded-full w-7 h-7 flex justify-center items-baseline'>
                                      {exercise?.targetRpe && +exercise?.targetRpe}
                                    </h4>
                                  </div>

                                )

                              }
                              {
                                exercise.weightType === 'weight'
                                && (
                                  <div className='flex items-baseline'>
                                    <h4>
                                      {exercise?.weightBottom && checkWeight('weight', +exercise?.weightBottom)}
                                    </h4>
                                    <h4>
                                      {exercise?.weightTop && '-'}
                                    </h4>
                                    <h4>
                                      {exercise?.weightTop && checkWeight('weight', +exercise?.weightTop)}kg
                                    </h4>
                                  </div>

                                )

                              }
                            </div>
                            <div>
                              {
                                exercise.notes && (
                                  <div className='text-sm text-gray-400'>
                                    {exercise.notes}
                                  </div>
                                )
                              }
                            </div>
                            <h3
                              className='text-gray-600 text-xxs'
                            >
                              {/* {exercise.weightType} */}
                            </h3>

                          </div>
                        </div>
                      ))
                    }
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
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
            <div className='fixed inset-0 bg-gray-900/70' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-1 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full md:min-h-[600px] text-gray-200 bg-black max-w-3xl transform overflow-hidden rounded-md p-2 md:p-4 text-left align-middle transition-all'>
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

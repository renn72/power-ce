import { useState, Fragment } from 'react'
import { type Day } from '~/store/types'
import { api } from '~/utils/api'

import { Dialog, Transition, RadioGroup, Disclosure } from '@headlessui/react'

import { ChevronUpIcon, StarIcon } from '@heroicons/react/20/solid'
import { StarIcon as StarIconHollow } from '@heroicons/react/24/outline'

import { useUser } from '@clerk/nextjs'
import DayModal from './dayModal'

import getWeight from '~/utils/getWeight'

const ProgramDay = ({ day, dayIdx }: { day: Day; dayIdx: number }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEngery, setSelectedEngery] = useState(day.energyRating || 'A')

  const { user } = useUser()
  const { data: userCoreOneRM } = api.oneRepMax.getUserCoreLifts.useQuery({
    userId: user?.id || '',
  })

  const checkWeight = (
    lift: string | null,
    onerm: number | null,
    index: number | null,
  ) => {
    if (!lift || !onerm) return ''
    let energyAdjust = 1
    if (selectedEngery === 'B') energyAdjust = 0.98
    if (selectedEngery === 'C') energyAdjust = 0.96
    if (selectedEngery === 'D') energyAdjust = 0.94

    if (lift == 'weight') {
      return getWeight(+onerm, 100 * energyAdjust)
    }

    if (index) {
      const rm = day?.exercise[index - 1]?.set.filter((s) => s.isComplete)
      const rmWeight = rm?.map((s) => s.estiamtedOnerm)
      const w = rmWeight[rmWeight.length - 1]

      if (w) return getWeight(+w, onerm * energyAdjust)
    }

    const w = userCoreOneRM?.find(
      (coreLift) => coreLift?.lift === lift.toLowerCase(),
    )?.weight

    if (!w) return ''

    return getWeight(+w, onerm * energyAdjust)
  }

  const checkPercentWeight = (
    estimatedOnermIndex: number | null,
    percent: number | null,
  ) => {
    if (!estimatedOnermIndex || !percent) return ''

    if (!day?.exercise[estimatedOnermIndex - 1]?.set[0]?.weight) return ''

    let energyAdjust = 1
    if (selectedEngery === 'B') energyAdjust = 0.98
    if (selectedEngery === 'C') energyAdjust = 0.96
    if (selectedEngery === 'D') energyAdjust = 0.94

    const weight = day?.exercise[estimatedOnermIndex - 1]?.set[0]?.weight
    if (!weight) return ''
    return `${+weight * percent / 100 * energyAdjust}`
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = (id: string) => {
    setIsOpen(true)
  }

  const ctx = api.useContext()

  const { mutate: updateDayEnergy } = api.programs.updateDayEnergy.useMutation({
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
      <div className='flex flex-col gap-4'>
        <Disclosure defaultOpen={false}>
          {({ open }) => (
            <div className='flex flex-col md:gap-8'>
              <div className='flex flex-col sm:flex-row md:gap-6'>
                <Disclosure.Button
                  className={`${
                    open
                      ? 'border-b border-yellow-500'
                      : 'border-b border-black hover:border-white'
                  } flex w-full items-center gap-2 pb-4 text-lg font-medium`}
                >
                  <h2 className='text-xl font-bold'>Day {dayIdx + 1}</h2>
                  <ChevronUpIcon
                    className={`${
                      open
                        ? 'rotate-180 transform text-white/80'
                        : 'text-white/30'
                    } h-8 w-8 text-gray-400`}
                  />
                  {day?.isComplete ? (
                    <StarIcon className='h-6 w-6 text-yellow-500' />
                  ) : (
                    <StarIconHollow className='h-6 w-6 text-gray-600' />
                  )}
                </Disclosure.Button>
                <div className='flex gap-2'></div>
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
                    className='flex cursor-pointer flex-col divide-y divide-dashed divide-gray-600 hover:bg-gray-900'
                  >
                    {day.exercise.map((exercise) => (
                      <div
                        key={exercise.id}
                        className='flex cursor-pointer flex-col gap-0 py-1'
                      >
                        <div className='flex w-full items-baseline justify-between gap-1 md:gap-2'>
                          <h3 className='capitalize text-yellow-500'>
                            {exercise.name}
                          </h3>
                          <div>
                            {exercise.isComplete ? (
                              <StarIcon className='h-4 w-4 text-yellow-500' />
                            ) : (
                              <StarIconHollow className='h-4 w-4 text-gray-600' />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className='flex items-baseline gap-6 lg:flex-col '>
                            <div className='flex gap-2 '>
                              <h3>{exercise.sets}</h3>
                              <h3>X</h3>
                              <h3>{exercise.reps}</h3>
                              <h3>
                                {exercise.repUnit ? exercise.repUnit : 'reps'}
                              </h3>
                            </div>
                            <div>
                              {exercise.weightType === 'percent' && (
                                <div className=''>
                                  {exercise.estimatedOnermIndex ? (
                                    <div>
                                      {+day?.exercise[
                                        exercise?.estimatedOnermIndex - 1
                                      ]?.set[0]?.weight > 0 && (
                                        <div className='flex'>
                                          {exercise.onerm && (
                                            <h4>
                                              {checkPercentWeight(
                                                exercise.estimatedOnermIndex,
                                                +exercise?.onerm,
                                              )}
                                            </h4>
                                          )}
                                          {exercise.onermTop && <h4>-</h4>}
                                          {exercise.onermTop && (
                                            <h4>
                                              {checkPercentWeight(
                                                exercise.estimatedOnermIndex,
                                                +exercise?.onermTop,
                                              )}
                                            </h4>
                                          )}
                                          <h4>kg</h4>
                                        </div>
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                              )}
                              {exercise.weightType === 'onerm' && (
                                <div className=''>
                                  {exercise.estimatedOnermIndex ? (
                                    <div>
                                      {+day?.exercise[
                                        exercise?.estimatedOnermIndex - 1
                                      ]?.set[0]?.weight > 0 && (
                                        <div className='flex'>
                                          {exercise.onerm && (
                                            <h4>
                                              {checkWeight(
                                                exercise.lift,
                                                +exercise?.onerm,
                                                exercise.estimatedOnermIndex,
                                              )}
                                            </h4>
                                          )}
                                          {exercise.onermTop && <h4>-</h4>}
                                          {exercise.onermTop && (
                                            <h4>
                                              {checkWeight(
                                                exercise.lift,
                                                +exercise?.onermTop,
                                                exercise.estimatedOnermIndex,
                                              )}
                                            </h4>
                                          )}
                                          <h4>kg</h4>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className='flex'>
                                      {exercise.onerm && (
                                        <h4>
                                          {checkWeight(
                                            exercise.lift,
                                            +exercise?.onerm,
                                            null,
                                          )}
                                        </h4>
                                      )}
                                      {exercise.onermTop && <h4>-</h4>}
                                      {exercise.onermTop && (
                                        <h4>
                                          {checkWeight(
                                            exercise.lift,
                                            +exercise?.onermTop,
                                            null,
                                          )}
                                        </h4>
                                      )}
                                      <h4>kg</h4>
                                    </div>
                                  )}
                                </div>
                              )}
                              {exercise.weightType === 'rpe' && (
                                <div className='flex items-baseline gap-2'>
                                  <h4>RPE Target</h4>
                                  <h4>-</h4>
                                  <h4 className='flex items-baseline justify-center text-xl font-semibold'>
                                    {exercise?.targetRpe &&
                                      +exercise?.targetRpe}
                                  </h4>
                                </div>
                              )}
                              {exercise.weightType === 'weight' && (
                                <div className='flex items-baseline'>
                                  <h4>
                                    {exercise?.weightBottom &&
                                      checkWeight(
                                        'weight',
                                        +exercise?.weightBottom,
                                        null,
                                      )}
                                  </h4>
                                  <h4>{exercise?.weightTop && '-'}</h4>
                                  <h4>
                                    {exercise?.weightTop &&
                                      checkWeight(
                                        'weight',
                                        +exercise?.weightTop,
                                        null,
                                      )}
                                    kg
                                  </h4>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            {exercise.notes && false && (
                              <div className='text-sm text-gray-400'>
                                {exercise.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </div>

      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='z-10'
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
                <Dialog.Panel className='w-full max-w-3xl transform overflow-hidden rounded-md bg-black p-2 text-left align-middle text-gray-200 transition-all md:min-h-[600px] md:p-4'>
                  <Dialog.Title
                    as='h3'
                    className='flex items-center justify-between text-base font-medium leading-6 md:text-lg'
                  >
                    <div className='mb-4 flex w-full flex-col items-center justify-between gap-6 md:gap-12'>
                      <div className='flex w-full items-center justify-between gap-2 md:gap-12'>
                        <div className='text-xl font-bold'>
                          Day {dayIdx + 1}
                        </div>
                        <button
                          className='px-2 py-1 text-2xl font-bold'
                          onClick={() => closeModal()}
                        >
                          X
                        </button>
                      </div>
                      <RadioGroup
                        value={selectedEngery}
                        onChange={onSetEnergy}
                        className='w-full'
                      >
                        <div
                          className={`flex w-full items-center justify-around gap-2 text-xl`}
                        >
                          <RadioGroup.Label className='tracking-tighter'>
                            Energy Level
                          </RadioGroup.Label>
                          {['A', 'B', 'C', 'D'].map((energy) => (
                            <RadioGroup.Option
                              key={energy}
                              value={energy}
                              className={({ active, checked }) => `${
                                active ? '' : ''
                              }
                              ${
                                checked
                                  ? 'bg-yellow-500 font-extrabold text-black'
                                  : 'bg-gray-900 text-gray-700'
                              }
                                  relative flex h-8 w-8 cursor-pointer rounded-lg shadow-md focus:outline-none`}
                            >
                              {({ active, checked }) => (
                                <>
                                  <div className='flex w-full items-center justify-center'>
                                    <div className='flex items-center'>
                                      <div className=''>
                                        <RadioGroup.Label
                                          as='p'
                                          className={`${
                                            checked
                                              ? 'text-black'
                                              : 'text-gray-400'
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
                  </Dialog.Title>
                  <div className='mt-2 flex justify-center'>
                    <DayModal
                      day={day}
                      selectedEngery={selectedEngery}
                    />
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

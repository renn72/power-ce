import { useState, Fragment } from 'react'
import { Prisma } from '@prisma/client'
import { api } from '~/utils/api'

import { Dialog, Transition, RadioGroup, Disclosure } from '@headlessui/react'

import { ChevronUpIcon, StarIcon } from '@heroicons/react/20/solid'
import { StarIcon as StarIconHollow } from '@heroicons/react/24/outline'

import DayModal from './dayModal'

import getWeight from '~/utils/getWeight'
import { PlaySquare } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const dayWithExercise = Prisma.validator<Prisma.DayArgs>()({
  include: {
    exercise: {
      include: {
        set: true,
        ss: true,
      },
    },
  },
})

type Day = Prisma.DayGetPayload<typeof dayWithExercise>

const ProgramDay = ({
  day,
  dayIdx,
  weekIdx,
  openDay,
  openWeek,
  programId,
  userId,
}: {
  day: Day
  dayIdx: number
  weekIdx: number
  openDay: number
  openWeek: number
  programId: string
  userId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEngery, setSelectedEngery] = useState(day.energyRating || 'A')

  const { data: userCoreOneRM } = api.oneRepMax.getUserCoreLifts.useQuery({
    userId: userId,
  })

  const checkWeight = (
    lift: string | null,
    onerm: number | null,
    index: number | null,
  ) => {
    if (!lift || !onerm) return ''
    let energyAdjust = 1
    if (+onerm < 100) {
      if (selectedEngery === 'B') energyAdjust = 0.95
      if (selectedEngery === 'C') energyAdjust = 0.9
      if (selectedEngery === 'D') energyAdjust = 0.85
    }
    if (+onerm >= 100 && +onerm < 200) {
      if (selectedEngery === 'B') energyAdjust = 0.97
      if (selectedEngery === 'C') energyAdjust = 0.94
      if (selectedEngery === 'D') energyAdjust = 0.91
    }
    if (+onerm >= 200) {
      if (selectedEngery === 'B') energyAdjust = 0.985
      if (selectedEngery === 'C') energyAdjust = 0.97
      if (selectedEngery === 'D') energyAdjust = 0.95
    }

    if (lift == 'weight') {
      return getWeight(+onerm, 100 * energyAdjust)
    }

    if (index) {
      const rm = day?.exercise[index - 1]?.set.filter((s) => s.isComplete)
      const rmWeight = rm?.map((s) => s.estiamtedOnerm)
      if (!rmWeight) return ''
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
    // const res = Math.round((weight * (onerm / 100)) / 2.5) * 2.5
    return `${
      Math.round((((+weight * percent) / 100) * energyAdjust) / 2.5) * 2.5
    }`
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const ctx = api.useContext()

  const { mutate: updateDayEnergy } = api.programs.updateDayEnergy.useMutation({
    onSuccess: () => {
      void ctx.blocks.get.invalidate()
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const onSetEnergy = (e: string) => {
    setSelectedEngery(e)
    updateDayEnergy({
      id: day.id,
      energyRating: e,
    })
  }

  const router = useRouter()

  const isDayOpen = dayIdx === openDay && weekIdx === openWeek

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Disclosure defaultOpen={isDayOpen}>
          {({ open }) => (
            <div className='flex flex-col md:gap-8'>
              <div className='flex flex-col sm:flex-row md:gap-6'>
                <Disclosure.Button
                  className={`${
                    open
                      ? 'border-b border-yellow-500'
                      : 'border-b border-black hover:border-white'
                  } flex w-full items-center justify-between gap-8 text-lg font-medium`}
                >
                  <h2
                    className={`text-xl font-bold ${
                      day.isComplete ? 'text-green-500' : ''
                    }`}
                  >
                    Day {dayIdx + 1}
                  </h2>
                  <ChevronUpIcon
                    className={`${
                      open
                        ? 'rotate-180 transform text-white/80'
                        : 'text-white/30'
                    } h-10 w-10 text-gray-400`}
                  />
                  {day?.isComplete ? (
                    <StarIcon className='h-8 w-8 text-yellow-500' />
                  ) : (
                    <div className='flex w-8 justify-end'>
                      <StarIconHollow className='h-6 w-6 text-gray-600' />
                    </div>
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
                  <Link
                    href={`/day/${day.id}`}
                    prefetch={false}
                  >
                    <div className='flex cursor-pointer flex-col divide-y divide-dashed divide-gray-600 hover:bg-gray-900'>
                      {day.exercise.map((exercise) => (
                        <div
                          key={exercise.id}
                          className='relative flex cursor-pointer flex-col gap-0 py-1'
                        >
                          <div className='flex w-full items-center justify-between gap-1 md:gap-2'>
                            <h3 className='text-lg capitalize leading-6 text-yellow-500'>
                              {exercise.ss && exercise.ss.length > 0
                                ? 'Super Set'
                                : exercise.name}
                            </h3>
                            <div className='mr-2'>
                              {exercise.isComplete ? (
                                <StarIcon className='h-5 w-5 text-yellow-500' />
                              ) : (
                                <StarIconHollow className='h-5 w-5 text-gray-600' />
                              )}
                            </div>
                          </div>
                          <div>
                            {exercise.ss && exercise.ss.length > 0 ? (
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
                            ) : (
                              <div className='relative flex items-baseline gap-6 text-sm lg:flex-col'>
                                <div className='flex gap-2 '>
                                  <h3>{exercise.sets}</h3>
                                  <h3>X</h3>
                                  <h3>{exercise.reps}</h3>
                                  <h3>
                                    {exercise.repUnit
                                      ? exercise.repUnit
                                      : 'reps'}
                                  </h3>
                                </div>
                                <div className='relative'>
                                  {exercise.weightType === 'percent' && (
                                    <div className=''>
                                      {exercise.estimatedOnermIndex ? (
                                        <div>
                                          {Number(
                                            day?.exercise[
                                              exercise?.estimatedOnermIndex - 1
                                            ]?.set[0]?.weight,
                                          ) > 0 ? (
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
                                          ) : null}
                                        </div>
                                      ) : null}
                                    </div>
                                  )}
                                  {exercise.weightType === 'onerm' && (
                                    <div className=''>
                                      {exercise.estimatedOnermIndex ? (
                                        <div>
                                          {Number(
                                            day?.exercise[
                                              exercise?.estimatedOnermIndex - 1
                                            ]?.set[0]?.weight,
                                          ) > 0 && (
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
                                      <h4 className='flex items-baseline justify-center font-semibold'>
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
                            )}
                            <div
                              className=''
                              onClick={(e) => e.stopPropagation()}
                            >
                              {exercise.htmlLink && (
                                <a
                                  href={exercise.htmlLink}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='absolute bottom-0 right-1 flex justify-end text-sm text-gray-400'
                                >
                                  <PlaySquare
                                    size={26}
                                    fill='#EAB308'
                                    color='black'
                                  />
                                </a>
                              )}
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
                  </Link>
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
                              {({ checked }) => (
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
                      programId={programId}
                      day={day}
                      selectedEngery={selectedEngery}
                      userId={userId}
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

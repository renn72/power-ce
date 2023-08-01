import {
  useState, Fragment, useEffect,

} from 'react'
import {
  type Exercise, type UserProgram, type Set,
} from '@prisma/client'
import {
  type Day, type Exercise as StoreExercise,
} from '~/store/types'
import { api, } from '~/utils/api'

import {
  Dialog, Transition, RadioGroup, Disclosure,
} from '@headlessui/react'
import { ChevronUpIcon, } from '@heroicons/react/20/solid'
import {
  ScrollArea, ScrollBar,
} from '@/components/ui/scroll-area'
import getWeight from '~/utils/getWeight'

const checkWeight = (exercise: StoreExercise, range: boolean, energyRating: string | null, coreLifts: number[]) => {
  const lift = exercise.lift
  let energyAdjust = 1
  if (energyRating === 'B') energyAdjust = 0.98
  if (energyRating === 'C') energyAdjust = 0.96
  if (energyRating === 'D') energyAdjust = 0.94

  let onerm = exercise.onerm
  let onermTop = exercise.onermTop

  const squat = coreLifts[0]
  const deadlift = coreLifts[1]
  const bench = coreLifts[2]

  if (!lift) return null
  if (!onerm) return null
  if (lift === 'unlinked') return null

  onerm = +onerm * energyAdjust
  if (onermTop) onermTop = +onermTop * energyAdjust

  if (lift === 'Squat') {
    if (!squat || squat === 0) return null
    if (range) {
      if (onermTop) {
        return `${getWeight(+squat, +onerm)}kg-${getWeight(+squat, +onermTop)}kg`
      } else {
        return `${getWeight(+squat, +onerm)}kg-${getWeight(+squat, +onerm * 1.05)}kg`
      }
    }
    return getWeight(+squat, +onerm)
  }
  if (lift === 'Deadlift') {
    if (!deadlift || deadlift === 0) return null
    if (range) {
      if (onermTop) {
        return `${getWeight(+deadlift, +onerm)}kg-${getWeight(+deadlift, +onermTop)}kg`
      } else {
        return `${getWeight(+deadlift, +onerm)}kg-${getWeight(+deadlift, +onerm * 1.05)}kg`
      }
    }
    return getWeight(+deadlift, +onerm)
  }
  if (lift === 'Bench') {
    if (!bench || bench === 0) return null
    if (range) {
      if (onermTop) {
        return `${getWeight(+bench, +onerm)}kg-${getWeight(+bench, +onermTop)}kg`
      } else {
        return `${getWeight(+bench, +onerm)}kg-${getWeight(+bench, +onerm * 1.05)}kg`
      }
    }
    return getWeight(+bench, +onerm)
  }
  return null
}

const ExerciseModal = ({
  exercise, selectedEnergy, coreLifts,
}: { exercise: StoreExercise, selectedEnergy: string, coreLifts: number[] }) => {

  const [
    rpe,
    setRpe,
  ] = useState('7')

  const [
    weights,
    setWeights,
  ] = useState<number | string>(
    () => {
      const _w = checkWeight(exercise, false, selectedEnergy, coreLifts)
      return _w || ''
    }
  )

  const utils = api.useContext()

  const { mutate: updateSet, } = api.programs.updateSet.useMutation({
    onMutate: async (newSet) => {
      console.log('id', newSet)
      await utils.blocks.getAllUserPrograms.cancel()
      const previousPrograms = utils.blocks.getAllUserPrograms.getData()
      utils.blocks.getAllUserPrograms.setData(undefined, (prev) => {
        console.log('prev', prev)
        return prev
      })

      utils.blocks.getAllUserPrograms.setData(undefined, (prev) => prev?.map((program) => {
        return {
          ...program,
          week: program.week.map((week) => {
            return {
              ...week,
              day: week.day.map((day) => {
                return {
                  ...day,
                  exercise: day.exercise.map((exercise) => {
                    return {
                      ...exercise,
                      set: exercise.set.map((set) => {
                        if (set.id === newSet.id) {
                          return {
                            ...set,
                            isComplete: newSet.isComplete,
                            rpe: newSet.rpe,
                            weight: newSet.weight,
                          }
                        }
                        return set
                      }),
                    }
                  }),
                }
              }),
            }
          }),
        }

      }))

      return { previousPrograms, }

    },
    onError: (err, newSet, context) => {
      console.log(err)
      utils.blocks.getAllUserPrograms.setData(undefined, context?.previousPrograms)
    },
    onSettled: () => {
      void utils.blocks.getAllUserPrograms.invalidate()
    },
  })

  const onSetDone = (set: Set) => {
    console.log('set', set)
    updateSet({
      id: set.id,
      isComplete: !set.isComplete,
      rpe: +rpe,
      weight: +weights,
    })
  }

  const setWeight = (exercise: StoreExercise, range: boolean, energyRating: string | null,) => {
    if (weights) {
      return weights.toString() + 'kg'
    }
    return null
  }

  useEffect(() => {
    const _w = checkWeight(exercise, false, selectedEnergy, coreLifts)
    setWeights(_w || '')
  }, [selectedEnergy,])

  return (
    <>
      <Disclosure >
        {({ open, }) => (
          <div className='flex flex-col justify-start gap-2 border border-gray-600 rounded-xl'>
            <div className='flex flex-col gap-0'>
              <Disclosure.Button className={`w-full text-lg md:text-xl`}>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-end gap-4 md:gap-8'>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''} h-6 w-8 text-gray-300 `}
                    />
                    <div className='first-letter:uppercase first-letter:text-2xl first-letter:font-bold'>
                      {exercise.name}
                    </div>
                    {exercise.sets && exercise.reps && (
                      <div>
                        {exercise.sets} x {exercise.reps}
                      </div>
                    )}
                    {exercise.lift && exercise.onerm && (
                      <div className=''>
                        {checkWeight(exercise, true, selectedEnergy, coreLifts)}
                      </div>
                    )
                    }
                  </div>
                  <div className='transition ease-in-out delay-150'>
                    <div className={open ? `absolute font-extralight text-sm opacity-40 transition-all ease-out delay-[10ms]` : `absolute w-full font-extralight text-sm flex flex-row gap-1 justify-start opacity-100 transition-all ease-out delay-[45ms]`}>
                      {exercise?.notes && exercise?.notes?.length > 0 && exercise?.notes?.slice(0, 35).trim()}
                      {exercise?.notes && exercise?.notes?.length > 0 && exercise?.notes?.length > 35 && (<span className={open ? `opacity-0` : ``}>...</span>)}
                    </div>
                  </div>
                </div>
              </Disclosure.Button>
              <Transition
                enter='transition duration-100 ease-in'
                enterFrom='transform opacity-0'
                enterTo='transform opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform opacity-100'
                leaveTo='transform opacity-0'
              >
                <Disclosure.Panel>
                  <div className='flex flex-col gap-4'>
                    <div className='font-extralight text-sm'>
                      {exercise?.notes}
                    </div>
                    {exercise.sets && exercise.reps && (
                      <div className='flex flex-col gap-4 md:gap-6'>
                        <div className='flex gap-4 md:gap-6 w-full justify-center text-2xl font-bold cursor-pointer'>
                          <div className='' onClick={() => setWeights(+weights + 1.25)}>
                            +
                          </div>
                          <div className='w-28 text-center'>
                            {weights}kg
                          </div>
                          <div>
                            -
                          </div>
                        </div>

                        <div className='flex gap-4 md:gap-6 w-full justify-center text-xl font-medium'>
                          {
                            exercise.set.reduce((acc, curr) => {
                              return acc + (curr.isComplete ? 1 : 0)
                            }, 0)
                          } / {exercise.reps}
                        </div>
                        <RadioGroup value={rpe} onChange={setRpe}>
                          <div className={`flex gap-2 p-2  items-center justify-around`}>
                            <RadioGroup.Label className='text-2xl font-medium'>RPE</RadioGroup.Label>
                            {[
                              '6',
                              '7',
                              '8',
                              '9',
                              '10',
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
                                                relative flex cursor-pointer rounded-full w-8 h-8 shadow-md focus:outline-none`
                                }
                              >
                                {({
                                  active, checked,
                                }) => (
                                  <>
                                    <div className='flex w-full items-center justify-center'>
                                      <div className='flex items-center'>
                                        <div className='text-xl'>
                                          <RadioGroup.Label
                                            as='p'
                                            className={`font-bold  ${checked ? 'text-gray-100 scale-120' : 'text-gray-300'
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
                        <div className={`flex gap-4 px-1 items-center overflow-x-scroll md:overflow-x-auto h-28 `}>
                          {
                            exercise?.set?.map((set,) => (
                              <div
                                key={set.id}
                                onClick={() => onSetDone(set)}
                                className='flex flex-col gap-1'
                              >
                                <div className={set.isComplete ? `bg-gray-600 text-xl border border-gray-600 rounded-full  h-12 min-w-[3rem] flex items-center justify-center cursor-pointer hover:scale-105` : `text-xl border border-gray-600 rounded-full h-12 min-w-[3rem] flex items-center justify-center bg-gray-800 cursor-pointer hover:scale-105`}>
                                  {set.rep}
                                </div>
                                <div className='h-8'>
                                  {set.isComplete && (
                                    <div className='flex flex-col items-center text-xs tracking-tighter text-gray-400'>
                                      <div>
                                        RPE:{set.rpe}
                                      </div>
                                      <div>
                                        W:{set.weight}
                                      </div>
                                    </div>
                                  )
                                  }
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </Disclosure.Panel>

              </Transition>
            </div>
          </div>
        )}
      </Disclosure >
    </>
  )
}

const DayModal = ({
  day, selectedEngery,
}: { day: Day, selectedEngery: string }) => {

  const { data: userCoreOneRM, } = api.oneRepMax.getUserCoreLifts.useQuery()
  const squat = +userCoreOneRM?.filter((coreLift) => coreLift?.lift === 'squat')[0]?.weight || 0
  const deadlift = +userCoreOneRM?.filter((coreLift) => coreLift?.lift === 'deadlift')[0]?.weight || 0
  const bench = +userCoreOneRM?.filter((coreLift) => coreLift?.lift === 'bench')[0]?.weight || 0
  const coreLifts = [
    squat,
    deadlift,
    bench,
  ]

  console.log(day)

  return (
    <>
      {day.isRestDay
        ? (
          <div>
            Rest Day
          </div>
        )
        : (
          <div className='w-full flex flex-col gap-10 md:p-2 '>
            {day.exercise.map((exercise, exerciseIdx) => (
              <div key={exercise.id} >
                <ExerciseModal exercise={exercise} selectedEnergy={selectedEngery} coreLifts={coreLifts} />
              </div>
            ))}
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
  const [
    selectedEngery,
    setSelectedEngery,
  ] = useState(day.energyRating)

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
        className='border border-gray-600 rounded-lg p-1 hover:bg-gray-600 hover:scale-105 transform transition-all cursor-pointer'
        onClick={() => openModal()}
      >
        <div className='font-bold'>
          Day {dayIdx + 1}
        </div>
        {day.isRestDay
          ? (
            <div>
              Rest Day
            </div>
          )
          : day.exercise.map((exercise) => (
            <div
              key={exercise.id}
              className='flex flex-row justify-start gap-2'
            >
              <div className='md:w-14 break-words'>
                {exercise.name}
              </div>
              {exercise.sets && exercise.reps && (
                <div className='flex gap-1'>
                  <div>
                    {exercise.sets} x {exercise.reps}
                  </div>
                  {exercise.lift && exercise.onerm && (
                    <div>
                      {checkWeight(exercise, false, null, coreLifts)}
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

const ProgramCard = ({ userProgram, }: { userProgram: UserProgram }) => {
  const { data: programs, } = api.blocks.getAllUserPrograms.useQuery()
  const program = programs?.find((program) => program.id === userProgram.programId)
  return (
    <>
      {userProgram.isProgramActive
        ? (
          <div
            className='border font-normal border-gray-600 rounded-lg shadow-md shadow-gray-400/20 p-2'
          >
            <div className='font-bold'>
              Name: {program?.name}
            </div>
            <div
              className='flex flex-col gap-4'
            >
              {program?.week.map((week, weekIdx) => (
                <div
                  key={week.id}
                  className='border border-gray-600 rounded-lg p-1 '
                >
                  <div className='text-lg font-bold text-center md:text-left'>
                    Week {weekIdx + 1}
                  </div>
                  <div
                    className='grid md:grid-cols-7 gap-2 mt-4 '
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

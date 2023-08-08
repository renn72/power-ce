import {
  useState, useEffect,
} from 'react'
import { type Set, } from '@prisma/client'
import {
  type Day, type Exercise as StoreExercise,
} from '~/store/types'
import { api, } from '~/utils/api'

import {
  Transition, RadioGroup, Disclosure,
} from '@headlessui/react'
import { ChevronUpIcon, ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon, CheckCircleIcon, PlusCircleIcon, MinusCircleIcon, } from '@heroicons/react/20/solid'
import { rpe as rpeTable, } from '~/store/defaultValues'

import checkWeight from '~/utils/checkWeigth'

const ExerciseModal = ({
  exercise, selectedEnergy, coreLifts, day,
}: { exercise: StoreExercise, selectedEnergy: string, coreLifts: number[], day: Day, }) => {

  const [
    rpe,
    setRpe,
  ] = useState('8')

  const [
    weights,
    setWeights,
  ] = useState<number | string>(
    () => {
      const _w = checkWeight(exercise, false, selectedEnergy, coreLifts)
      return _w || ''
    }
  )

  const [
    e1rm,
    setE1rm,
  ] = useState<number[]>([0,])

  const utils = api.useContext()

  const { mutate: updateRpe } = api.programs.updateSetRpe.useMutation({
    onMutate: async (newRpe) => {
      console.log('id', newRpe)
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
                        if (set.id === newRpe.id) {
                          return {
                            ...set,
                            rpe: newRpe.rpe,
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
      return previousPrograms
    },
    onError: (err, newRpe, context) => {
      console.log('err', err)
      utils.blocks.getAllUserPrograms.setData(undefined, context?.previousPrograms)
    },
    onSettled: () => {
      void utils.blocks.getAllUserPrograms.invalidate()
    },
  })

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
                            estiamtedOnerm: newSet.estiamtedOnerm,
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
      estiamtedOnerm: !set.isComplete ? +(+weights / (e1rm[exercise?.reps - 1] / 100)).toFixed(0) : 0, //e1rm,
    })
  }

  useEffect(() => {
    const index = 8 - ((+rpe - 6) / 0.5)
    if (rpeTable[index]) setE1rm(rpeTable[index])
  }, [
    weights,
    rpe,
  ])

  const onCheckWeight = (exercise: StoreExercise, range: boolean, energyRating: string | null, coreLifts: number[]) => {

    if (exercise.isEstimatedOnerm) {
      if (exercise.id === day.exercise[0]?.id) return checkWeight(exercise, range, energyRating, coreLifts)
      if (exercise.lift !== day.exercise[0]?.lift) return checkWeight(exercise, range, energyRating, coreLifts)
      if (!day.exercise[0]?.set[0]?.isComplete) return checkWeight(exercise, range, energyRating, coreLifts)

      const _map = day.exercise[0]?.set.map((set) => +set?.estiamtedOnerm || 0).filter((set) => set !== 0)
      const _m = _map.pop()
      if (_m) return checkWeight(exercise, range, energyRating, [_m, _m, _m,],)
      return checkWeight(exercise, range, energyRating, coreLifts)
    }
    return checkWeight(exercise, range, energyRating, coreLifts)
  }

  const onUpdateRpe = (set : Set, increase: boolean) => {
    console.log('id', set)
    console.log('increase', increase)
  }

  return (
    <>
      <Disclosure >
        {({ open, }) => (
          <div className='flex flex-col justify-start gap-2 border border-gray-600 rounded-xl'>
            <div className='flex flex-col gap-0'>
              <Disclosure.Button className={`w-full text-lg md:text-xl`}>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-end gap-2 md:gap-8'>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180 transform' : ''} h-6 w-8 text-gray-300 `}
                    />
                    <div className='flex items-center'>
                      <div className='first-letter:uppercase first-letter:text-2xl first-letter:font-bold '>
                        {exercise.name}
                      </div>
                      {exercise.isEstimatedOnerm && (
                        <CheckCircleIcon className='h-4 w-4 text-green-400' />)
                      }
                    </div>
                    {exercise.sets && exercise.reps && (
                      <div>
                        {exercise.sets}x{exercise.reps}
                      </div>
                    )}
                    {exercise.lift && exercise.onerm && (
                      <div className=''>
                        {onCheckWeight(exercise, true, selectedEnergy, coreLifts)}
                      </div>
                    )
                    }
                  </div>
                  <div className='transition ease-in-out delay-150 ml-16'>
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
                    <div className='font-extralight text-sm ml-16'>
                      {exercise?.notes}
                    </div>
                    {exercise.sets && exercise.reps && (
                      <div className='flex flex-col gap-4 md:gap-6'>
                        <div className='flex gap-4 md:gap-6 w-full justify-center text-2xl font-bold'>
                          <div className='cursor-pointer rounded-full w-8 h-8 text-center' onClick={() => setWeights(+weights + 1.25)}>
                            +
                          </div>
                          <div className='w-28 text-center'>
                            {weights}kg
                          </div>
                          <div className='cursor-pointer rounded-full w-8 h-8 text-center' onClick={() => setWeights(+weights - 1.25)}>
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
                          <div className={`grid grid-cols-9 md:grid-cols-10 gap-1 md:p-2 mx-1 md:mx-6  items-center justify-between`}>
                            <RadioGroup.Label className='text-xl font-medium col-span-9 md:col-span-1 text-center md:text-left'>RPE</RadioGroup.Label>
                            {[
                              '6',
                              '6.5',
                              '7',
                              '7.5',
                              '8',
                              '8.5',
                              '9',
                              '9.5',
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
                                            ${checked ? 'bg-gray-400 bg-opacity-75 text-white font-bold' : 'bg-gray-700 text-gray-200'}
                                                relative flex cursor-pointer rounded-full w-8 h-8 shadow-md focus:outline-none`
                                }
                              >
                                {({
                                  active, checked,
                                }) => (
                                  <>
                                    <div className='flex w-full items-center justify-center'>
                                      <div className='flex items-center'>
                                        <div className='text-lg'>
                                          <RadioGroup.Label
                                            as='p'
                                            className={`font-semibold tracking-tighter ${checked ? 'text-gray-100 scale-120' : 'text-gray-300'
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
                        <div className='flex px-2 gap-2 mx-1 md:mx-6'>
                          <div>
                            E1RM
                          </div>
                          <div>
                            {(weights / (e1rm[exercise.reps - 1] / 100)).toFixed(0)}kg
                          </div>
                        </div>
                        <div className={`flex gap-4 px-1 items-center overflow-x-scroll md:overflow-x-auto h-56 `}>
                          <MinusCircleIcon className='h-8 w-8 text-gray-600 mb-9 flex-shrink-0' />

                          {
                            exercise?.set?.map((set,) => (
                              <div
                                key={set.id}
                                onClick={() => onSetDone(set)}
                                className='flex flex-col items-center justify-center gap-1'
                              >
                                <ChevronUpIcon 
                                  onClick={() => onUpdateRpe(set, true)}
                                  className='h-10 w-10 text-gray-400 cursor-pointer' 
                                />
                                <div
                                  className='flex flex-col gap-1'
                                >
                                  <div className={set.isComplete ? `bg-gray-600 text-xl border border-gray-600 rounded-full  h-12 min-w-[3rem] flex items-center justify-center cursor-pointer hover:scale-105` : `text-xl border border-gray-600 rounded-full h-12 min-w-[3rem] flex items-center justify-center bg-gray-800 cursor-pointer hover:scale-105`}>
                                    {set.rep}
                                  </div>
                                </div>
                                <ChevronDownIcon 
                                  onClick={() => onUpdateRpe(set, false)}
                                  className='h-10 w-10 text-gray-400 cursor-pointer'
                                />
                                <div className='h-8'>
                                  {set.isComplete && (
                                    <div className='flex flex-col items-center text-xs tracking-tighter text-gray-400'>
                                      <div>
                                        RPE:{set.rpe}
                                      </div>
                                      <div>
                                        W:{set.weight}
                                      </div>
                                      {set?.estiamtedOnerm && (
                                        <div>
                                          E:{set?.estiamtedOnerm}
                                        </div>
                                      )}
                                    </div>
                                  )
                                  }
                                </div>
                              </div>
                            ))
                          }
                          <PlusCircleIcon className='h-8 w-8 text-gray-600 mb-9 flex-shrink-0' />
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

  const [coreLifts,] = useState(() => {
    return [
      +userCoreOneRM.filter((coreLift) => coreLift.lift === 'squat')[0].weight || 0,
      +userCoreOneRM.filter((coreLift) => coreLift.lift === 'deadlift')[0].weight || 0,
      +userCoreOneRM.filter((coreLift) => coreLift.lift === 'bench')[0].weight || 0,
    ]
  })

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
            {day.exercise.map((exercise,) => (
              <div key={exercise.id} >
                <ExerciseModal exercise={exercise} selectedEnergy={selectedEngery} coreLifts={coreLifts} day={day} />
              </div>
            ))}
          </div>
        )}
    </>
  )
}

export default DayModal

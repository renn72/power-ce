import {
  useState, useEffect,
} from 'react'
import {
  type Set, type Exercise,
} from '@prisma/client'
import {
  type Day, type Exercise as StoreExercise,
} from '~/store/types'
import { api, } from '~/utils/api'

import {
  Transition, RadioGroup, Disclosure,
} from '@headlessui/react'
import {
  ChevronUpIcon, StarIcon, ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon, CheckCircleIcon, PlusCircleIcon, MinusCircleIcon,
} from '@heroicons/react/20/solid'
import { StarIcon as StarIconHollow, } from '@heroicons/react/24/outline'
import { rpe as rpeTable, } from '~/store/defaultValues'

import { useUser, } from '@clerk/nextjs'

import getWeight from '~/utils/getWeight'
import { Input, } from '@/components/ui/input'

const ExerciseModal = ({
  exercise, selectedEnergy, day,
}: { exercise: StoreExercise, selectedEnergy: string, day: Day, }) => {

  const [
    rpe,
    setRpe,
  ] = useState('8')

  const { user, } = useUser()
  const { data: userCoreOneRM, } = api.oneRepMax.getUserCoreLifts.useQuery({ userId: user?.id || '', })

  const checkWeight = (lift: string | null, onerm: number | null, index: number | null) => {
    if (!lift || !onerm) return ''
    let energyAdjust = 1
    if (selectedEnergy === 'B') energyAdjust = 0.98
    if (selectedEnergy === 'C') energyAdjust = 0.96
    if (selectedEnergy === 'D') energyAdjust = 0.94

    if (lift == 'weight') {
      return getWeight(+onerm, 100 * energyAdjust,)
    }

    if (index) {
      const rm = day?.exercise[index - 1]?.set.filter((s) => s.isComplete)
      const rmWeight = rm?.map((s) => s.estiamtedOnerm)
      const w = rmWeight[rmWeight.length - 1]

      if (w) return getWeight(+w, onerm * energyAdjust,)
    }

    const w = userCoreOneRM?.find((coreLift) => coreLift?.lift === lift.toLowerCase())?.weight

    if (!w) return ''

    return getWeight(+w, onerm * energyAdjust,)
  }

  const [
    weights,
    setWeights,
  ] = useState<number | string>('')

  const [
    e1rm,
    setE1rm,
  ] = useState<number[]>([0,])

  const utils = api.useContext()

  const { mutate: updateRpe, } = api.programs.updateSetRpe.useMutation({
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

  const { mutate: updateExerciseComplete } = api.programs.completeExercise.useMutation({
    onMutate: async (newExercise) => {
      console.log('id', newExercise)
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
                    if (exercise.id === newExercise.id) {
                      return {
                        ...exercise,
                        isComplete: newExercise.isComplete,
                      }
                    }
                    return exercise
                  }),
                }
              }),
            }
          }),
        }
      }))
      return { previousPrograms, }
    },
    onError: (err, newExercise, context) => {
      console.log('err', err)
      utils.blocks.getAllUserPrograms.setData(undefined, context?.previousPrograms)
    }

  })

  const { mutate: updateDayComplete } = api.programs.completeDay.useMutation({
    onMutate: async (newDay) => {
      console.log('id', newDay)
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
                if (day.id === newDay.id) {
                  return {
                    ...day,
                    isComplete: newDay.isComplete,
                  }
                }
                return day
              }),
            }
          }),
        }
      }))
      return { previousPrograms, }
    },
    onError: (err, newExercise, context) => {
      console.log('err', err)
      utils.blocks.getAllUserPrograms.setData(undefined, context?.previousPrograms)
    }

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
                            rep: newSet.rep,
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
      rep: set?.rep,
    })

    const isDone = exercise.set
      .reduce(
        (acc, curr) => {
          if (curr.id == set.id && set.isComplete) return false
          if (curr.id == set.id) return acc
          return curr.isComplete ? acc : false
        }
        , true)

    if (!exercise.isComplete && isDone) updateExerciseComplete({ id: exercise.id, isComplete: true, })
    if (exercise.isComplete && !isDone) updateExerciseComplete({ id: exercise.id, isComplete: false, })

    const isDayDone = day.exercise.reduce((acc, curr) => {
      if (curr.id == exercise.id && exercise.isComplete) return false
      if (curr.id == exercise.id && isDone) return acc
      return curr.isComplete ? acc : false
    }, true)

    console.log('isdaydone', isDayDone)
    console.log('day', day)

    if (!day.isComplete && isDayDone) updateDayComplete({ id: day.id, isComplete: true, })
    console.log('daycomp', day.isComplete)
    console.log('isdaydone', isDayDone)
    if (day.isComplete && !isDayDone) updateDayComplete({ id: day.id, isComplete: false, })

  }



  useEffect(() => {
    const index = 8 - ((+rpe - 6) / 0.5)
    if (rpeTable[index]) setE1rm(rpeTable[index])
  }, [
    weights,
    rpe,
  ])

  const onCheckWeight = (exercise: StoreExercise, energyRating: string | null) => {

    return '10kg'
  }

  const onUpdateRpe = (set: Set, increase: boolean) => {
    console.log('id', set)
    console.log('increase', increase)
    if (!set.rpe) return
    const newRep = increase ? +set.rep + 1 : +set.rep - 1
    if (newRep < 1) return

    updateSet({
      id: set.id,
      isComplete: set.isComplete,
      rpe: +rpe,
      weight: +weights,
      estiamtedOnerm: !set.isComplete ? +(+weights / (e1rm[exercise?.reps - 1] / 100)).toFixed(0) : 0, //e1rm,
      rep: newRep,
    })
  }

  return (
    <>
      <Disclosure >
        {({ open, }) => (
          <div className='flex flex-col justify-start gap-2 '>
            <div className='flex flex-col gap-0'>
              <Disclosure.Button className={`w-full text-lg md:text-xl mt-2`}>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-2 '>
                    <div className='flex items-end gap-2 md:gap-8'>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180 transform' : ''} h-6 w-8 text-gray-300 `}
                      />
                      <div className='flex items-center justify-between w-full mr-4'>
                        <div className='first-letter:uppercase first-letter:text-2xl first-letter:font-bold text-yellow-500 '>
                          {exercise.name}
                        </div>
                        {exercise?.isComplete ? (<StarIcon className='h-6 w-6 text-yellow-500' />) : (<StarIconHollow className='h-6 w-6 text-gray-600' />)}
                      </div>
                    </div>
                    <div className='flex items-end gap-2 md:gap-8 ml-10 md:ml-16'>
                      <div
                        className='flex gap-1 '>
                        <h3>{exercise.sets}</h3>
                        <h3>X</h3>
                        <h3>{exercise.reps}</h3>
                        <h3>{exercise.repUnit ? exercise.repUnit : ''}</h3>
                      </div>
                      <div>
                        {
                          exercise.weightType === 'onerm'
                          && (
                            <div className='flex'>
                              <h4>
                                {checkWeight(exercise.lift, +exercise?.onerm, exercise.estimatedOnermIndex)}
                              </h4>
                              <h4>-</h4>
                              <h4>
                                {checkWeight(exercise.lift, +exercise?.onermTop, exercise.estimatedOnermIndex)}kg
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
                    </div>
                  </div>
                  <div className='transition ease-in-out delay-150 ml-10 md:ml-16'>
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
                    <div className='font-extralight text-sm ml-10 md:ml-16'>
                      {exercise?.notes}
                    </div>
                    {exercise.sets && exercise.reps && (
                      <div className='flex flex-col gap-4 md:gap-6'>
                        <div className='flex gap-4 md:gap-6 w-full justify-center text-2xl font-bold'>
                          <div className='cursor-pointer rounded-full w-8 h-8 text-center' onClick={() => setWeights(+weights + 2.5)}>
                            +
                          </div>
                          <div className='w-28 text-center'>
                            <Input
                              type='number'
                              className='text-center text-xl font-bold border-white border-b-4'
                              value={weights}
                              placeholder='weight'
                              onChange={(e) => setWeights(+e.target.value)}
                            />
                          </div>
                          <div className='cursor-pointer rounded-full w-8 h-8 text-center' onClick={() => setWeights(+weights - 2.5)}>
                            -
                          </div>
                        </div>

                        <div className='flex gap-4 md:gap-6 w-full justify-center text-xl font-medium'>
                          {
                            exercise.set.reduce((acc, curr) => {
                              return acc + (curr.isComplete ? 1 : 0)
                            }, 0)
                          } / {exercise.sets}
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
                                            ${checked ? 'bg-yellow-500 text-white font-bold' : 'bg-gray-800 text-gray-200'}
                                                relative flex justify-center items-center cursor-pointer rounded-full shadow-md focus:outline-none w-8 h-8 `
                                }
                              >
                                {({
                                  active, checked,
                                }) => (
                                  <>
                                    <div className='flex w-full items-center text-xs justify-center'>
                                      <RadioGroup.Label
                                        as='p'
                                        className={`font-semibold tracking-tighter first-letter:text-lg md:mt-[2px] ${checked ? 'text-gray-900' : 'text-gray-300'
                                          } ${energy === '10' ? 'text-lg' : ''}`}
                                      >
                                        {energy}
                                      </RadioGroup.Label>
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
                        <div className={`flex gap-4 px-1 items-center overflow-x-scroll md:overflow-x-auto h-56`}>
                          {/* <MinusCircleIcon className='h-8 w-8 text-gray-600 mb-9 flex-shrink-0' /> */}

                          {
                            exercise?.set?.map((set,) => (
                              <div
                                key={set.id}
                                className='flex flex-col items-center justify-center gap-1'
                              >
                                <ChevronUpIcon
                                  onClick={() => onUpdateRpe(set, true)}
                                  className='h-10 w-10 text-gray-400 cursor-pointer'
                                />
                                <div
                                  className='flex flex-col gap-1'
                                  onClick={() => onSetDone(set)}
                                >
                                  <div className={set.isComplete ? `bg-yellow-500 text-xl rounded-full text-black  h-12 min-w-[3rem] flex items-center justify-center cursor-pointer hover:scale-105` : `text-xl rounded-full h-12 min-w-[3rem] flex items-center justify-center bg-gray-800 cursor-pointer hover:scale-105`}>
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
                          {/* <PlusCircleIcon className='h-8 w-8 text-gray-600 mb-9 flex-shrink-0' /> */}
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

  return (
    <>
      {day.isRestDay
        ? (
          <div>
            Rest Day
          </div>
        )
        : (
          <div className='w-full flex flex-col gap-10 md:p-2 divide-y divide-dashed divide-gray-600'>
            {day.exercise.map((exercise,) => (
              <div
                key={exercise.id}
                className=''
              >
                <ExerciseModal exercise={exercise} selectedEnergy={selectedEngery} day={day} />
              </div>
            ))}
          </div>
        )}
    </>
  )
}

export default DayModal

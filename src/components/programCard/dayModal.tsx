import { useState, useEffect } from 'react'
import { type Set } from '@prisma/client'
import { type Day, type Exercise as StoreExercise, type Set as SetStore } from '~/store/types'
import { api } from '~/utils/api'

import { AnimatePresence, motion } from 'framer-motion'
import { Transition, RadioGroup, Disclosure } from '@headlessui/react'
import {
  ChevronUpIcon,
  StarIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid'
import { StarIcon as StarIconHollow } from '@heroicons/react/24/outline'
import { rpe as rpeTable } from '~/store/defaultValues'

import { useUser } from '@clerk/nextjs'

import getWeight from '~/utils/getWeight'

import { NumericFormat } from 'react-number-format'

const SetsModal = ({
  exercise,
  onUpdateRpe,
  onSetDone,
  isComplete,
}: {
  exercise: StoreExercise,
  onUpdateRpe: (args0 : SetStore, args1 : boolean) => void,
  onSetDone: (args0 : SetStore) => void,
  isComplete: boolean,
}) => {
  return (
    <AnimatePresence>
      <div className='flex h-28 gap-2 px-1'>
        {exercise.set
          .filter((s) => s.isComplete == isComplete)
          .map((set, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 1, y: 2 }}
              transition={{ ease: 'easeIn', duration: 0.3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <div className='flex flex-col items-center justify-center gap-1'>
                {!set.isComplete && (
                  <ChevronUpIcon
                    onClick={() => onUpdateRpe(set, true)}
                    className='h-10 w-10 cursor-pointer text-gray-400'
                  />
                )}
                <div
                  className='flex flex-col gap-1'
                  onClick={() => onSetDone(set)}
                >
                  <div
                    className={
                      set.isComplete
                        ? `flex h-12 min-w-[1rem] cursor-pointer items-center justify-center rounded-full bg-black text-2xl font-bold text-yellow-500`
                        : `flex h-12 min-w-[3rem] cursor-pointer items-center justify-center rounded-full bg-gray-800 text-xl hover:scale-105`
                    }
                  >
                    {set.rep}
                  </div>
                </div>
                {!set.isComplete && (
                  <ChevronDownIcon
                    onClick={() => onUpdateRpe(set, false)}
                    className='h-10 w-10 cursor-pointer text-gray-400'
                  />
                )}
                <div className='h-8'>
                  {set.isComplete && (
                    <div className='flex flex-col items-center text-xs tracking-tighter text-gray-400'>
                      <div>RPE:{set.rpe}</div>
                      <div
                        className={
                          set.weight == 0 && exercise.lift != 'unlinked'
                            ? 'text-red-500'
                            : ''
                        }
                      >
                        W:{set.weight}
                      </div>
                      {set?.estiamtedOnerm && set?.estiamtedOnerm !== 0 && (
                        <div
                          className={set?.estiamtedOnerm == 0 ? 'hidden' : ''}
                        >
                          E:{set?.estiamtedOnerm}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </AnimatePresence>
  )
}

const ExerciseModal = ({
  exercise,
  selectedEnergy,
  day,
}: {
  exercise: StoreExercise
  selectedEnergy: string
  day: Day
}) => {
  const [rpe, setRpe] = useState('8')

  const { user } = useUser()
  const { data: userCoreOneRM } = api.oneRepMax.getUserCoreLifts.useQuery({
    userId: user?.id || '',
  })

  const checkWeight = (
    lift: string | null,
    onerm: number | null,
    index: number | null
  ) => {
    if (!lift || !onerm) return ''
    let energyAdjust = 1
    if (selectedEnergy === 'B') energyAdjust = 0.98
    if (selectedEnergy === 'C') energyAdjust = 0.96
    if (selectedEnergy === 'D') energyAdjust = 0.94

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
      (coreLift) => coreLift?.lift === lift.toLowerCase()
    )?.weight

    if (!w) return ''

    return getWeight(+w, onerm * energyAdjust)
  }

  const [weights, setWeights] = useState<number>()

  const [e1rm, setE1rm] = useState<number[]>([0])

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
      utils.blocks.getAllUserPrograms.setData(
        undefined,
        context?.previousPrograms
      )
    },
    onSettled: () => {
      void utils.blocks.getAllUserPrograms.invalidate()
    },
  })

  const { mutate: updateExerciseComplete }
    = api.programs.completeExercise.useMutation({
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
        return { previousPrograms }
      },
      onError: (err, newExercise, context) => {
        console.log('err', err)
        utils.blocks.getAllUserPrograms.setData(
          undefined,
          context?.previousPrograms
        )
      },
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
      return { previousPrograms }
    },
    onError: (err, newExercise, context) => {
      console.log('err', err)
      utils.blocks.getAllUserPrograms.setData(
        undefined,
        context?.previousPrograms
      )
    },
  })

  const { mutate: updateSet } = api.programs.updateSet.useMutation({
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

      return { previousPrograms }
    },
    onError: (err, newSet, context) => {
      console.log(err)
      utils.blocks.getAllUserPrograms.setData(
        undefined,
        context?.previousPrograms
      )
    },
    onSettled: () => {
      void utils.blocks.getAllUserPrograms.invalidate()
    },
  })

  const onSetDone = (set: Set) => {
    console.log('set', set)
    const e = +(+weights / (e1rm[exercise?.reps - 1] / 100))?.toFixed(0)
    console.log('e', e)
    console.log('exercise', exercise)
    updateSet({
      id: set.id,
      isComplete: !set.isComplete,
      rpe: +rpe,
      weight: weights ? +weights :  0,
      estiamtedOnerm: !set.isComplete ? (e ? e : 0) : 0, //e1rm,
      rep: set?.rep,
    })

    const isDone = exercise.set.reduce((acc, curr) => {
      if (curr.id == set.id && set.isComplete) return false
      if (curr.id == set.id) return acc
      return curr.isComplete ? acc : false
    }, true)

    if (!exercise.isComplete && isDone) { updateExerciseComplete({ id: exercise.id, isComplete: true }) }
    if (exercise.isComplete && !isDone) { updateExerciseComplete({ id: exercise.id, isComplete: false }) }

    const isDayDone = day.exercise.reduce((acc, curr) => {
      if (curr.id == exercise.id && exercise.isComplete) return false
      if (curr.id == exercise.id && isDone) return acc
      return curr.isComplete ? acc : false
    }, true)

    console.log('isdaydone', isDayDone)
    console.log('day', day)

    if (!day.isComplete && isDayDone) { updateDayComplete({ id: day.id, isComplete: true }) }
    console.log('daycomp', day.isComplete)
    console.log('isdaydone', isDayDone)
    if (day.isComplete && !isDayDone) { updateDayComplete({ id: day.id, isComplete: false }) }
  }

  useEffect(() => {
    const index = 8 - (+rpe - 6) / 0.5
    if (rpeTable[index]) setE1rm(rpeTable[index])
  }, [weights, rpe])

  const onUpdateRpe = (set: Set, increase: boolean) => {
    console.log('id', set)
    console.log('increase', increase)
    const newRep = increase ? +set.rep + 1 : +set.rep - 1
    console.log('newrep', newRep)
    if (newRep < 1) return

    updateSet({
      id: set.id,
      isComplete: set.isComplete,
      rpe: +rpe,
      weight: +weights,
      estiamtedOnerm: !set.isComplete
        ? +(+weights / (e1rm[exercise?.reps - 1] / 100)).toFixed(0)
        : 0, //e1rm,
      rep: newRep,
    })
  }

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <div className='flex flex-col justify-start gap-2 '>
            <div className='flex flex-col gap-0'>
              <Disclosure.Button className={`mt-2 w-full text-lg md:text-xl`}>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-2 '>
                    <div className='flex items-end gap-2 md:gap-8'>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-6 w-8 text-gray-300 `}
                      />
                      <div className='mr-4 flex w-full items-center justify-between'>
                        <div className='text-yellow-500 first-letter:text-2xl first-letter:font-bold first-letter:uppercase '>
                          {exercise.name}
                        </div>
                        {exercise?.isComplete
? (
                          <StarIcon className='h-6 w-6 text-yellow-500' />
                        )
: (
                          <StarIconHollow className='h-6 w-6 text-gray-600' />
                        )}
                      </div>
                    </div>
                    <div className='ml-10 flex items-end gap-2 md:ml-16 md:gap-8'>
                      <div className='flex gap-1 '>
                        <h3>{exercise.sets}</h3>
                        <h3>X</h3>
                        <h3>{exercise.reps}</h3>
                        <h3>{exercise.repUnit ? exercise.repUnit : ''}</h3>
                      </div>
                      <div>
                        {exercise.weightType === 'onerm' && (
                          <div className=''>
                            {exercise.estimatedOnermIndex
? (
                              <div>
                                {+day.exercise[exercise.estimatedOnermIndex - 1]
                                  ?.set[0]?.weight > 0 && (
                                  <div className='flex'>
                                    {exercise.onerm && (
                                      <h4>
                                        {checkWeight(
                                          exercise.lift,
                                          +exercise?.onerm,
                                          exercise.estimatedOnermIndex
                                        )}
                                      </h4>
                                    )}
                                    {exercise.onermTop && <h4>-</h4>}
                                    {exercise.onermTop && (
                                      <h4>
                                        {checkWeight(
                                          exercise.lift,
                                          +exercise?.onermTop,
                                          exercise.estimatedOnermIndex
                                        )}
                                      </h4>
                                    )}
                                    <h4>kg</h4>
                                  </div>
                                )}
                              </div>
                            )
: (
                              <div className='flex'>
                                {exercise.onerm && (
                                  <h4>
                                    {checkWeight(
                                      exercise.lift,
                                      +exercise?.onerm,
                                      null
                                    )}
                                  </h4>
                                )}
                                {exercise.onermTop && <h4>-</h4>}
                                {exercise.onermTop && (
                                  <h4>
                                    {checkWeight(
                                      exercise.lift,
                                      +exercise?.onermTop,
                                      null
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
                              {exercise?.targetRpe && +exercise?.targetRpe}
                            </h4>
                          </div>
                        )}
                        {exercise.weightType === 'weight' && (
                          <div className='flex items-baseline'>
                            <h4>
                              {exercise?.weightBottom
                                && checkWeight('weight', +exercise?.weightBottom)}
                            </h4>
                            <h4>{exercise?.weightTop && '-'}</h4>
                            <h4>
                              {exercise?.weightTop
                                && checkWeight('weight', +exercise?.weightTop)}
                              kg
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='ml-10 transition delay-150 ease-in-out md:ml-16'>
                    <div
                      className={
                        open
                          ? `delay-[10ms] absolute text-sm font-extralight opacity-40 transition-all ease-out`
                          : `delay-[45ms] absolute flex w-full flex-row justify-start gap-1 text-sm font-extralight opacity-100 transition-all ease-out`
                      }
                    >
                      {exercise?.notes
                        && exercise?.notes?.length > 0
                        && exercise?.notes?.slice(0, 35).trim()}
                      {exercise?.notes
                        && exercise?.notes?.length > 0
                        && exercise?.notes?.length > 35 && (
                          <span className={open ? `opacity-0` : ``}>...</span>
                        )}
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
                    <div className='ml-10 text-sm font-extralight md:ml-16'>
                      {exercise?.notes}
                    </div>
                    <div className='ml-10 w-full text-base underline md:ml-16'>
                      {exercise.htmlLink && (
                        <a
                          href={exercise.htmlLink}
                          rel='noreferrer'
                          target='_blank'
                        >
                          {exercise.htmlLink}
                        </a>
                      )}
                    </div>
                    {exercise.sets && exercise.reps && (
                      <div className='mt-8 flex flex-col gap-4 md:gap-6'>
                        <div className='flex w-full items-center justify-center gap-4 text-2xl font-bold md:gap-6'>
                          <div
                            className='h-8 w-8 cursor-pointer rounded-full text-center'
                            onClick={() => {
                              if (weights) setWeights(+weights + 2.5)
                            }}
                          >
                            +
                          </div>
                          <div className='w-44 text-center '>
                            <NumericFormat
                              className='w-full rounded-lg border border-gray-400 bg-black p-6 text-center text-2xl font-semibold md:text-2xl'
                              value={weights}
                              placeholder='weight'
                              decimalScale={2}
                              onChange={(e) => setWeights(+e.target.value)}
                            />
                          </div>
                          <div
                            className='h-8 w-8 cursor-pointer rounded-full text-center'
                            onClick={() => {
                              if (weights) setWeights(+weights - 2.5)
                            }}
                          >
                            -
                          </div>
                        </div>

                        <div className='flex w-full justify-center gap-4 text-xl font-medium md:gap-6'>
                          {exercise.set.reduce((acc, curr) => {
                            return acc + (curr.isComplete ? 1 : 0)
                          }, 0)}{' '}
                          / {exercise.sets}
                        </div>
                        <RadioGroup value={rpe} onChange={setRpe}>
                          <div
                            className={`mx-1 grid grid-cols-9 items-center justify-between gap-1 md:mx-6  md:grid-cols-10 md:p-2`}
                          >
                            <RadioGroup.Label className='col-span-9 text-center text-xl font-medium md:col-span-1 md:text-left'>
                              RPE
                            </RadioGroup.Label>
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
                                className={({ active, checked }) => `${
                                  active ? '' : ''
                                }
                                            ${
                                              checked
                                                ? 'bg-yellow-500 font-bold text-white'
                                                : 'bg-gray-800 text-gray-200'
                                            }
                                                relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-md focus:outline-none `}
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className='flex w-full items-center justify-center text-xs'>
                                      <RadioGroup.Label
                                        as='p'
                                        className={`font-semibold tracking-tighter first-letter:text-lg md:mt-[2px] ${
                                          checked
                                            ? 'text-gray-900'
                                            : 'text-gray-300'
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

                        {exercise.lift
                          && exercise.lift !== 'unlinked'
                          && (
                            +weights / +(e1rm[+exercise?.reps - 1] / 100)
                          )?.toFixed(0) && (
                            <div className='mx-1 flex gap-2 px-2 md:mx-6'>
                              <div>E1RM</div>
                              {weights
                                && weights !== 0
                                && e1rm[+exercise.reps - 1] && (
                                  <div>
                                    {(
                                      +weights
                                      / (e1rm[+exercise.reps - 1] / 100)
                                    )?.toFixed(0)}
                                    kg
                                  </div>
                                )}
                            </div>
                          )}
                        <SetsModal
                          exercise={exercise}
                          onUpdateRpe={onUpdateRpe}
                          onSetDone={onSetDone}
                          isComplete={false}
                        />
                        <SetsModal
                          exercise={exercise}
                          onUpdateRpe={onUpdateRpe}
                          onSetDone={onSetDone}
                          isComplete={true}
                        />
                        {/* <div ref={parent} className='flex gap-2 px-1 items-center h-56'> */}
                        {/*   { */}
                        {/*     exercise?.set?.filter((s) => s.isComplete == false).map((set,) => ( */}
                        {/*       <div */}
                        {/*         key={set.id} */}
                        {/*         className='flex flex-col items-center justify-center gap-1' */}
                        {/*       > */}
                        {/*         <div className='h-10'> */}
                        {/*           { */}
                        {/*             !set.isComplete && ( */}
                        {/*               <ChevronUpIcon */}
                        {/*                 onClick={() => onUpdateRpe(set, true)} */}
                        {/*                 className='h-10 w-10 text-gray-400 cursor-pointer' */}
                        {/*               /> */}
                        {/*             ) */}
                        {/*           } */}
                        {/*         </div> */}
                        {/*         <div */}
                        {/*           className='flex flex-col gap-1' */}
                        {/*           onClick={() => onSetDone(set)} */}
                        {/*         > */}
                        {/*           <div className={set.isComplete ? `bg-black text-2xl font-bold rounded-full text-yellow-500 h-12 min-w-[1rem] flex items-center justify-center cursor-pointer` : `text-xl rounded-full h-12 min-w-[3rem] flex items-center justify-center bg-gray-800 cursor-pointer hover:scale-105`}> */}
                        {/*             {set.rep} */}
                        {/*           </div> */}
                        {/*         </div> */}
                        {/*         <div className='h-10'> */}
                        {/*           { */}
                        {/*             !set.isComplete && ( */}
                        {/*               <ChevronDownIcon */}
                        {/*                 onClick={() => onUpdateRpe(set, false)} */}
                        {/*                 className='h-10 w-10 text-gray-400 cursor-pointer' */}
                        {/*               /> */}
                        {/*             ) */}
                        {/*           } */}
                        {/*         </div> */}
                        {/*         <div className='h-8'> */}
                        {/*           {set.isComplete && ( */}
                        {/*             <div className='flex flex-col items-center text-xs tracking-tighter text-gray-400'> */}
                        {/*               <div> */}
                        {/*                 RPE:{set.rpe} */}
                        {/*               </div> */}
                        {/*               <div className={set.weight == 0 && exercise.lift != 'unlinked' ? 'text-red-500' : ''}> */}
                        {/*                 W:{set.weight} */}
                        {/*               </div> */}
                        {/*               {set?.estiamtedOnerm && ( */}
                        {/*                 <div className={set?.estiamtedOnerm == 0 ? 'hidden' : ''}> */}
                        {/*                   E:{set?.estiamtedOnerm} */}
                        {/*                 </div> */}
                        {/*               )} */}
                        {/*             </div> */}
                        {/*           ) */}
                        {/*           } */}
                        {/*         </div> */}
                        {/*       </div> */}
                        {/*     )) */}
                        {/*   } */}
                        {/* </div> */}
                        {/* <div ref={parent2} className='flex gap-2 px-1 items-center h-56'> */}
                        {/*   { */}
                        {/*     exercise?.set?.filter((s) => s.isComplete == true).map((set,) => ( */}
                        {/*       <div */}
                        {/*         key={set.id} */}
                        {/*         className='flex flex-col items-center justify-center gap-1' */}
                        {/*       > */}
                        {/*         <div className='h-10'> */}
                        {/*           { */}
                        {/*             !set.isComplete && ( */}
                        {/*               <ChevronUpIcon */}
                        {/*                 onClick={() => onUpdateRpe(set, true)} */}
                        {/*                 className='h-10 w-10 text-gray-400 cursor-pointer' */}
                        {/*               /> */}
                        {/*             ) */}
                        {/*           } */}
                        {/*         </div> */}
                        {/*         <div */}
                        {/*           className='flex flex-col gap-1' */}
                        {/*           onClick={() => onSetDone(set)} */}
                        {/*         > */}
                        {/*           <div className={set.isComplete ? `bg-black text-2xl font-bold rounded-full text-yellow-500 h-12 min-w-[1rem] flex items-center justify-center cursor-pointer` : `text-xl rounded-full h-12 min-w-[3rem] flex items-center justify-center bg-gray-800 cursor-pointer hover:scale-105`}> */}
                        {/*             {set.rep} */}
                        {/*           </div> */}
                        {/*         </div> */}
                        {/*         <div className='h-10'> */}
                        {/*           { */}
                        {/*             !set.isComplete && ( */}
                        {/*               <ChevronDownIcon */}
                        {/*                 onClick={() => onUpdateRpe(set, false)} */}
                        {/*                 className='h-10 w-10 text-gray-400 cursor-pointer' */}
                        {/*               /> */}
                        {/*             ) */}
                        {/*           } */}
                        {/*         </div> */}
                        {/*         <div className='h-8'> */}
                        {/*           {set.isComplete && ( */}
                        {/*             <div className='flex flex-col items-center text-xs tracking-tighter text-gray-400'> */}
                        {/*               <div> */}
                        {/*                 RPE:{set.rpe} */}
                        {/*               </div> */}
                        {/*               <div className={set.weight == 0 && exercise.lift != 'unlinked' ? 'text-red-500' : ''}> */}
                        {/*                 W:{set.weight} */}
                        {/*               </div> */}
                        {/*               {set?.estiamtedOnerm && ( */}
                        {/*                 <div className={set?.estiamtedOnerm == 0 ? 'hidden' : ''}> */}
                        {/*                   E:{set?.estiamtedOnerm} */}
                        {/*                 </div> */}
                        {/*               )} */}
                        {/*             </div> */}
                        {/*           ) */}
                        {/*           } */}
                        {/*         </div> */}
                        {/*       </div> */}
                        {/*     )) */}
                        {/*   } */}
                        {/* </div> */}
                      </div>
                    )}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  )
}

const DayModal = ({
  day,
  selectedEngery,
}: {
  day: Day
  selectedEngery: string
}) => {
  return (
    <>
      {day.isRestDay
? (
        <div>Rest Day</div>
      )
: (
        <div className='flex w-full flex-col gap-10 divide-y divide-dashed divide-gray-600 md:p-2'>
          {day.exercise.map((exercise) => (
            <div key={exercise.id} className=''>
              <ExerciseModal
                exercise={exercise}
                selectedEnergy={selectedEngery}
                day={day}
              />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default DayModal

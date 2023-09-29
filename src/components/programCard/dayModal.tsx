import { useState, useEffect, useRef } from 'react'
import { type Set } from '@prisma/client'
import { Prisma } from '@prisma/client'
import {
  type Exercise as StoreExercise,
  type Set as SetStore,
} from '~/store/types'
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
import { Input } from '@/components/ui/input'
import { PlaySquare, XIcon } from 'lucide-react'
import Fireworks, { FireworksHandlers } from '@fireworks-js/react'
import { HtmlProps } from 'next/dist/shared/lib/html-context'

const dayWithExercise = Prisma.validator<Prisma.DayArgs>()({
  include: {
    exercise: {
      include: {
        set: true,
      },
    },
  },
})

type Day = Prisma.DayGetPayload<typeof dayWithExercise>

const SetsModal = ({
  exercise,
  onUpdateRpe,
  onSetDone,
  isComplete,
}: {
  exercise: StoreExercise
  onUpdateRpe: (args0: SetStore, args1: boolean) => void
  onSetDone: (args0: SetStore) => void
  isComplete: boolean
}) => {
  const isSS = exercise.ss && exercise.ss.length > 0

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
                {!set.isComplete && !isSS ? (
                  <ChevronUpIcon
                    onClick={() => onUpdateRpe(set, true)}
                    className='h-10 w-10 cursor-pointer text-gray-400'
                  />
                ) : (
                  <div className='mt-6'></div>
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
                {!set.isComplete && !isSS && (
                  <ChevronDownIcon
                    onClick={() => onUpdateRpe(set, false)}
                    className='h-10 w-10 cursor-pointer text-gray-400'
                  />
                )}
                <div className='h-8'>
                  {set.isComplete && (
                    <div className='flex flex-col items-center text-xs tracking-tighter text-gray-400'>
                      <div>RPE:{set.rpe}</div>
                      {!isSS && (
                        <div
                          className={
                            set.weight == 0 && exercise.lift != 'unlinked'
                              ? 'text-red-500'
                              : ''
                          }
                        >
                          W:{set.weight === 0 ? '' : set.weight}
                        </div>
                      )}
                      {set.estiamtedOnerm != 0 && (
                        <div>
                          E:{set.estiamtedOnerm === 0 ? '' : set.estiamtedOnerm}
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
  programId,
}: {
  exercise: StoreExercise
  selectedEnergy: string
  day: Day
  programId: string
}) => {
  console.log('exercise', exercise)
  const [rpe, setRpe] = useState('8')

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
    if (+onerm < 100) {
      if (selectedEnergy === 'B') energyAdjust = 0.95
      if (selectedEnergy === 'C') energyAdjust = 0.9
      if (selectedEnergy === 'D') energyAdjust = 0.85
    }
    if (+onerm >= 100 && +onerm < 200) {
      if (selectedEnergy === 'B') energyAdjust = 0.97
      if (selectedEnergy === 'C') energyAdjust = 0.94
      if (selectedEnergy === 'D') energyAdjust = 0.91
    }
    if (+onerm >= 200) {
      if (selectedEnergy === 'B') energyAdjust = 0.985
      if (selectedEnergy === 'C') energyAdjust = 0.97
      if (selectedEnergy === 'D') energyAdjust = 0.955
    }

    if (lift == 'weight') {
      return getWeight(+onerm, 100 * energyAdjust)
    }

    if (index) {
      const rm = day?.exercise[index - 1]?.set.filter((s) => s.isComplete)
      const rmWeight = rm?.map((s) => s.estiamtedOnerm) || []
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
    if (selectedEnergy === 'B') energyAdjust = 0.98
    if (selectedEnergy === 'C') energyAdjust = 0.96
    if (selectedEnergy === 'D') energyAdjust = 0.94

    const weight = day?.exercise[estimatedOnermIndex - 1]?.set[0]?.weight
    if (!weight) return ''
    return `${((+weight * percent) / 100) * energyAdjust}`
  }

  const [weights, setWeights] = useState<number | null>(() => {
    if (exercise.weightType == 'onerm' && exercise?.onerm) {
      const res = checkWeight(
        exercise.lift,
        +exercise?.onerm,
        exercise.estimatedOnermIndex,
      )
      console.log('res', res)
      return res ? +res : 0
    }
    if (exercise.weightType == 'weight' && exercise?.weightBottom) {
      return +exercise?.weightBottom
    }

    return null
  })

  const [e1rm, setE1rm] = useState<number[]>([0])
  const [notes, setNotes] = useState<string>(() => exercise?.flield2 || '')

  const utils = api.useContext()

  const { mutate: updateExerciseComplete } =
    api.programs.completeExercise.useMutation({
      onMutate: async (newExercise) => {
        console.log('id', newExercise)
        await utils.blocks.get.cancel({ id: programId })
        const previousProgram = utils.blocks.get.getData({ id: programId })

        utils.blocks.get.setData(
          { id: programId },
          {
            ...previousProgram,
            week: previousProgram?.week.map((week) => {
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
                          flield2: newExercise.notes,
                        }
                      }
                      return exercise
                    }),
                  }
                }),
              }
            }),
          },
        )
        return { previousProgram }
      },
      onError: (err, newExercise, context) => {
        console.log('err', err)
        utils.blocks.get.setData({ id: programId }, context?.previousProgram)
      },
    })

  const { mutate: updateDayComplete } = api.programs.completeDay.useMutation({
    onMutate: async (newDay) => {
      console.log('id', newDay)
      await utils.blocks.get.cancel({ id: programId })
      const previousProgram = utils.blocks.get.getData({ id: programId })

      utils.blocks.get.setData(
        { id: programId },
        {
          ...previousProgram,
          week: previousProgram?.week.map((week) => {
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
        },
      )
      return { previousProgram }
    },
    onError: (err, newExercise, context) => {
      console.log('err', err)
      utils.blocks.get.setData({ id: programId }, context?.previousProgram)
    },
  })

  const { mutate: updateSet } = api.programs.updateSet.useMutation({
    onMutate: async (newSet) => {
      console.log('id', newSet)
      await utils.blocks.get.cancel({ id: programId })
      const previousProgram = utils.blocks.get.getData({ id: programId })

      utils.blocks.get.setData(
        { id: programId },
        {
          ...previousProgram,
          week: previousProgram.week.map((week) => {
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
        },
      )

      return { previousProgram }
    },
    onError: (err, newSet, context) => {
      console.log(err)
      utils.blocks.get.setData({ id: programId }, context?.previousProgram)
    },
    onSettled: () => {
      void utils.blocks.get.invalidate({ id: programId })
    },
  })

  const onSetDone = (set: Set) => {
    let e = 0
    if (weights && exercise?.reps) {
      const wi = weights ? +weights : 0
      const e1 = e1rm[+exercise?.reps - 1]
      if (e1) e = +(+wi / (e1 / 100))?.toFixed(0)
    }
    updateSet({
      id: set.id,
      isComplete: !set.isComplete,
      rpe: +rpe,
      weight: weights ? +weights : 0,
      estiamtedOnerm: !set.isComplete ? (e ? e : 0) : 0, //e1rm,
      rep: set?.rep,
    })

    const isDone = exercise.set.reduce((acc, curr) => {
      if (curr.id == set.id && set.isComplete) return false
      if (curr.id == set.id) return acc
      return curr.isComplete ? acc : false
    }, true)

    if (!exercise.isComplete && isDone) {
      updateExerciseComplete({
        id: exercise.id,
        isComplete: true,
        notes: notes,
      })
    }
    if (exercise.isComplete && !isDone) {
      updateExerciseComplete({
        id: exercise.id,
        isComplete: false,
        notes: notes,
      })
    }

    const isDayDone = day.exercise.reduce((acc, curr) => {
      if (curr.id == exercise.id && exercise.isComplete) return false
      if (curr.id == exercise.id && isDone) return acc
      return curr.isComplete ? acc : false
    }, true)

    if (!day.isComplete && isDayDone) {
      updateDayComplete({ id: day.id, isComplete: true })
    }

    if (day.isComplete && !isDayDone) {
      updateDayComplete({ id: day.id, isComplete: false })
    }
  }

  useEffect(() => {
    const index = 8 - (+rpe - 6) / 0.5
    if (rpeTable[index]) setE1rm(rpeTable[index])
  }, [weights, rpe])

  const onUpdateRpe = (set: Set, increase: boolean) => {
    const newRep = increase ? +set.rep + 1 : +set.rep - 1
    if (newRep < 1) return

    updateSet({
      id: set.id,
      isComplete: set.isComplete,
      rpe: +rpe,
      weight: Number(weights),
      estiamtedOnerm: !set.isComplete
        ? +Number(
            Number(weights || '') /
              (e1rm[Number(exercise?.reps) || 1 - 1] || 0 / 100),
          ).toFixed(0)
        : 0, //e1rm,
      rep: newRep,
    })
  }

  const isSS = exercise.ss && exercise.ss.length > 0

  const ref = useRef<FireworksHandlers>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const disDiv = useRef<HTMLDivElement>(null)

  const toggle = (open : boolean) => {
    if (disDiv.current && open) disDiv.current.scrollIntoView({ behavior: 'smooth' })

    if (!isSS) return
    setTimeout(() => {
      if (!wrapper.current) return
      console.log('stop')
      ref.current?.stop()
      ref.current?.clear()
      wrapper.current.style.display = 'none'
      ref.current?.updateBoundaries({ x: 0, y: 0, width: 0, height: 0 })
    }, 3000)
  }

  return (
    <div ref={disDiv}>
      <Disclosure>
        {({ open }) => (
          <div className='flex flex-col justify-start gap-2 '>
            <div className='flex flex-col gap-0'>
              <Disclosure.Button
                className={`mt-1 w-full text-lg md:text-xl`}
                onClick={toggle(open)}
              >
                <div className='flex flex-col gap-0'>
                  <div className='flex flex-col '>
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
                        {exercise?.isComplete ? (
                          <StarIcon className='h-6 w-6 text-yellow-500' />
                        ) : (
                          <StarIconHollow className='h-6 w-6 text-gray-600' />
                        )}
                      </div>
                    </div>
                    <div className='ml-9 flex items-end gap-3 md:ml-16 md:gap-8'>
                      {isSS ? (
                        <div className='w-full'>
                          <div className='rainbow w-fit text-xl font-medium'>
                            Super Set
                          </div>
                          <div className='ml-1 w-full'>
                            {exercise.ss.map((s) => (
                              <div
                                key={s.id}
                                className='text-md grid w-full grid-cols-8 gap-0'
                              >
                                <div className='col-span-4 place-self-start'>
                                  {s.name}
                                </div>
                                <XIcon />
                                <div className='flex gap-1'>
                                  <div>{s.reps}</div>
                                  {s.repUnit ? <div>s.repUnit</div> : null}
                                </div>
                                <div className='col-span-2 place-self-center'>
                                  {s.weightType === 'rpe' && (
                                    <div className='flex items-baseline gap-0'>
                                      <h4>RPE</h4>
                                      <h4>-</h4>
                                      <h4 className='flex items-baseline justify-center font-semibold'>
                                        {s?.targetRpe && +s?.targetRpe}
                                      </h4>
                                    </div>
                                  )}
                                  {s.weightType === 'weight' && (
                                    <div className='flex items-baseline'>
                                      <h4>
                                        {s?.weightBottom &&
                                          checkWeight(
                                            'weight',
                                            +s?.weightBottom,
                                            null,
                                          )}
                                      </h4>
                                      <h4>{s?.weightTop && '-'}</h4>
                                      <h4>
                                        {s?.weightTop &&
                                          checkWeight(
                                            'weight',
                                            +s?.weightTop,
                                            null,
                                          )}
                                        kg
                                      </h4>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className='relative flex items-end gap-3 md:gap-8'>
                          <div className='flex items-center gap-1'>
                            <h3>{exercise.sets}</h3>
                            <XIcon />
                            <h3>{exercise.reps}</h3>
                            <h3>{exercise.repUnit ? exercise.repUnit : ''}</h3>
                          </div>
                          <div>
                            {exercise.weightType === 'percent' && (
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
                                    {+day.exercise[
                                      exercise.estimatedOnermIndex - 1
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
                                <h4 className='flex items-baseline justify-center font-semibold'>
                                  {exercise?.targetRpe && +exercise?.targetRpe}
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
                                    )}
                                </h4>
                                <h4>{exercise?.weightTop && '-'}</h4>
                                <h4>
                                  {exercise?.weightTop &&
                                    checkWeight('weight', +exercise?.weightTop)}
                                  kg
                                </h4>
                              </div>
                            )}
                          </div>
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className=''
                          >
                            {exercise.htmlLink && (
                              <a
                                href={exercise.htmlLink}
                                rel='noreferrer'
                                target='_blank'
                                className='absolute bottom-0 right-3'
                              >
                                <PlaySquare
                                  size={30}
                                  fill='#EAB308'
                                  color='black'
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='ml-10 font-light text-gray-400 transition delay-150 ease-in-out md:ml-16'>
                    <div
                      className={
                        open
                          ? `delay-[10ms] absolute text-sm opacity-40 transition-all ease-out`
                          : `delay-[45ms] absolute flex w-full flex-row justify-start gap-1 text-sm opacity-100 transition-all ease-out`
                      }
                    >
                      {exercise?.notes &&
                        exercise?.notes?.length > 0 &&
                        exercise?.notes?.slice(0, 35).trim()}
                      {exercise?.notes &&
                        exercise?.notes?.length > 0 &&
                        exercise?.notes?.length > 35 && (
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
                  <div className='flex flex-col gap-2'>
                    <div className='ml-10 text-sm font-light text-gray-400 md:ml-16'>
                      {exercise?.notes}
                    </div>
                    {isSS ? (
                      <div ref={wrapper}>
                        <Fireworks
                          ref={ref}
                          options={{ opacity: 0.5 }}
                          style={{
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            position: 'fixed',
                            background: '#000',
                            display: 'block',
                            zIndex: 9999,
                          }}
                        />
                      </div>
                    ) : null}
                    {exercise.sets && exercise.reps && (
                      <div className='flex flex-col gap-2 md:gap-6'>
                        {isSS ? null : (
                          <div className='flex w-full items-center justify-center gap-4 text-2xl font-bold md:gap-6'>
                            <div
                              className='h-8 w-8 cursor-pointer rounded-full text-center'
                              onClick={() => {
                                if (weights && weights > 0) {
                                  setWeights(+weights - 2.5)
                                }
                              }}
                            >
                              -
                            </div>
                            <div className='relative flex w-44 items-center text-center '>
                              <NumericFormat
                                className='w-full rounded-lg border border-gray-400 bg-black p-6 text-center text-2xl font-semibold placeholder-gray-600  md:text-2xl'
                                value={weights}
                                placeholder='kg'
                                decimalScale={2}
                                onChange={(e) => setWeights(+e.target.value)}
                              />
                              {weights && weights !== 0 ? (
                                <span className='absolute right-5 text-base text-gray-400'>
                                  kg
                                </span>
                              ) : null}
                            </div>
                            <div
                              className='h-8 w-8 cursor-pointer rounded-full text-center'
                              onClick={() => {
                                if (weights) {
                                  setWeights(+weights + 2.5)
                                } else {
                                  setWeights(2.5)
                                }
                              }}
                            >
                              +
                            </div>
                          </div>
                        )}

                        <div className='flex w-full justify-center gap-4 text-xl font-medium md:gap-6'>
                          {exercise.set.reduce((acc, curr) => {
                            return acc + (curr.isComplete ? 1 : 0)
                          }, 0)}{' '}
                          / {exercise.sets}
                        </div>
                        <RadioGroup
                          value={rpe}
                          onChange={setRpe}
                        >
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
                                {({ checked }) => (
                                  <>
                                    <div className='flex w-full items-center justify-center text-xs'>
                                      <RadioGroup.Label
                                        as='p'
                                        className={`font-semibold tracking-tighter first-letter:text-lg md:mt-[3px] ${
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

                        {exercise.lift &&
                          exercise.lift !== 'unlinked' &&
                          (
                            Number(weights) /
                            Number(e1rm[+exercise?.reps - 1] || 0 / 100)
                          )?.toFixed(0) && (
                            <div className='mx-1 flex gap-2 px-2 md:mx-6'>
                              <div>E1RM</div>
                              {weights &&
                              weights !== 0 &&
                              e1rm[+exercise.reps - 1] ? (
                                <div>
                                  {(
                                    +weights /
                                    (e1rm[+exercise.reps - 1] || 0 / 100)
                                  )?.toFixed(0)}
                                  kg
                                </div>
                              ) : null}
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
                        <Input
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder='Notes'
                          className='w-full'
                        />
                      </div>
                    )}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          </div>
        )}
      </Disclosure>
    </div>
  )
}

const DayModal = ({
  day,
  selectedEngery,
  programId,
}: {
  day: Day
  selectedEngery: string
  programId: string
}) => {
  return (
    <>
      {day.isRestDay ? (
        <div>Rest Day</div>
      ) : (
        <div className='flex w-full flex-col gap-6 divide-y divide-dashed divide-gray-600 pb-16 md:p-2'>
          {day.exercise.map((exercise) => (
            <div
              key={exercise.id}
              className=''
            >
              <ExerciseModal
                programId={programId}
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

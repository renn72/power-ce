import { useState, useEffect, Fragment } from 'react'
import { Prisma } from '@prisma/client'
import { type Exercise as StoreExercise } from '~/store/types'
import { api } from '~/utils/api'

import { useSession } from 'next-auth/react'

import { AnimatePresence, motion } from 'framer-motion'
import { Transition, RadioGroup, Disclosure, Dialog } from '@headlessui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { rpe as rpeTable } from '~/store/defaultValues'

import { NumericFormat } from 'react-number-format'
import { Input } from '@/components/ui/input'
import {
  ArrowDownToLine,
  ArrowUpToLine,
  HomeIcon,
  PauseOctagonIcon,
  PlaySquare,
  XIcon,
} from 'lucide-react'

import {
  checkWeight,
  checkPercentWeight,
  calcRPEWeight,
} from '~/utils/program-card/utils'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'

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

const SetsModal = ({
  exercise,
  onSetDone,
}: {
  exercise: StoreExercise
  onSetDone: (reps: number) => void
  isComplete: boolean
}) => {
  const [reps, setReps] = useState<number>(Number(exercise.reps))
  const isSS = exercise.ss && exercise.ss.length > 0

  const onUpdateRpeWrapper = (increase: boolean) => {
    console.log('update', increase)
    if (increase) {
      setReps((prev) => prev + 1)
    } else {
      if (reps < 2) return
      setReps((prev) => prev - 1)
    }
  }
  const onSetDoneWrapper = () => {
    onSetDone(reps)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1, y: 2 }}
        transition={{ ease: 'easeIn', duration: 0.6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1 }}
      >
        <div className='flex flex-col items-center justify-center gap-1'>
          {!isSS ? (
            <ChevronUpIcon
              onClick={() => onUpdateRpeWrapper(true)}
              className='h-10 w-10 cursor-pointer text-gray-400'
            />
          ) : (
            <div className=''></div>
          )}
          <div
            className={`flex h-12 min-w-[3rem] cursor-pointer items-center justify-center rounded-full bg-gray-800 text-xl hover:scale-105`}
            onClick={(e) => {
              e.stopPropagation()
              onSetDoneWrapper()
            }}
          >
            {isSS ? 'SS' : reps}
          </div>
          {!isSS && (
            <ChevronDownIcon
              onClick={() => onUpdateRpeWrapper(false)}
              className='h-10 w-10 cursor-pointer text-gray-400'
            />
          )}
        </div>
      </motion.div>
    </>
  )
}

const ExerciseModal = ({
  exercise,
  selectedEnergy,
  day,
  programId,
  userId,
  setIsOpen,
  setExerciseToDelete,
}: {
  exercise: StoreExercise
  selectedEnergy: string
  day: Day
  programId: string
  userId: string
  setIsOpen: (arg0: boolean) => void
  setExerciseToDelete: (arg0: string) => void
}) => {
  const [rpe, setRpe] = useState('8')
  const [exerciseSets, setExerciseSets] = useState(Number(exercise.sets) || 0)

  const { data: userCoreOneRM } = api.oneRepMax.getUserCoreLifts.useQuery({
    userId: userId,
  })
  const { data: rpeData } = api.rpe.getAll.useQuery(userId)

  const { data: program } = api.blocks.get.useQuery({
    id: programId,
  })

  const [weights, setWeights] = useState<number | null>(() => {
    if (exercise.weightType == 'weight' && exercise?.weightBottom) {
      return +exercise?.weightBottom
    }

    return null
  })

  useEffect(() => {
    if (exercise.weightType == 'onerm' && exercise?.onerm && userCoreOneRM) {
      const res = checkWeight(
        exercise.lift,
        +exercise?.onerm,
        exercise.estimatedOnermIndex,
        selectedEnergy,
        day,
        userCoreOneRM,
      )
      setWeights(res ? +res : 0)
    }
    if (exercise.weightType == 'rpe' && exercise?.reps && userCoreOneRM) {
      console.log(exercise.reps, exercise.targetRpe)
      const res = calcRPEWeight(
        Number(exercise.targetRpe),
        +exercise?.reps,
        userCoreOneRM,
        exercise.lift,
        selectedEnergy,
        rpeData,
      )
      setWeights(res ? +res : 0)
    }
  }, [setWeights, userCoreOneRM, rpeData])

  const [e1rm, setE1rm] = useState<number[]>([0])
  const [notes, setNotes] = useState<string>(() => exercise?.field2 || '')

  const utils = api.useContext()

  const { mutate: updateExerciseComplete } =
    api.programs.completeExercise.useMutation({
      onMutate: async (newExercise) => {
        console.log('id', newExercise)
        await utils.blocks.get.cancel({ id: programId })
        const previousProgram = utils.blocks.get.getData({ id: programId })
        if (!previousProgram) return

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
                          field2: newExercise.notes,
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
      onError: (err, _newExercise, context) => {
        console.log('err', err)
        utils.blocks.get.setData({ id: programId }, context?.previousProgram)
      },
    })

  const { mutate: updateDayComplete } = api.programs.completeDay.useMutation({
    onMutate: async (newDay) => {
      console.log('id', newDay)
      await utils.blocks.get.cancel({ id: programId })
      const previousProgram = utils.blocks.get.getData({ id: programId })
      if (!previousProgram) return

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
    onError: (err, _newExercise, context) => {
      console.log('err', err)
      utils.blocks.get.setData({ id: programId }, context?.previousProgram)
    },
  })

  const { mutate: createSet } = api.programs.createSet.useMutation({
    onMutate: async (newSet) => {
      console.log('id', newSet)
      await utils.blocks.get.cancel({ id: programId })
      const previousProgram = utils.blocks.get.getData({ id: programId })
      if (!previousProgram) return

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
                    if (exercise.id === newSet.exerciseId) {
                      return {
                        ...exercise,
                        set: [
                          ...exercise.set,
                          {
                            id: newSet.id || '',
                            isComplete: true,
                            rpe: newSet.rpe,
                            weight: newSet.weight,
                            estiamtedOnerm: newSet.estiamtedOnerm,
                            rep: newSet.rep,
                          },
                        ],
                      }
                    }

                    return {
                      ...exercise,
                      set: [...exercise.set],
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
    onError: (err, _newSet, context) => {
      console.log(err)
      utils.blocks.get.setData({ id: programId }, context?.previousProgram)
    },
    onSettled: () => {
      void utils.blocks.get.invalidate({ id: programId })
    },
  })

  const { mutate: deleteSet } = api.programs.deleteSet.useMutation({
    onMutate: async (newSet) => {
      console.log('id', newSet)
      await utils.blocks.get.cancel({ id: programId })
      const previousProgram = utils.blocks.get.getData({ id: programId })

      if (!previousProgram) return

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
                    return {
                      ...exercise,
                      set: exercise.set.filter((set) => set.id !== newSet.id),
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
    onError: (err, _newSet, context) => {
      console.log(err)
      utils.blocks.get.setData({ id: programId }, context?.previousProgram)
    },
    onSettled: () => {
      void utils.blocks.get.invalidate({ id: programId })
    },
  })

  const onDeleteSet = (id: string) => {
    deleteSet({ id: id })
  }

  const onSetDone = (reps: number) => {
    let e = 0
    if (weights && exercise?.reps) {
      const wi = weights ? +weights : 0
      const e1 = e1rm[+exercise?.reps - 1]
      if (e1) e = +(+wi / (e1 / 100))?.toFixed(0)
    }
    createSet({
      exerciseId: exercise.id,
      lift: exercise.lift,
      name: exercise.name || '',
      trainerId: program?.trainerId || '',
      rpe: +rpe,
      weight: weights ? +weights : 0,
      estiamtedOnerm: e ? e : 0, //e1rm,
      rep: reps,
      setReps: exercise.reps ? Number(exercise.reps) : 0,
    })

    const isDone = exercise.set.length + 1 === exerciseSets

    if (!exercise.isComplete && isDone) {
      updateExerciseComplete({
        id: exercise.id,
        isComplete: true,
        notes: notes,
      })
    }

    const isDayDone = day.exercise.reduce((acc, curr) => {
      if (curr.id === exercise.id) {
        return acc
      }
      return curr.isComplete ? acc : false
    }, true)

    console.log('isDayDone', isDayDone)

    if (!day.isComplete && isDayDone) {
      updateDayComplete({ id: day.id, isComplete: true, programId: programId })
    }
  }

  useEffect(() => {
    const index = 8 - (+rpe - 6) / 0.5
    if (rpeTable?.[index]) setE1rm(rpeTable[index])
  }, [weights, rpe])

  const isSS = exercise.ss && exercise.ss.length > 0

  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <div className='flex flex-col justify-start gap-2 overflow-hidden '>
              <div className='flex flex-col gap-0'>
                <Disclosure.Button className={`mt-1 w-full text-lg md:text-xl`}>
                  <div className='flex flex-col gap-0'>
                    <div className='flex flex-col '>
                      <div className='flex items-end gap-2 md:gap-8'>
                        <ChevronUpIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-6 w-8 text-gray-300 `}
                        />
                        <div className='mr-4 flex w-full items-center justify-between'>
                          <div
                            className={`${
                              exercise.isComplete
                                ? 'text-yellow-500'
                                : 'text-white'
                            }  font-medium first-letter:text-2xl first-letter:font-bold first-letter:uppercase `}
                          >
                            {isSS ? 'Super set' : exercise.name}
                          </div>
                          <div>
                            {exercise.isComplete ? null : (
                              <XIcon
                                onClick={() => {
                                  setIsOpen(true)
                                  setExerciseToDelete(exercise.id)
                                }}
                                className='h-7 w-7 text-gray-600'
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='flex items-end gap-3 text-gray-400 md:ml-16 md:gap-8'>
                        {isSS ? (
                          <div className='w-full'>
                            <div className='ml-1 w-full'>
                              {exercise.ss.map((s) => (
                                <div key={s.id}>
                                  <div className='text-md grid w-full grid-cols-9 gap-0'>
                                    <div onClick={(e) => e.stopPropagation()}>
                                      {s.htmlLink && s.htmlLink !== '' && (
                                        <a
                                          href={s.htmlLink}
                                          rel='noreferrer'
                                          target='_blank'
                                        >
                                          <PlaySquare
                                            size={24}
                                            fill='#EAB308'
                                            color='black'
                                          />
                                        </a>
                                      )}
                                    </div>
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
                                                selectedEnergy,
                                                day,
                                                userCoreOneRM,
                                              )}
                                          </h4>
                                          <h4>{s?.weightTop && '-'}</h4>
                                          <h4>
                                            {s?.weightTop &&
                                              checkWeight(
                                                'weight',
                                                +s?.weightTop,
                                                null,
                                                selectedEnergy,
                                                day,
                                                userCoreOneRM,
                                              )}
                                            kg
                                          </h4>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {s.notes && s.notes !== '' && (
                                    <div className='mx-2 text-left text-xs font-extralight text-gray-400'>
                                      {s.notes}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className='relative flex w-full items-end gap-3 px-1 text-gray-400 md:gap-8'>
                              <div className='flex items-start gap-1'>
                                <h3>{exercise.sets}</h3>
                                <h3>X</h3>
                                <h3>{exercise.reps}</h3>
                                <h3>
                                  {exercise.repUnit ? exercise.repUnit : ''}
                                </h3>
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
                                                  day,
                                                  selectedEnergy,
                                                )}
                                              </h4>
                                            )}
                                            {exercise.onermTop && <h4>-</h4>}
                                            {exercise.onermTop && (
                                              <h4>
                                                {checkPercentWeight(
                                                  exercise.estimatedOnermIndex,
                                                  +exercise?.onermTop,
                                                  day,
                                                  selectedEnergy,
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
                                                  selectedEnergy,
                                                  day,
                                                  userCoreOneRM,
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
                                                  selectedEnergy,
                                                  day,
                                                  userCoreOneRM,
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
                                              selectedEnergy,
                                              day,
                                              userCoreOneRM,
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
                                              selectedEnergy,
                                              day,
                                              userCoreOneRM,
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
                                          selectedEnergy,
                                          day,
                                          userCoreOneRM,
                                        )}
                                    </h4>
                                    <h4>{exercise?.weightTop && '-'}</h4>
                                    <h4>
                                      {exercise?.weightTop &&
                                        `${checkWeight(
                                          'weight',
                                          +exercise?.weightTop,
                                          null,
                                          selectedEnergy,
                                          day,
                                          userCoreOneRM,
                                        )}kg`}
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
                                    className='absolute bottom-0 right-0'
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
                            {exercise?.tempoDown ||
                            exercise?.tempoUp ||
                            exercise?.tempoPause ? (
                              <div className='flex gap-4 text-sm'>
                                <div>Tempo:</div>
                                {exercise?.tempoDown && (
                                  <div className='flex items-center gap-0 tracking-tighter'>
                                    <h4>{exercise.tempoDown}</h4>
                                    <ArrowDownToLine size={16} />
                                  </div>
                                )}
                                {exercise?.tempoPause && (
                                  <div className='flex items-center gap-0 tracking-tighter'>
                                    <h4>{exercise.tempoPause}</h4>
                                    <PauseOctagonIcon size={16} />
                                  </div>
                                )}
                                {exercise?.tempoUp && (
                                  <div className='flex items-center gap-0 tracking-tighter'>
                                    <h4>{exercise.tempoUp}</h4>
                                    <ArrowUpToLine size={16} />
                                  </div>
                                )}
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='ml-10 font-light text-gray-500 transition delay-150 ease-in-out md:ml-16'>
                      <div
                        className={
                          open
                            ? `delay-[10ms] absolute text-sm opacity-40 transition-all ease-out`
                            : `delay-[45ms] absolute flex w-full max-w-[85vw] flex-row justify-start gap-1 text-sm opacity-100 transition-all ease-out`
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
                      {exercise.sets && (
                        <div className='flex flex-col gap-2 md:gap-6'>
                          {isSS ? null : (
                            <div className='flex w-full items-center justify-center gap-4 text-2xl font-bold md:gap-6'>
                              <div
                                className='h-8 w-8 cursor-pointer rounded-full text-center'
                                onClick={(e) => {
                                  e.stopPropagation()
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
                                onClick={(e) => {
                                  e.stopPropagation()
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
                            / {exerciseSets}
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
                                          } ${
                                            energy === '10' ? 'text-lg' : ''
                                          }`}
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
                              Number(
                                e1rm[Number(exercise?.reps) - 1] || 0 / 100,
                              )
                            )?.toFixed(0) && (
                              <div className='mx-1 flex gap-2 px-2 md:mx-6'>
                                <div>E1RM</div>
                                {weights &&
                                weights !== 0 &&
                                e1rm[Number(exercise.reps) - 1] ? (
                                  <div>
                                    {(
                                      +weights /
                                      (e1rm?.[Number(exercise?.reps) - 1] /
                                        100 || 0)
                                    )?.toFixed(0)}
                                    kg
                                  </div>
                                ) : null}
                              </div>
                            )}
                          <div className='mx-4 max-w-[90vw] overflow-x-clip'>
                            <AnimatePresence>
                              <div className='flex h-36 items-center gap-3 text-xl font-medium md:gap-4'>
                                <MinusIcon
                                  onClick={() =>
                                    setExerciseSets((e) => (e > 1 ? e - 1 : e))
                                  }
                                  className={`h-8 w-8 flex-shrink-0 cursor-pointer text-gray-400 ${
                                    exerciseSets - exercise.set.length <= 0
                                      ? 'hidden'
                                      : ''
                                  }`}
                                />
                                {[
                                  ...Array(
                                    exerciseSets - exercise.set.length <= 0
                                      ? 0
                                      : exerciseSets - exercise.set.length,
                                  ).keys(),
                                ].map((_, setIdx) => (
                                  <div
                                    key={setIdx}
                                    className=''
                                  >
                                    <SetsModal
                                      exercise={exercise}
                                      onSetDone={onSetDone}
                                      isComplete={exercise.isComplete}
                                    />
                                  </div>
                                ))}
                                <PlusIcon
                                  onClick={() => setExerciseSets((e) => e + 1)}
                                  className='h-8 w-8 flex-shrink-0 cursor-pointer text-gray-400'
                                />
                              </div>
                            </AnimatePresence>
                            <div className='flex overflow-x-clip items-center justify-start gap-3 text-xl font-medium'>
                              {exercise.set
                                .filter((s) => s.isComplete)
                                .map((set) => (
                                  <div
                                    key={set.id}
                                    className='flex flex-col items-center justify-center gap-1 shrink-0'
                                  >
                                    <div
                                      className='flex flex-col gap-1'
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        onDeleteSet(set.id)
                                      }}
                                    >
                                      <div className='flex h-12 min-w-[1rem] cursor-pointer items-center justify-center rounded-full bg-black text-2xl font-bold text-yellow-500'>
                                        {isSS ? 'SS' : set.rep}
                                      </div>
                                    </div>
                                    <div className=''>
                                      <div className='flex flex-col items-center text-sm tracking-tighter text-gray-400'>
                                        <div>RPE:{set.rpe}</div>
                                        {!isSS && (
                                          <div
                                            className={
                                              set.weight == 0 &&
                                              exercise.lift != 'unlinked'
                                                ? 'text-red-500'
                                                : ''
                                            }
                                          >
                                            W:{` `}
                                            <span className='font-bold text-base text-gray-200'>{set.weight === 0 ? '' : `${set.weight}kg`}</span>
                                          </div>
                                        )}
                                        {set.estiamtedOnerm != 0 && (
                                          <div>
                                            E:
                                            {set.estiamtedOnerm === 0
                                              ? ''
                                              : set.estiamtedOnerm}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>

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
          </>
        )}
      </Disclosure>
    </div>
  )
}

const Day = () => {
  const { data: session } = useSession()
  const userId = session?.user.id || ''

  const ctx = api.useContext()
  const router = useRouter()
  const [programId, dayId] = (router.query.id as string[]) || ['', '']
  const [isOpen, setIsOpen] = useState(false)
  const [exerciseToDelete, setExerciseToDelete] = useState<string>('')
  const utils = api.useContext()

  const { data: program, isLoading: programLoading } = api.blocks.get.useQuery({
    id: programId || '',
  })

  const { data: allWarmups, isLoading: allWarmupsLoading } =
    api.warmups.getAll.useQuery()

  const day = program?.week
    .map((week) => week.day)
    .flat()
    .find((day) => day.id === dayId)

  const warmup = allWarmups?.find((w) => w.id === day?.warmupTemplateId)

  const { mutate: updateDayEnergy } = api.programs.updateDayEnergy.useMutation({
    onSuccess: () => {
      void ctx.blocks.get.invalidate()
    },
    onError: (e) => {
      console.log(e)
    },
  })
  const { mutate: deleteExercise } = api.programs.deleteExercise.useMutation({
    onMutate: async (exerciseToDelete) => {
      if (!programId) return
      console.log('id', exerciseToDelete)
      await utils.blocks.get.cancel({ id: programId })
      const previousProgram = utils.blocks.get.getData({ id: programId })

      if (!previousProgram) return

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
                  exercise: day.exercise.filter(
                    (exercise) => exercise.id !== exerciseToDelete.id,
                  ),
                }
              }),
            }
          }),
        },
      )
      return { previousProgram }
    },
    onSuccess: () => {
      void ctx.blocks.get.invalidate()
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const { mutate: updateDayComplete } = api.programs.completeDay.useMutation({
    onMutate: async (newDay) => {
      console.log('id', newDay)
      if (!programId) return
      await utils.blocks.get.cancel({ id: programId })
      const previousProgram = utils.blocks.get.getData({ id: programId })
      if (!previousProgram) return

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
    onError: (err, _newExercise, context) => {
      console.log('err', err)
      if (!programId) return
      utils.blocks.get.setData({ id: programId }, context?.previousProgram)
    },
  })

  const [selectedEngery, setSelectedEngery] = useState(day?.energyRating || 'A')
  const onSetEnergy = (e: string) => {
    setSelectedEngery(e)
    if (!day) return
    updateDayEnergy({
      id: day.id,
      energyRating: e,
    })
  }

  if (programLoading || allWarmupsLoading) return <div>Loading...</div>
  if (!day || !program) return <div>Day not found</div>

  return (
    <>
      <div className='max-w-lg'>
      {day.isRestDay ? (
        <div>Rest Day</div>
      ) : (
        <div className='flex flex-col gap-6'>
          <h2
            className={`text-xl font-bold ${
              day.isComplete ? 'text-green-500' : ''
            }`}
          ></h2>
          {day?.isComplete ? (
            <div
              onClick={() => {
                // updateDayComplete({ id: day.id, isComplete: false, programId: programId  })
              }}
              className={`flex items-center justify-center gap-2 text-xl font-bold text-yellow-500`}
            >
              Completed
            </div>
          ) : (
            <div className='mx-12 flex items-center justify-between'>
              <Button
                onClick={() => {
                  updateDayComplete({
                    id: day.id,
                    isComplete: true,
                    programId: program.id,
                  })
                }}
                className='w-32'
              >
                Complete
              </Button>
              <HomeIcon
                className='h-6 w-6 text-gray-200'
                onClick={() => {
                  void router.push(`/`)
                }}
              />
            </div>
          )}
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
                  className={({ active, checked }) => `${active ? '' : ''}
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
                                checked ? 'text-black' : 'text-gray-400'
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
          {day.warmupTemplateId == '' && day.warmupTemplateId == null ? null : (
            <div className='p-1'>
              <h2 className='ml-1 text-xl font-bold capitalize text-yellow-500'>
                Warmup
              </h2>
              <div className='mx-4 flex flex-col'>
                {warmup?.warmups.map((w) => (
                  <div
                    key={w.id}
                    className='flex items-center justify-between'
                  >
                    <div className='w-24 capitalize'>{w.name}</div>
                    <div className='text-sm font-light text-gray-400'>
                      {w?.notes}
                    </div>
                    <div className='w-8'>
                      {w.link && (
                        <a>
                          <PlaySquare className='h-6 w-6 text-yellow-500' />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className='flex w-full flex-col gap-6 divide-y divide-dashed divide-gray-600 pb-16 md:p-2'>
            {day?.exercise?.map((exercise, idx) => (
              <div
                key={exercise.id}
                className=''
              >
                <ExerciseModal
                  programId={program.id}
                  exercise={exercise}
                  idx={idx}
                  selectedEnergy={selectedEngery}
                  day={day}
                  userId={userId}
                  setIsOpen={setIsOpen}
                  setExerciseToDelete={setExerciseToDelete}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      </div>

      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='z-10'
          onClose={() => setIsOpen(false)}
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
                <Dialog.Panel className='transform overflow-hidden rounded-md bg-black p-8 text-left align-middle text-gray-200 transition-all md:min-h-[600px] md:p-4'>
                  <Dialog.Title
                    as='h3'
                    className='flex items-center justify-center text-base font-medium leading-6 md:text-lg'
                  >
                    delete?
                  </Dialog.Title>
                  <div className='mt-2 flex justify-between gap-6'>
                    <Button
                      onClick={() => {
                        setIsOpen(false)
                        setExerciseToDelete('')
                        deleteExercise({ id: exerciseToDelete })
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => {
                        setExerciseToDelete('')
                        setIsOpen(false)
                      }}
                    >
                      No
                    </Button>
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

export default Day

import { Prisma } from '@prisma/client'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { api } from '~/utils/api'
import {
  checkWeight,
  checkPercentWeight,
  calcRPEWeight,
} from '~/utils/program-card/utils'
import { Transition, Disclosure } from '@headlessui/react'
import { Input } from '@/components/ui/input'
import { rpe as rpeTable } from '~/store/defaultValues'
import {
  ArrowDownToLine,
  ArrowUpToLine,
  Minus,
  PauseOctagonIcon,
  PlaySquare,
  Plus,
  XIcon,
} from 'lucide-react'
import { NumericFormat } from 'react-number-format'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import SetsModal from './setsModal'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { type CarouselApi } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

const exerciseWithSetSS = Prisma.validator<Prisma.ExerciseArgs>()({
  include: {
    set: true,
    ss: true,
  },
})
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
type Exercise = Prisma.ExerciseGetPayload<typeof exerciseWithSetSS>

const rpeValues = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10']

const E1RM = ({
  exercise,
  weights,
  e1rm,
}: {
  exercise: Exercise
  weights: number | null
  e1rm: number[]
}) => {
  return (
    <>
      {exercise.lift &&
        exercise.lift !== 'unlinked' &&
        (
          Number(weights) / Number(e1rm[Number(exercise?.reps) - 1] || 0 / 100)
        )?.toFixed(0) && (
          <div className='mx-1 flex text-2xl font-semibold items-baseline justify-center gap-2 px-2 text-muted-foreground md:mx-6'>
            <div className='text-lg font-medium'>E1RM</div>
            {weights && weights !== 0 && e1rm[Number(exercise.reps) - 1] ? (
              <div>
                {(
                  Number(weights) / (e1rm?.[Number(exercise?.reps) - 1] / 100 || 0)
                )?.toFixed(0)}
                kg
              </div>
            ) : null}
          </div>
        )}
    </>
  )
}

const ExerciseNotes = ({ exercise }: { exercise: Exercise }) => {
  return (
    <>
      {exercise?.notes && (
        <div className='flex flex-col items-center'>
          <MinusIcon className='h-6 w-6' />
          <div className='text-center text-xl text-gray-400'>
            {exercise?.notes}
          </div>
          <MinusIcon className='h-6 w-6' />
        </div>
      )}
    </>
  )
}

const ExerciseCount = ({
  exercise,
  exerciseSets,
}: {
  exercise: Exercise
  exerciseSets: number
}) => {
  return (
    <div className='mt-4 flex w-full justify-center gap-4 text-3xl font-bold md:gap-6'>
      {exercise.set.reduce((acc, curr) => {
        return acc + (curr.isComplete ? 1 : 0)
      }, 0)}{' '}
      / {exerciseSets}
    </div>
  )
}

const ExerciseWeight = ({
  setWeights,
  weights,
}: {
  setWeights: (arg0: number) => void
  weights: number | null
}) => {
  return (
    <div className='flex w-full items-center justify-center gap-4 text-2xl font-bold md:gap-6'>
      <Minus
        size={36}
        strokeWidth={4}
        className='cursor-pointer'
        onClick={(e) => {
          e.stopPropagation()
          if (weights && weights > 0) {
            setWeights(+weights - 2.5)
          }
        }}
      />
      <div className='relative flex w-56 text-center'>
        <NumericFormat
          className='w-full rounded-3xl border-8 border-gray-800 bg-black p-6 text-center text-5xl tracking-tighter font-bold placeholder-gray-600'
          value={weights}
          placeholder='kg'
          decimalScale={2}
          onChange={(e) => setWeights(+e.target.value)}
        />
        {weights && weights !== 0 ? (
          <span className='absolute right-4 text-base text-gray-400 bottom-10'>kg</span>
        ) : null}
      </div>
      <Plus
        size={36}
        strokeWidth={4}
        className='cursor-pointer'
        onClick={(e) => {
          e.stopPropagation()
          if (weights) {
            setWeights(+weights + 2.5)
          } else {
            setWeights(2.5)
          }
        }}
      />
    </div>
  )
}

const RpeSelect = ({
  value,
  onChange,
}: {
  value: string
  onChange: (arg0: string) => void
}) => {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('settle', () => {
      onChange(rpeValues[api.selectedScrollSnap() as number] || '')
    })
  }, [api])

  return (
    <div className='flex flex-col items-center px-12 py-2'>
      <h2 className='text-2xl font-semibold'>RPE</h2>
      <Carousel
        className='w-28'
        setApi={setApi}
        opts={{
          startIndex: rpeValues.indexOf(value),
          align: 'center',
        }}
      >
        <CarouselContent>
          {rpeValues.map((i, index) => (
            <CarouselItem key={index}>
              <div className='flex justify-center p-1'>
                <Card className='w-16 rounded-full border-0 bg-yellow-500'>
                  <CardContent className='flex aspect-square items-center justify-center p-2'>
                    <span className='text-3xl font-bold'>{i}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='border-0' />
        <CarouselNext className='border-0' />
      </Carousel>
    </div>
  )
}

const ExerciseSets = ({
  exercise,
  onSetDone,
  onDeleteSet,
  exerciseSets,
  setExerciseSets,
}: {
  exercise: Exercise
  onSetDone: (reps: number) => void
  onDeleteSet: (setId: string) => void
  exerciseSets: number
  setExerciseSets: (arg0: number) => void
}) => {
  const [api, setApi] = useState<CarouselApi>()
  // const [finished, setFinished] = useState(() =>
  //   exercise.set.reduce((acc, curr) => {
  //     return acc + (curr.isComplete ? 1 : 0)
  //   }, 0),
  // )

  const finished = exercise.set.reduce((acc, curr) => {
    return acc + (curr.isComplete ? 1 : 0)
  }, 0)

  console.log('finished', finished)

  useEffect(() => {
    if (!api) {
      return
    }
    console.log('effect')

    api.scrollTo(finished - 1, false)
  }, [finished])

  return (
    <div className='px-12'>
      <Carousel
        className='w-full'
        setApi={setApi}
        opts={{
          align: 'center',
        }}
      >
        <CarouselContent>
          {[
            ...Array(
              exerciseSets,
            ).keys(),
          ].map((_, setIdx) => (
            <>
              {exercise.isComplete ? (
                <>
                  {exercise?.set[setIdx]?.isComplete && (
                    <CarouselItem
                      key={setIdx}
                      className={`basis-1/4 ${
                        exercise.ss.length > 0 ? '' : 'min-h-28'
                      }`}
                    >
                      <SetsModal
                        exercise={exercise}
                        onSetDone={onSetDone}
                        set={exercise.set[setIdx]}
                        onDeleteSet={onDeleteSet}
                      />
                    </CarouselItem>
                  )}
                </>
              ) : (
                <CarouselItem
                  key={setIdx}
                  className={`basis-1/4 ${
                    exercise.ss.length > 0 ? '' : 'min-h-24'
                  }`}
                >
                  <SetsModal
                    exercise={exercise}
                    onSetDone={onSetDone}
                    isComplete={exercise.isComplete}
                    set={exercise.set[setIdx]}
                    onDeleteSet={onDeleteSet}
                  />
                </CarouselItem>
              )}
            </>
          ))}
          {exercise.isComplete ? null : (
            <CarouselItem
              key={exerciseSets + 1}
              className='flex basis-1/4 items-center justify-center'
            >
              <PlusIcon
                onClick={() => setExerciseSets((e) => e + 1)}
                className='mt-1 h-12 w-12 flex-shrink-0 cursor-pointer text-gray-400'
              />
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className='border-0' />
        <CarouselNext className='border-0' />
      </Carousel>
    </div>
  )
}

const ExerciseHeader = ({
  open,
  exercise,
  isSS,
  setIsOpen,
  setExerciseToDelete,
}: {
  open: boolean
  exercise: Exercise
  isSS: boolean
  setIsOpen: (arg0: boolean) => void
  setExerciseToDelete: (arg0: string) => void
}) => {
  return (
    <div className='grid grid-cols-9 items-center'>
      <ChevronUpIcon
        className={`${
          open ? 'rotate-180 transform' : ''
        } h-6 w-8 text-gray-300 `}
      />
      <div
        className={`${
          exercise.isComplete ? 'text-yellow-500' : 'text-white'
        }  col-span-7 text-2xl font-medium first-letter:text-3xl first-letter:font-bold first-letter:uppercase `}
      >
        {isSS ? 'Super set' : exercise.name}
      </div>
      <div className='justify-self-end'>
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
  exercise: Exercise
  selectedEnergy: string
  day: Day
  programId: string
  userId: string
  setIsOpen: (arg0: boolean) => void
  setExerciseToDelete: (arg0: string) => void
}) => {
  const [rpe, setRpe] = useState('8')
  const [exerciseSets, setExerciseSets] = useState(Number(exercise.sets) || 0)

  const { data: userCoreOneRM, isLoading: userRMLoading } =
    api.oneRepMax.getUserCoreLifts.useQuery({
      userId: userId,
    })
  const { data: rpeData, isLoading: rpeLoading } =
    api.rpe.getAll.useQuery(userId)

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
        exercise.lift || '',
        selectedEnergy,
        rpeData,
      )
      setWeights(res ? +res : 0)
    }
  }, [setWeights, userRMLoading, rpeLoading])

  const [e1rm, setE1rm] = useState<number[]>([0])
  const [notes, setNotes] = useState<string>(() => exercise?.flield2 || '')

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
      lift: exercise.lift || '',
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
    if (rpeTable[index]) setE1rm(rpeTable[index] as number[])
  }, [weights, rpe])

  const isSS = exercise.ss && exercise.ss.length > 0

  const ExerciseHeaderSS = ({ open }: { open: boolean }) => {
    return (
      <div className='w-full'>
        <div className='ml-1 w-full'>
          {exercise.ss.map((s) => (
            <div
              className='relative'
              key={s.id}
            >
              <div
                className='absolute bottom-0 right-0'
                onClick={(e) => e.stopPropagation()}
              >
                {s.htmlLink && s.htmlLink !== '' && open && (
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
              <div className='grid w-full grid-cols-16 gap-0 text-xl tracking-tighter text-muted-foreground'>
                <div className='flex gap-1 place-self-center font-bold'>
                  <div>{s.reps}</div>
                  {s.repUnit ? <div>s.repUnit</div> : null}
                </div>
                <XIcon
                  size={20}
                  className='self-center'
                />
                <div className='col-span-11 place-self-start font-semibold'>
                  {s.name}
                </div>
                <div className='col-span-3 self-start justify-self-center font-light '>
                  {s.weightType === 'rpe' && (
                    <div className='flex justify-end gap-0'>
                      <h4>RPE</h4>
                      <h4>-</h4>
                      <h4 className=''>{s?.targetRpe && +s?.targetRpe}</h4>
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
              {open && (
                <div className='mx-2 min-h-4 text-center text-base text-gray-600'>
                  {s.notes && s.notes !== '' && open && <>{s.notes}</>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const ExerciseHeaderN = ({ open }: { open: boolean }) => {
    return (
      <>
        <div className='relative flex w-full items-baseline justify-center gap-3 px-1 text-xl font-medium text-gray-400 md:gap-8'>
          <div className='flex items-baseline gap-1 text-2xl font-bold'>
            <h3>{exercise.sets}</h3>
            <h3 className='text-sm font-medium'>X</h3>
            <h3>{exercise.reps}</h3>
            <h3>{exercise.repUnit ? exercise.repUnit : ''}</h3>
          </div>
          <div>
            {exercise.weightType === 'percent' && (
              <div className=''>
                {exercise.estimatedOnermIndex ? (
                  <div>
                    {Number(
                      day?.exercise[exercise?.estimatedOnermIndex - 1]?.set[0]
                        ?.weight,
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
                    {Number(
                      day.exercise[exercise.estimatedOnermIndex - 1]?.set[0]
                        ?.weight,
                    ) > 0 && (
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
                      null,
                      selectedEnergy,
                      day,
                      userCoreOneRM,
                    )}
                </h4>
                <h4>{exercise?.weightTop && '-'}</h4>
                <h4>
                  {exercise?.weightTop &&
                    `${
                      checkWeight(
                        'weight',
                        +exercise?.weightTop,
                        null,
                        selectedEnergy,
                        day,
                        userCoreOneRM,
                      ) || ''
                    }kg`}
                </h4>
              </div>
            )}
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className=''
          >
            {exercise.htmlLink && open && (
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
        {exercise?.tempoDown || exercise?.tempoUp || exercise?.tempoPause ? (
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
      </>
    )
  }

  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <div className='flex flex-col justify-start gap-2 overflow-hidden '>
              <div className='flex flex-col gap-0'>
                <Disclosure.Button
                  className={`w-full text-xl ${open ? 'pb-0' : 'py-2'}`}
                >
                  <div className='flex flex-col gap-0'>
                    <div className='flex w-full flex-col '>
                      <ExerciseHeader
                        open={open}
                        exercise={exercise}
                        isSS={isSS}
                        setIsOpen={setIsOpen}
                        setExerciseToDelete={setExerciseToDelete}
                      />
                      {isSS ? (
                        <ExerciseHeaderSS open={open} />
                      ) : (
                        <ExerciseHeaderN open={open} />
                      )}
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
                      <ExerciseNotes exercise={exercise} />
                      {exercise.sets && (
                        <div className='mb-6 flex flex-col gap-1'>
                          {isSS ? null : (
                            <ExerciseWeight
                              weights={weights}
                              setWeights={setWeights}
                            />
                          )}
                          <RpeSelect
                            value={rpe}
                            onChange={setRpe}
                          />
                          <E1RM
                            exercise={exercise}
                            weights={weights}
                            e1rm={e1rm}
                          />
                          <ExerciseCount
                            exercise={exercise}
                            exerciseSets={exerciseSets}
                          />
                          <ExerciseSets
                            exercise={exercise}
                            onSetDone={onSetDone}
                            onDeleteSet={onDeleteSet}
                            exerciseSets={exerciseSets}
                            setExerciseSets={setExerciseSets}
                          />

                          <Input
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder='Notes'
                            className='w-full'
                          />
                          {exercise.isComplete ? (
                            <Button
                              onClick={() => {
                                updateExerciseComplete({
                                  id: exercise.id,
                                  isComplete: false,
                                  notes: notes,
                                })
                              }}
                              className='mx-auto w-36'
                              size='lg'
                              variant='secondary'
                            >
                              Re-Start
                            </Button>
                          ) : (
                            <Disclosure.Button>
                              <Button
                                onClick={() => {
                                  updateExerciseComplete({
                                    id: exercise.id,
                                    isComplete: true,
                                    notes: notes,
                                  })
                                }}
                                className='mx-auto w-36'
                                size='lg'
                                variant='secondary'
                              >
                                Finish
                              </Button>
                            </Disclosure.Button>
                          )}
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

export default ExerciseModal

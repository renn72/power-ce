import {
  useState, Fragment,
} from 'react'

import {
  ChevronUpDownIcon, CheckIcon, XCircleIcon, CheckCircleIcon, StarIcon as StarIconHollow,
} from '@heroicons/react/24/outline'

import {
  ChevronUpIcon, StarIcon, TicketIcon,
} from '@heroicons/react/20/solid'

import { api, } from '~/utils/api'
import getWeight from '~/utils/getWeight'

import {
  Dialog, Transition,
  Listbox, RadioGroup,
} from '@headlessui/react'
import { Button, } from '@/components/ui/button'
import { Input, } from '@/components/ui/input'
import { useForm, } from 'react-hook-form'
import { toast, } from 'react-hot-toast'
import {
  Controller, useFieldArray, useFormContext,
} from 'react-hook-form'
import LiftPicker from '../templates/liftPicker'
import { Checkbox, } from '@/components/ui/checkbox'

import { NumericFormat, } from 'react-number-format'
import { Label, } from '@/components/ui/label'

import { type Exercise, } from '@prisma/client'

const plans = [
  {
    name: '1rm%',
    value: 'onerm',
  },
  {
    name: 'Weight',
    value: 'weight',
  },
  {
    name: 'RPE Target',
    value: 'rpe',
  },
]

const ExerciseDialog = ({
  exerciseId, closeModal,
}: { exerciseId: string, closeModal: () => void }) => {
  const ctx = api.useContext()
  const { data: programsData, } = api.blocks.getAllPrograms.useQuery()
  const { mutate: updateExercise, } = api.userPrograms.updateExercise.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success('Saved')
      void ctx.blocks.getAllPrograms.invalidate()
      closeModal()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },

  })

  const exercise: Exercise = programsData?.reduce((acc, program) => {
    return program.week.reduce((acc, week) => {
      return week.day.reduce((acc, day) => {
        return day.exercise.find((exercise) => exercise.id === exerciseId) || acc
      }, acc)
    }, acc)
  }, null)
  console.log('exercise', exercise)

  const formMethods = useForm()
  const {
    register, unregister, getValues, watch, reset, setValue, control, handleSubmit, clearErrors, setError, formState: { errors, },
  } = formMethods

  const onSubmit = (input: Exercise) => {
    const data = {
      id: exerciseId,
      name: input.name || '',
      lift: input.lift,
      onerm: input.onerm ? +input.onerm : null,
      onermTop: input.onermTop ? +input.onermTop : null,
      weightTop: input.weightTop ? +input.weightTop : null,
      weightBottom: input.weightBottom ? +input.weightBottom : null,
      targetRpe: input.targetRpe ? +input.targetRpe : null,
      sets: input.sets ? +input.sets : null,
      reps: input.reps ? +input.reps : null,
      notes: input.notes,
      isEstimatedOnerm: input.isEstimatedOnerm || false,
      estimatedOnermIndex: input.estimatedOnermIndex,
      weightType: input.weightType,
      repUnit: input.repUnit,
      htmlLink: input.htmlLink,
      userId: exercise.set[0].userId || '',
    }
    console.log('data', data)
    updateExercise({ exercise: data, })
  }
  const onError = (errors) => {
    toast.error(JSON.stringify(errors, null, 2))
    console.log('errors', errors)
  }

  const weightType = watch(`weightType`)

  if (!exercise) return null

  return (
    <>
      <Dialog.Title
        as='h3'
        className='text-lg capitalize text-yellow-500 font-medium leading-6 flex justify-between'
      >
        {exercise.name}
        <button onClick={() => closeModal()} className='text-gray-400 hover:text-white'>X</button>
      </Dialog.Title>
      <div className='my-8 flex justify-center'>
        <form onSubmit={handleSubmit(onSubmit, onError)} className='w-full flex flex-col justify-center items-center '>
          <div className='flex flex-col justify-center'>
            <div className='flex flex-col gap-8 my-6'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10'>
                <div className='flex flex-col justify-center'>
                  <Controller
                    control={control}
                    name={`lift`}
                    defaultValue={exercise.lift}
                    render={({
                      field: {
                        onChange, value,
                      },
                    }) => (<LiftPicker onChange={onChange} value={value} />)}
                  />
                </div>
                <Input
                  className=''
                  {...register(`name`,)}
                  defaultValue={exercise.name || ''}
                  placeholder='name'
                />
                <div className='flex items-center'>
                  < Label
                    htmlFor='sets'
                    className='text-gray-400 absolute'
                  >
                    Sets:
                  </Label>
                  <Input
                    id='sets'
                    type='number'
                    className='pl-12'
                    {...register(`sets`, { valueAsNumber: true, })}
                    placeholder='sets'
                    defaultValue={exercise.sets || 1}
                  />

                </div>
                <div className='flex items-center'>
                  < Label
                    htmlFor='reps'
                    className='text-gray-400 absolute'
                  >
                    Reps:
                  </Label>
                  <Input
                    id='reps'
                    className='pl-12'
                    type='number'
                    {...register(`reps`, { valueAsNumber: true, })}
                    placeholder='reps'
                    defaultValue={exercise.reps || 1}
                  />
                </div>
              </div>
              <div className='my-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10'>
                <Controller
                  control={control}
                  name={`weightType`}
                  defaultValue={exercise.weightType}
                  render={({
                    field: {
                      onChange, value,
                    },
                  }) => (
                    <div className=''>
                      <RadioGroup value={value} onChange={onChange}>
                        <RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
                        <div className='flex items-center justify-start gap-4 md:gap-10'>
                          {plans.map((plan) => (
                            <RadioGroup.Option
                              key={plan.name}
                              value={plan.value}
                              className={({
                                active, checked,
                              }) => `${checked ? 'bg-gray-600 bg-opacity-75 text-gray-200' : 'bg-black text-gray-400'}
                                relative flex cursor-pointer rounded-lg px-5 shadow-md focus:outline-none w-52 h-10`
                              }
                            >
                              {({
                                active, checked,
                              }) => (
                                <>
                                  <div className='flex w-full items-center justify-between'>
                                    <div className='flex items-center'>
                                      <div className='text-base tracking-tighter'>
                                        <RadioGroup.Label
                                          as='p'
                                          className={`font-medium  ${checked ? 'text-gray-200' : 'text-gray-400'
                                            }`}
                                        >
                                          {plan.name}
                                        </RadioGroup.Label>
                                      </div>
                                    </div>
                                    {checked && (
                                      <div className='shrink-0 text-white'>
                                        <CheckCircleIcon className='h-6 w-6' />
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                />
                {weightType === 'onerm'
                  && (
                    <div className='grid grid-cols-2 gap-4 md:gap-10'>
                      <Input
                        type='number'
                        {...register(`onerm`, { valueAsNumber: true, })}
                        placeholder='1rm percent'
                        defaultValue={exercise.onerm || undefined}
                      />
                      <Input
                        type='number'
                        {...register(`onermTop`, { valueAsNumber: true, })}
                        placeholder='1rm percent top'
                        defaultValue={exercise.onermTop || undefined}
                      />
                    </div>
                  )}
                {weightType === 'weight'
                  && (

                    <div className='grid grid-cols-2 gap-4 md:gap-10'>
                      <Input
                        type='number'
                        {...register(`weightBottom`, { valueAsNumber: true, })}
                        placeholder='weight bottom'
                        defaultValue={exercise.weightBottom || undefined}
                      />
                      <Input
                        type='number'
                        {...register(`weightTop`, { valueAsNumber: true, })}
                        placeholder='weight top'
                        defaultValue={exercise.weightTop || undefined}
                      />
                    </div>
                  )
                }
                {
                  weightType === 'rpe'
                  && (

                    <div className='grid grid-cols-2 gap-4 md:gap-10'>
                      <Controller
                        name={`targetRpe`}
                        control={control}
                        defaultValue={exercise.targetRpe || undefined}
                        render={({
                          field: {
                            onChange, value,
                          },
                        }) => (
                          <NumericFormat
                            className=' flex h-10 w-full border-b border-gray-600 bg-black px-3 py-2 text-sm text-gray-200 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                            value={value}
                            onChange={onChange}
                            placeholder='rpe target'
                          />
                        )}
                      />
                    </div>
                  )
                }
              </div>
              <div className='flex gap-4 md:gap-10 items-center justify-between'>
                <Input
                  type='text'
                  {...register(`notes`)}
                  placeholder='notes'
                  defaultValue={exercise.notes || ''}
                />

                <Controller
                  control={control}
                  name={`estimatedOnermIndex`}
                  defaultValue={exercise.estimatedOnermIndex}
                  render={({
                    field: {
                      onChange, value,
                    },
                  }) => (
                    <div className='flex items-center gap-2'>
                      <Listbox
                        value={value}
                        onChange={onChange}
                      >
                        <div className='relative text-xs sm:text-sm w-24'>
                          <Listbox.Button className='relative w-full border-b border-gray-600 cursor-default py-2 pl-3 pr-10 text-left shadow-md focus:outline-none '>
                            <span className={value ? `flex items-center` : `flex items-center text-gray-400`}>{value || 'e1rm'}</span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                              <ChevronUpDownIcon
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <Listbox.Options className='absolute z-20 mt-1 max-h-160 w-full border border-gray-600 overflow-auto bg-black py-1 '>
                              {[
                                0,
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                              ].map((_, idx) => (
                                <Listbox.Option
                                  key={idx}
                                  className={({ active, }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-200'
                                    }`
                                  }
                                  value={idx + 1}
                                >
                                  {({ selected, }) => (
                                    <>
                                      <span
                                        className={`block capitalize truncate ${selected ? 'font-bold' : 'font-semibold'
                                          }`}
                                      >
                                        {idx + 1}
                                      </span>
                                      {selected
                                        ? (
                                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                          </span>
                                        )
                                        : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                      <XCircleIcon
                        className='h-6 w-6 text-gray-400 cursor-pointer'
                        onClick={() => onChange(null)}
                      />
                    </div>
                  )}
                />

              </div>
              <Input
                type='text'
                {...register(`htmlLink`)}
                placeholder='link'
                defaultValue={exercise.htmlLink || ''}
              />
            </div>
          </div>
          <Button type='submit'>Update</Button>
        </form>
      </div>
    </>

  )
}

const ProgramView = ({ userId, }: { userId: string }) => {

  const {
    data: userPrograms, isLoading: userProgramsLoading,
  } = api.userPrograms.getAll.useQuery()
  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()
  const { data: programsData, } = api.blocks.getAllPrograms.useQuery()
  const { data: userCoreOneRM, } = api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId, })

  const [
    isOpen,
    setIsOpen,
  ] = useState(false)
  const [
    exerciseId,
    setExerciseId,
  ] = useState('')

  const userProgram = userPrograms?.find((userProgram) => userProgram.userId === userId && userProgram.isProgramActive)
  const program = programsData?.find((program) => program.id === userProgram?.programId)

  if (!userProgram || !program) return null

  const checkWeight = (lift: string | null, onerm: number | null) => {
    if (!lift || !onerm) return ''
    const w = userCoreOneRM?.find((coreLift) => coreLift?.lift === lift.toLowerCase())?.weight

    if (!w) return ''

    return getWeight(+w, onerm,)
  }

  const isOneRm = (lift: string | null) => {

    if (!lift) return false

    const w = userCoreOneRM?.find((coreLift) => coreLift?.lift === lift?.toLowerCase())?.weight

    if (!w) return false
    return true
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = (id: string) => {
    setExerciseId(id)
    setIsOpen(true)
  }

  const blocksTitle = blocksData?.map((block) => block.name)
  return (
    <>
      <div className='flex flex-col gap-8 text-base sm:text-lg md:px-2 mt-8'>
        {
          program.week.map((week, weekIndex) => (
            <div key={week.id}>
              <h1
                className='text-2xl font-bold mb-4'
              >Week {weekIndex + 1}</h1>
              <div className='grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-7 md:px-2'>
                {
                  week.day.map((day, dayIndex) => (
                    <div key={day.id} className='hover:bg-gray-900/70 hover:rounded-md p-2'>
                      {
                        day.isRestDay
                          ? (
                            <div>
                              <h2
                                className='text-xl font-bold mb-4'
                              >
                                Day {dayIndex + 1}
                              </h2>
                              <h2 className='lg:w-44 text-gray-400'>Rest Day</h2>
                            </div>

                          )
                          : (
                            <div className='flex flex-col gap-4'>
                              <div className={`flex gap-4 mb-4 `}>
                                <h2
                                  className={`text-xl flex ${day.isComplete ? 'text-green-500 font-extrabold' : 'font-bold '}`}
                                >
                                  Day {dayIndex + 1}
                                </h2>
                                {day.isComplete && <StarIcon className='h-6 w-6 text-yellow-500' />}
                                {day.isComplete && (<span className='text-xl font-semibold'>E: {day.energyRating}</span>)}
                              </div>
                              <div className='flex flex-col divide-y divide-dashed divide-gray-600'>
                                {
                                  day.exercise.map((exercise, exerciseIndex) => (
                                    <div key={exercise.id}>
                                      {exercise.isComplete
                                        ? (
                                          <div
                                            className='flex flex-col gap-1 py-2 hover:bg-gray-900 hover:rounded-md'
                                          >
                                            <div>
                                              <div className='flex gap-2'>
                                                <h3
                                                  className='capitalize text-yellow-500'
                                                >
                                                  {exercise.name}
                                                </h3>
                                                <StarIcon className='h-6 w-6 text-yellow-500' />
                                              </div>
                                              <h3
                                                className='text-gray-600 text-xxs leading-none capitalize'
                                              >
                                                {exercise.lift}
                                              </h3>
                                            </div>
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
                                                  <div>
                                                    {isOneRm(exercise.lift)
                                                      ? (
                                                        <div className='flex'>
                                                          <h4>
                                                            {exercise.onerm ? checkWeight(exercise.lift, exercise?.onerm,) : (<div className='text-red-500'>Missing %</div>)}
                                                          </h4>
                                                          <h4>{exercise.onermTop && '-'}</h4>
                                                          <h4>
                                                            {exercise.onermTop && checkWeight(exercise.lift, exercise.onermTop,)}kg
                                                          </h4>
                                                        </div>

                                                      )
                                                      : (
                                                        <div className='text-red-500'>
                                                          Missing 1rm
                                                        </div>
                                                      )}
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
                                                    <h4 className='text-xl font-semibold flex justify-center items-baseline'>
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
                                                      {exercise?.weightBottom ? +exercise?.weightBottom : (<div className='text-red-500'>Missing W</div>)}
                                                    </h4>
                                                    <h4>
                                                      {exercise?.weightTop && '-'}
                                                    </h4>
                                                    <h4>
                                                      {exercise?.weightTop && +exercise?.weightTop}kg
                                                    </h4>
                                                  </div>

                                                )

                                              }
                                            </div>
                                            <div className='mt-6 flex flex-col gap-4 text-base'>
                                              {
                                                exercise?.set.map((s, setIndex) => (
                                                  <div key={s.id} className='grid grid-cols-7 gap-x-1 tracking-tighter'>
                                                    {/* <h4 className=''>{setIndex + 1}.</h4> */}
                                                    <h4 className=''>{s?.rep}</h4>
                                                    {s.weight && +s.weight !== 0 && (<h4 className='col-span-2'>{+s.weight}kg</h4>)}
                                                    <h4 className='col-span-2'>rpe {s?.rpe && +s?.rpe}</h4>
                                                    {s.estiamtedOnerm && s.estiamtedOnerm != 0 && (<h4 className='col-span-2'>1rm {+s.estiamtedOnerm}kg</h4>)}
                                                  </div>
                                                ))
                                              }
                                            </div>
                                            <div className='hidden'>
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
                                              {exercise.weightType}
                                            </h3>

                                          </div>
                                        )
                                        : (

                                          <div
                                            className='flex flex-col gap-1 py-2 hover:bg-gray-900 hover:rounded-md cursor-pointer'
                                            onClick={() => openModal(exercise.id)}
                                          >
                                            <div>
                                              <h3
                                                className='capitalize text-yellow-500'
                                              >
                                                {exercise.name}
                                              </h3>
                                              <h3
                                                className='text-gray-600 text-xxs leading-none capitalize'
                                              >
                                                {exercise.lift}
                                              </h3>
                                            </div>
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
                                                  <div>
                                                    {isOneRm(exercise.lift)
                                                      ? (
                                                        <div className='flex'>
                                                          <h4>
                                                            {exercise.onerm ? checkWeight(exercise.lift, exercise?.onerm,) : (<div className='text-red-500'>Missing %</div>)}
                                                          </h4>
                                                          <h4>{exercise.onermTop && '-'}</h4>
                                                          <h4>
                                                            {exercise.onermTop && checkWeight(exercise.lift, exercise.onermTop,)}kg
                                                          </h4>
                                                        </div>

                                                      )
                                                      : (
                                                        <div className='text-red-500'>
                                                          Missing 1rm
                                                        </div>
                                                      )}
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
                                                    <h4 className='text-xl font-semibold flex justify-center items-baseline'>
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
                                                      {exercise?.weightBottom ? +exercise?.weightBottom : (<div className='text-red-500'>Missing W</div>)}
                                                    </h4>
                                                    <h4>
                                                      {exercise?.weightTop && '-'}
                                                    </h4>
                                                    <h4>
                                                      {exercise?.weightTop && +exercise?.weightTop}kg
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
                                            <div>
                                              {
                                                exercise.htmlLink && (
                                                  <a href={exercise.htmlLink} target='_blank' className='text-sm text-gray-200' rel='noreferrer'>
                                                    {exercise.htmlLink}
                                                  </a>
                                                )
                                              }
                                            </div>
                                            <h3
                                              className='text-gray-600 text-xxs'
                                            >
                                              {exercise.weightType}
                                            </h3>

                                          </div>
                                        )}
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          )
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div >
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10 text-gray-200' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-75' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-7xl transform overflow-visible rounded-2xl bg-black border border-gray-800 p-6 text-left align-middle shadow-xl transition-all'>
                  <ExerciseDialog exerciseId={exerciseId} closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ProgramView

import { Fragment } from 'react'

import {
  ChevronUpDownIcon,
  CheckIcon,
  XCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

import { api } from '~/utils/api'

import { Dialog, Transition, Listbox, RadioGroup } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Controller } from 'react-hook-form'
import LiftPicker from '~/pages/templates/liftPicker'

import { NumericFormat } from 'react-number-format'
import { Label } from '@/components/ui/label'

import { type Exercise } from '@prisma/client'

import { Prisma } from '@prisma/client'

const exerciseWithSet = Prisma.validator<Prisma.ExerciseArgs>()({
  include: {
    set: true,
  },
})

type ExerciseWithSet = Prisma.ExerciseGetPayload<typeof exerciseWithSet>

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
  exerciseId,
  closeModal,
  userId,
}: {
  exerciseId: string
  closeModal: () => void
  userId: string
}) => {
  const ctx = api.useContext()
  const { data: programData } = api.blocks.getUserActiveProgramFull.useQuery({
    userId: userId,
  })

  const { mutate: updateExercise } =
    api.userPrograms.updateExercise.useMutation({
      onSuccess: () => {
        toast.success('Saved')
        void ctx.blocks.getUserActiveProgramFull.invalidate()
        closeModal()
      },
      onError: (e) => {
        console.log('error', e)
        toast.error('Error')
      },
    })

  const exercise = programData
    ?.find((program) =>
      program.week.find((week) =>
        week.day.find((day) =>
          day.exercise.find((exercise) => exercise.id === exerciseId),
        ),
      ),
    )
    ?.week.find((week) =>
      week.day.find((day) =>
        day.exercise.find((exercise) => exercise.id === exerciseId),
      ),
    )
    ?.day.find((day) =>
      day.exercise.find((exercise) => exercise.id === exerciseId),
    )
    ?.exercise.find((exercise) => exercise.id === exerciseId) as ExerciseWithSet

  const formMethods = useForm()
  const { register, watch, control, handleSubmit } = formMethods

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
      userId: exercise?.set[0]?.userId || '',
    }
    updateExercise({ exercise: data })
  }

  const weightType = watch(`weightType`) as string

  if (!exercise) return null

  return (
    <>
      <Dialog.Title
        as='h3'
        className='flex justify-between text-lg font-medium capitalize leading-6 text-yellow-500'
      >
        {exercise.name}
        <button
          onClick={() => closeModal()}
          className='text-gray-400 hover:text-white'
        >
          X
        </button>
      </Dialog.Title>
      <div className='my-8 flex justify-center'>
        <form
          // TODO: fix this
          // @ts-ignore TS2322
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col items-center justify-center '
        >
          <div className='flex flex-col justify-center'>
            <div className='my-6 flex flex-col gap-8'>
              <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-10'>
                <div className='flex flex-col justify-center'>
                  <Controller
                    control={control}
                    name={`lift`}
                    defaultValue={exercise.lift}
                    render={({ field: { onChange, value } }) => (
                      <LiftPicker
                        onChange={onChange}
                        // TODO: fix this
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        value={value}
                      />
                    )}
                  />
                </div>
                <Input
                  className=''
                  {...register(`name`)}
                  defaultValue={exercise.name || ''}
                  placeholder='name'
                />
                <div className='flex items-center'>
                  <Label
                    htmlFor='sets'
                    className='absolute text-gray-400'
                  >
                    Sets:
                  </Label>
                  <Input
                    id='sets'
                    type='number'
                    className='pl-12'
                    {...register(`sets`, { valueAsNumber: true })}
                    placeholder='sets'
                    defaultValue={exercise.sets || 1}
                  />
                </div>
                <div className='flex items-center'>
                  <Label
                    htmlFor='reps'
                    className='absolute text-gray-400'
                  >
                    Reps:
                  </Label>
                  <Input
                    id='reps'
                    className='pl-12'
                    type='number'
                    {...register(`reps`, { valueAsNumber: true })}
                    placeholder='reps'
                    defaultValue={exercise.reps || 1}
                  />
                </div>
              </div>
              <div className='my-1 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10'>
                <Controller
                  control={control}
                  name={`weightType`}
                  defaultValue={exercise.weightType}
                  render={({ field: { onChange, value } }) => (
                    <div className=''>
                      <RadioGroup
                        // TODO: fix this
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        value={value}
                        onChange={onChange}
                      >
                        <div className='flex items-center justify-start gap-4 md:gap-10'>
                          {plans.map((plan) => (
                            <RadioGroup.Option
                              key={plan.name}
                              value={plan.value}
                              className={({ checked }) => `${
                                checked
                                  ? 'bg-gray-600 bg-opacity-75 text-gray-200'
                                  : 'bg-black text-gray-400'
                              }
                                relative flex h-10 w-52 cursor-pointer rounded-lg px-5 shadow-md focus:outline-none`}
                            >
                              {({ checked }) => (
                                <>
                                  <div className='flex w-full items-center justify-between'>
                                    <div className='flex items-center'>
                                      <div className='text-base tracking-tighter'>
                                        <RadioGroup.Label
                                          as='p'
                                          className={`font-medium  ${
                                            checked
                                              ? 'text-gray-200'
                                              : 'text-gray-400'
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
                {weightType === 'onerm' && (
                  <div className='grid grid-cols-2 gap-4 md:gap-10'>
                    <Input
                      type='number'
                      {...register(`onerm`, { valueAsNumber: true })}
                      placeholder='1rm percent'
                      defaultValue={exercise.onerm || undefined}
                    />
                    <Input
                      type='number'
                      {...register(`onermTop`, { valueAsNumber: true })}
                      placeholder='1rm percent top'
                      defaultValue={exercise.onermTop || undefined}
                    />
                  </div>
                )}
                {weightType === 'weight' && (
                  <div className='grid grid-cols-2 gap-4 md:gap-10'>
                    <Input
                      type='number'
                      {...register(`weightBottom`, { valueAsNumber: true })}
                      placeholder='weight bottom'
                      defaultValue={Number(exercise.weightBottom) || undefined}
                    />
                    <Input
                      type='number'
                      {...register(`weightTop`, { valueAsNumber: true })}
                      placeholder='weight top'
                      defaultValue={Number(exercise.weightTop) || undefined}
                    />
                  </div>
                )}
                {weightType === 'rpe' && (
                  <div className='grid grid-cols-2 gap-4 md:gap-10'>
                    <Controller
                      name={`targetRpe`}
                      control={control}
                      defaultValue={exercise.targetRpe || undefined}
                      render={({ field: { onChange, value } }) => (
                        <NumericFormat
                          className=' flex h-10 w-full border-b border-gray-600 bg-black px-3 py-2 text-sm text-gray-200 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                          // TODO: fix this
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          value={value}
                          onChange={onChange}
                          placeholder='rpe target'
                        />
                      )}
                    />
                  </div>
                )}
              </div>
              <div className='flex items-center justify-between gap-4 md:gap-10'>
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
                  render={({ field: { onChange, value } }) => (
                    <div className='flex items-center gap-2'>
                      <Listbox
                        // TODO: fix this
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        value={value}
                        onChange={onChange}
                      >
                        <div className='relative w-24 text-xs sm:text-sm'>
                          <Listbox.Button className='relative w-full cursor-default border-b border-gray-600 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none '>
                            <span
                              className={
                                value
                                  ? `flex items-center`
                                  : `flex items-center text-gray-400`
                              }
                            >
                              {value || 'e1rm'}
                            </span>
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
                            <Listbox.Options className='max-h-160 absolute z-20 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 '>
                              {[0, 1, 2, 3, 4, 5, 6].map((_, idx) => (
                                <Listbox.Option
                                  key={idx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? 'bg-amber-100 text-amber-900'
                                        : 'text-gray-200'
                                    }`
                                  }
                                  value={idx + 1}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate capitalize ${
                                          selected
                                            ? 'font-bold'
                                            : 'font-semibold'
                                        }`}
                                      >
                                        {idx + 1}
                                      </span>
                                      {selected ? (
                                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                          <CheckIcon
                                            className='h-5 w-5'
                                            aria-hidden='true'
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                      <XCircleIcon
                        className='h-6 w-6 cursor-pointer text-gray-400'
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

export default ExerciseDialog

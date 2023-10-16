import { Fragment, useState } from 'react'

import {
  ChevronUpDownIcon,
  CheckIcon,
  XCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'

import { api } from '~/utils/api'

import { Dialog, Transition, Listbox, RadioGroup } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UseFormReturn, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Controller } from 'react-hook-form'
import LiftPicker from '~/pages/templates/liftPicker'

import { NumericFormat } from 'react-number-format'
import { Label } from '@/components/ui/label'

import { type Exercise } from '@prisma/client'

import { Prisma } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'
import { LoadingSpinner } from '../loading'

const exerciseWithSet = Prisma.validator<Prisma.ExerciseArgs>()({
  include: {
    set: true,
    ss: true,
  },
})

type ExerciseWithSet = Prisma.ExerciseGetPayload<typeof exerciseWithSet>

const plans = [
  {
    name: 'OneRM %',
    value: 'onerm',
  },
  {
    name: 'Percent',
    value: 'percent',
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
const ssPlans = [
  // {
  //   name: 'OneRM %',
  //   value: 'onerm',
  // },
  // {
  //   name: 'Percent',
  //   value: 'percent',
  // },
  {
    name: 'Weight',
    value: 'weight',
  },
  {
    name: 'RPE Target',
    value: 'rpe',
  },
]

const FormSS = ({
  ssIdx,
  onRemoveSS,
  formMethods,
  exercise,
}: {
  ssIdx: number
  onRemoveSS: (args0: number) => void
  formMethods: UseFormReturn
  exercise: ExerciseWithSet
}) => {
  const { register, control, watch, setValue } = formMethods

  const [testWeight, setTestWeight] = useState<number | null>(null)

  const weightType = watch(`exercise.ss.${ssIdx}.weightType`) as string
  const onermB = watch(`exercise.ss.${ssIdx}.onerm`) as number
  const onermT = watch(`exercise.ss.${ssIdx}.onermTop`) as number

  return (
    <div className='flex flex-col justify-center'>
      <div className='flex gap-4 text-lg'>
        {ssIdx + 1}
        <XMarkIcon
          className='h-6 w-6 cursor-pointer font-bold text-gray-400 hover:text-red-600'
          onClick={() => onRemoveSS(ssIdx)}
        />
      </div>
      <div className={`flex flex-col gap-4`}>
        <div className='grid grid-cols-2 gap-1 gap-x-4 md:grid-cols-5  md:gap-8'>
          <Input
            className='capitalize text-yellow-500'
            {...register(`exercise.ss.${ssIdx}.name`)}
            placeholder='name'
          />
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
              {...register(`exercise.ss.${ssIdx}.reps`, {
                valueAsNumber: true,
              })}
              placeholder='reps'
              defaultValue={1}
            />
          </div>
          <Input
            className=''
            {...register(`exercise.ss.${ssIdx}.repUnit`)}
            placeholder='rep unit'
          />
        </div>
        <div className='my-1 flex w-full flex-col items-center gap-2 md:gap-6 lg:flex-row'>
          <div className='flex items-center gap-4 md:gap-6'>
            <Controller
              control={control}
              name={`exercise.ss.${ssIdx}.weightType`}
              defaultValue={null}
              render={({ field: { onChange, value } }) => (
                <div className=''>
                  <RadioGroup
                    value={value as string}
                    onChange={onChange}
                  >
                    <div className='flex items-center justify-start gap-1 md:gap-2'>
                      {ssPlans.map((plan) => (
                        <RadioGroup.Option
                          key={plan.name}
                          value={plan.value}
                          className={({ checked }) => `${
                            checked
                              ? 'bg-gray-600 bg-opacity-75 text-gray-200'
                              : 'bg-black text-gray-400'
                          }
                          relative flex h-10 cursor-pointer rounded-lg px-2 shadow-md focus:outline-none md:px-6`}
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
                                          ? 'text-yellow-500'
                                          : 'text-gray-400 hover:scale-105 hover:text-gray-200'
                                      }`}
                                    >
                                      {plan.name}
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                                {checked && (
                                  <div className='ml-4 shrink-0 text-white'>
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
            <XCircleIcon
              className='h-6 w-6 cursor-pointer text-gray-400 hover:text-red-600'
              onClick={() => setValue(`exercise.ss.${ssIdx}.weightType`, '')}
            />
          </div>
          {weightType === 'onerm' && (
            <div className='flex flex-col gap-2'>
              <div className='flex gap-0 md:gap-10'>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(`exercise.ss.${ssIdx}.onerm`, {
                      valueAsNumber: true,
                    })}
                    placeholder='1rm percent'
                  />
                  <span className='absolute right-8 top-2 text-gray-400'>
                    %
                  </span>
                </div>
                <span className='flex shrink items-center'>-</span>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(`exercise.ss.${ssIdx}.onermTop`, {
                      valueAsNumber: true,
                    })}
                    placeholder='1rm percent top'
                  />
                  <span className='absolute right-8 top-2 text-gray-400'>
                    %
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <Input
                  type='number'
                  className='w-32'
                  value={testWeight || ''}
                  onChange={(e) => setTestWeight(e.target.valueAsNumber)}
                  placeholder='Test Weight'
                />
                {testWeight && (
                  <div className='flex gap-2 text-base'>
                    {onermB > 0 && (
                      <div>{`${(testWeight / 100) * onermB}`}kg</div>
                    )}
                    {onermT > 0 && (
                      <div>- {`${(testWeight / 100) * onermT}`}kg</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {weightType === 'percent' && (
            <div className='flex flex-col gap-2'>
              <div className='flex gap-0 md:gap-10'>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(`exercise.ss.${ssIdx}.onerm`, {
                      valueAsNumber: true,
                    })}
                    placeholder='percent'
                  />
                  <span className='absolute right-8 top-2 text-gray-400'>
                    %
                  </span>
                </div>
                <span className='flex shrink items-center'>-</span>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(`exercise.ss.${ssIdx}.onermTop`, {
                      valueAsNumber: true,
                    })}
                    placeholder='percent top'
                  />
                  <span className='absolute right-8 top-2 text-gray-400'>
                    %
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <Input
                  type='number'
                  className='w-32'
                  value={testWeight || ''}
                  onChange={(e) => setTestWeight(e.target.valueAsNumber)}
                  placeholder='Test Weight'
                />
                {testWeight && (
                  <div className='flex gap-2 text-base'>
                    {onermB > 0 && (
                      <div>{`${(testWeight / 100) * onermB}`}kg</div>
                    )}
                    {onermT > 0 && (
                      <div>- {`${(testWeight / 100) * onermT}`}kg</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {weightType === 'weight' && (
            <div className='flex gap-0 md:gap-10'>
              <div className='relative'>
                <Input
                  type='number'
                  {...register(`exercise.ss.${ssIdx}.weightBottom`, {
                    valueAsNumber: true,
                  })}
                  placeholder='weight bottom'
                />
                <span className='absolute right-8 top-2 text-gray-400'>kg</span>
              </div>

              <span className='flex shrink items-center'>-</span>
              <div className='relative'>
                <Input
                  type='number'
                  {...register(`exercise.ss.${ssIdx}.weightTop`, {
                    valueAsNumber: true,
                  })}
                  placeholder='weight top'
                />
                <span className='absolute right-8 top-2 text-gray-400'>kg</span>
              </div>
            </div>
          )}
          {weightType === 'rpe' && (
            <div className='grid grid-cols-2 gap-4 md:gap-10'>
              <Controller
                name={`exercise.ss.${ssIdx}.targetRpe`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <NumericFormat
                    className=' flex h-10 w-full border-b border-gray-600 bg-black px-3 py-2 text-sm text-gray-200 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                    value={value as number}
                    onChange={onChange}
                    placeholder='rpe target'
                  />
                )}
              />
            </div>
          )}
        </div>

        <Input
          type='text'
          defaultValue={''}
          {...register(`exercise.ss.${ssIdx}.notes`)}
          placeholder='notes'
        />
        <Input
          type='text'
          className='w-72'
          defaultValue={''}
          {...register(`exercise.ss.${ssIdx}.htmlLink`)}
          placeholder='link'
        />
      </div>
    </div>
  )
}

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
  console.log('programData', programData)

  const { data: exerciset, isLoading } = api.blocks.getExercise.useQuery({
    id: exerciseId,
  })
  const [testWeight, setTestWeight] = useState<number | null>(null)

  const { mutate: updateExercise } =
    api.userPrograms.updateExercise.useMutation({
      onSuccess: () => {
        toast.success('Saved')
        void ctx.blocks.getUserActiveProgramFull.invalidate({ userId: userId })
        void ctx.blocks.get.invalidate()
        closeModal()
      },
      onError: (e) => {
        console.log('error', e)
        toast.error('Error')
      },
    })

  const exercise = programData.week
    .find((week) =>
      week.day.find((day) =>
        day.exercise.find((exercise) => exercise.id === exerciseId),
      ),
    )
    ?.day.find((day) =>
      day.exercise.find((exercise) => exercise.id === exerciseId),
    )
    ?.exercise.find((exercise) => exercise.id === exerciseId) as ExerciseWithSet

    console.log('exercise', exercise)

  const formMethods = useForm({
    defaultValues: {
      exercise: {
        ss: exercise?.ss || [],
      },
    },
  })
  const { register, watch, control, handleSubmit, getValues, setValue } =
    formMethods

  const onSubmit = (i: Exercise) => {
    const input = i.exercise
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
      isSS: input.isSS,
      tempoDown: input.tempoDown ? +input.tempoDown : null,
      tempoPause: input.tempoPause ? +input.tempoPause : null,
      tempoUp: input.tempoUp ? +input.tempoUp : null,
      ss: input.isSS
        ? input.ss.map((s) => ({
            name: s.name,
            onerm: s.onerm ? +s.onerm : null,
            onermTop: s.onermTop ? +s.onermTop : null,
            weightTop: s.weightTop ? +s.weightTop : null,
            weightBottom: s.weightBottom ? +s.weightBottom : null,
            targetRpe: s.targetRpe ? +s.targetRpe : null,
            reps: s.reps ? +s.reps : null,
            weightType: s.weightType,
            repUnit: s.repUnit,
            notes: s.notes,
            htmlLink: s.htmlLink,
          }))
        : null,
    }
    updateExercise({ exercise: data })
  }

  const ssField = useFieldArray({
    control,
    name: `exercise.ss`,
  })

  const ssArray = getValues(`exercise.ss`)

  const onRemoveSS = (index: number) => {
    ssField.remove(index)
  }

  const onInsertSS = (index: number) => {
    ssField.insert(index + 1, {
      name: '',
      lift: 'unlinked',
      reps: 1,
      onerm: '',
      onermTop: '',
      weightTop: '',
      weightBottom: '',
      targetRpe: '',
      weightType: '',
      repUnit: '',
    })
  }

  const ss = watch(`exercise.ss`)

  const weightType = watch(`exercise.weightType`) as string
  console.log('weightType', weightType)
  const isSS = watch(`exercise.isSS`) as boolean
  const liftType = watch(`exercise.lift`) as string
  const name = watch(`exercise.name`) as string

  const onermB = watch(`exercise.onerm`) as number
  const onermT = watch(`exercise.onermTop`) as number

  console.log('exercise', exercise)
  if (!exercise) return null

  return (
    <>
      <Dialog.Title
        as='h3'
        className='flex items-center justify-between text-xl font-medium capitalize leading-6 text-yellow-500'
      >
        {exercise.name}
        <button
          onClick={() => closeModal()}
          className='p-0 text-gray-400 hover:text-white'
        >
          <XMarkIcon className='h-8 w-8' />
        </button>
      </Dialog.Title>
      <div className='my-4 flex justify-center'>
        <form
          // TODO: fix this
          // @ts-ignore TS2322
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col items-center justify-center '
        >
          <div className=''>
            <div className='mb-6 flex flex-col gap-8'>
              <div
                className={isSS === true ? 'text-gray-200' : 'text-gray-600'}
              >
                <Controller
                  control={control}
                  name={`exercise.isSS`}
                  defaultValue={exercise.ss && exercise.ss.length > 0}
                  render={({ field: { onChange, value } }) => (
                    <div className='absolute left-36 top-[29px] flex items-center gap-2'>
                      <Checkbox
                        id='isSS'
                        checked={value as boolean}
                        onCheckedChange={onChange}
                      />
                      <label
                        htmlFor='isSS'
                        className=' text-md pt-[2px]'
                      >
                        SuperSet
                      </label>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className='mb-6 flex flex-col gap-4'>
              {!isSS ? (
                <div className={`flex flex-col gap-4 ${isSS ? 'hidden' : ''}`}>
                  <div className='grid grid-cols-2 gap-1 gap-x-4 md:grid-cols-5  md:gap-8'>
                    <div className='flex flex-col justify-center'>
                      <Controller
                        control={control}
                        name={`exercise.lift`}
                        defaultValue={exercise.lift}
                        render={({ field: { onChange, value } }) => (
                          <LiftPicker
                            onChange={onChange}
                            value={value as string}
                          />
                        )}
                      />
                    </div>
                    <Input
                      className='capitalize text-yellow-500'
                      {...register(`exercise.name`)}
                      defaultValue={exercise.name}
                      placeholder='name'
                    />
                    <div className='col-span-2 flex items-center md:col-span-1'>
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
                        {...register(`exercise.sets`, { valueAsNumber: true })}
                        placeholder='sets'
                        defaultValue={exercise.sets}
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
                        {...register(`exercise.reps`, { valueAsNumber: true })}
                        placeholder='reps'
                        defaultValue={exercise.reps}
                      />
                    </div>
                    <Input
                      className=''
                      {...register(`exercise.repUnit`)}
                      placeholder='rep unit'
                      defaultValue={exercise.repUnit}
                    />
                  </div>
                  <div className='my-1 flex w-full flex-col items-center justify-between gap-2 md:gap-6 lg:flex-row'>
                    <div className='flex w-full items-center gap-4 md:gap-6'>
                      <Controller
                        control={control}
                        name={`exercise.weightType`}
                        defaultValue={exercise.weightType}
                        render={({ field: { onChange, value } }) => (
                          <div className=''>
                            <RadioGroup
                              value={value as string}
                              onChange={onChange}
                            >
                              <div className='flex items-center justify-start gap-1 py-6 md:gap-2'>
                                {plans.map((plan) => (
                                  <RadioGroup.Option
                                    key={plan.name}
                                    value={plan.value}
                                    className={({ checked }) => `${
                                      checked
                                        ? 'bg-gray-600 bg-opacity-75 text-gray-200'
                                        : 'bg-black text-gray-400'
                                    }
                                relative flex h-10 cursor-pointer rounded-lg px-2 shadow-md hover:scale-105 hover:text-gray-200 focus:outline-none md:px-6`}
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
                                                    ? 'text-yellow-500'
                                                    : 'text-gray-400 hover:text-gray-200'
                                                }`}
                                              >
                                                {plan.name}
                                              </RadioGroup.Label>
                                            </div>
                                          </div>
                                          {checked && (
                                            <div className='ml-4 shrink-0 text-white'>
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
                      <XCircleIcon
                        className='h-6 w-6 cursor-pointer text-gray-400 hover:text-red-600'
                        onClick={() => setValue(`exercise.weightType`, '')}
                      />
                    </div>
                    {weightType === 'onerm' && (
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-0 md:gap-10'>
                          <div className='relative'>
                            <Input
                              type='number'
                              {...register(`exercise.onerm`, {
                                valueAsNumber: true,
                              })}
                              defaultValue={exercise.onerm}
                              placeholder='1rm percent'
                            />
                            <span className='absolute right-8 top-2 text-gray-400'>
                              %
                            </span>
                          </div>
                          <span className='flex shrink items-center'>-</span>
                          <div className='relative'>
                            <Input
                              type='number'
                              {...register(`exercise.onermTop`, {
                                valueAsNumber: true,
                              })}
                              placeholder='1rm percent top'
                              defaultValue={exercise.onermTop}
                            />
                            <span className='absolute right-8 top-2 text-gray-400'>
                              %
                            </span>
                          </div>
                        </div>
                        <div className='flex items-center gap-4'>
                          <Input
                            type='number'
                            className='w-32'
                            value={testWeight || ''}
                            onChange={(e) =>
                              setTestWeight(e.target.valueAsNumber)
                            }
                            placeholder='Test Weight'
                          />
                          {testWeight && (
                            <div className='flex gap-2 text-base'>
                              {onermB > 0 && (
                                <div>
                                  {`${((testWeight / 100) * onermB).toFixed(
                                    1,
                                  )}`}
                                  kg
                                </div>
                              )}
                              {onermT > 0 && (
                                <div>
                                  -{' '}
                                  {`${((testWeight / 100) * onermT).toFixed(
                                    1,
                                  )}`}
                                  kg
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {weightType === 'percent' && (
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-0 md:gap-10'>
                          <div className='relative'>
                            <Input
                              type='number'
                              {...register(`exercise.onerm`, {
                                valueAsNumber: true,
                              })}
                              defaultValue={exercise.onerm}
                              placeholder='percent'
                            />
                            <span className='absolute right-8 top-2 text-gray-400'>
                              %
                            </span>
                          </div>
                          <span className='flex shrink items-center'>-</span>
                          <div className='relative'>
                            <Input
                              type='number'
                              {...register(`exercise.onermTop`, {
                                valueAsNumber: true,
                              })}
                              defaultValue={exercise.onermTop}
                              placeholder='percent top'
                            />
                            <span className='absolute right-8 top-2 text-gray-400'>
                              %
                            </span>
                          </div>
                        </div>
                        <div className='flex items-center gap-4'>
                          <Input
                            type='number'
                            className='w-32'
                            value={testWeight || ''}
                            onChange={(e) =>
                              setTestWeight(e.target.valueAsNumber)
                            }
                            placeholder='Test Weight'
                          />
                          {testWeight && (
                            <div className='flex gap-2 text-base'>
                              {onermB > 0 && (
                                <div>
                                  {`${((testWeight / 100) * onermB).toFixed(
                                    1,
                                  )}`}
                                  kg
                                </div>
                              )}
                              {onermT > 0 && (
                                <div>
                                  -{' '}
                                  {`${((testWeight / 100) * onermT).toFixed(
                                    1,
                                  )}`}
                                  kg
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {weightType === 'weight' && (
                      <div className='flex gap-0 md:gap-10'>
                        <div className='relative'>
                          <Input
                            type='number'
                            {...register(`exercise.weightBottom`, {
                              valueAsNumber: true,
                            })}
                            placeholder='weight bottom'
                            defaultValue={exercise.weightBottom}
                          />
                          <span className='absolute right-8 top-2 text-gray-400'>
                            kg
                          </span>
                        </div>

                        <span className='flex shrink items-center'>-</span>
                        <div className='relative'>
                          <Input
                            type='number'
                            {...register(`exercise.weightTop`, {
                              valueAsNumber: true,
                            })}
                            placeholder='weight top'
                            defaultValue={exercise.weightTop}
                          />
                          <span className='absolute right-8 top-2 text-gray-400'>
                            kg
                          </span>
                        </div>
                      </div>
                    )}
                    {weightType === 'rpe' && (
                      <div className='grid grid-cols-2 gap-4 md:gap-10'>
                        <Controller
                          name={`exercise.targetRpe`}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <NumericFormat
                              className=' flex h-10 w-full border-b border-gray-600 bg-black px-3 py-2 text-sm text-gray-200 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                              value={value as number}
                              onChange={onChange}
                              defaultValue={exercise.targetRpe}
                              placeholder='rpe target'
                            />
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className='mt-10 rounded-lg pb-6 shadow shadow-gray-800 lg:px-6 '>
                  <div className='col-span-2 mb-6 flex w-64 items-center md:col-span-1'>
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
                      {...register(`exercise.sets`, { valueAsNumber: true })}
                      placeholder='sets'
                      defaultValue={exercise.sets}
                    />
                  </div>
                  {ssArray?.map((_, idx) => (
                    <div key={idx}>
                      <FormSS
                        exercise={exercise}
                        ssIdx={idx}
                        onRemoveSS={onRemoveSS}
                        formMethods={formMethods}
                      />
                      <PlusIcon
                        className='mx-auto mt-8 h-6 w-6 text-gray-400 hover:scale-125 hover:text-gray-200'
                        onClick={() => onInsertSS(idx)}
                      />
                    </div>
                  ))}
                  <div className='flex  w-full justify-center'>
                    <Button
                      type='button'
                      className={`border-0 text-gray-200 ${
                        ssArray?.length === 0 ? '' : 'hidden'
                      }`}
                      onClick={() => ssField.append({})}
                    >
                      <PlusIcon className={`h-6 w-6 hover:scale-110`} />
                    </Button>
                  </div>
                </div>
              )}
              <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
                <div className='pr-4 text-lg'>Tempo</div>
                <div className='flex flex-row justify-between lg:items-center lg:gap-4'>
                  <Input
                    type='number'
                    {...register(`exercise.tempoDown`, { valueAsNumber: true })}
                    placeholder='Down Count'
                    className='w-24 px-1 lg:w-32'
                    defaultValue={exercise.tempoDown || undefined}
                  />
                  <Input
                    type='number'
                    {...register(`exercise.tempoPause`, {
                      valueAsNumber: true,
                    })}
                    placeholder='Pause'
                    className='w-24 lg:w-32'
                    defaultValue={exercise.tempoPause || undefined}
                  />
                  <Input
                    type='number'
                    {...register(`exercise.tempoUp`, { valueAsNumber: true })}
                    placeholder='Up Count'
                    className='w-24 lg:w-32'
                    defaultValue={exercise.tempoUp || undefined}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-between gap-4 md:flex-row md:gap-10'>
                <Input
                  type='text'
                  {...register(`exercise.notes`)}
                  placeholder='notes'
                  defaultValue={exercise.notes || ''}
                />

                <Controller
                  control={control}
                  name={`exercise.estimatedOnermIndex`}
                  defaultValue={exercise.estimatedOnermIndex}
                  render={({ field: { onChange, value } }) => (
                    <div className='flex items-center gap-2'>
                      <Listbox
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
                              {[1, 2, 3, 4, 5, 6]?.fields?.map((_, idx) => (
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
                className='w-72'
                {...register(`exercise.htmlLink`)}
                placeholder='link'
                defaultValue={exercise.htmlLink || ''}
              />
            </div>
            <Button type='submit'>Update</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ExerciseDialog

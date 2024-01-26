import { useFormContext, Controller, useFieldArray } from 'react-hook-form'

import { Fragment, useEffect, useState } from 'react'

import LiftPicker from './liftPicker'
import { Input } from '@/components/ui/input'

import { Listbox, Transition, RadioGroup } from '@headlessui/react'
import { type SS } from '~/store/types'
import {
  ChevronUpDownIcon,
  CheckIcon,
  XCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { NumericFormat } from 'react-number-format'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@heroicons/react/20/solid'

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
  weekIdx,
  dayIdx,
  exerciseIdx,
  ssIdx,
  onRemoveSS,
}: {
  weekIdx: number
  dayIdx: number
  exerciseIdx: number
  ssIdx: number
  onRemoveSS: (args0: number) => void
}) => {
  const formMethods = useFormContext()
  const { register, control, watch, setValue, getValues } = formMethods

  const ssField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss`,
  })

  const [testWeight, setTestWeight] = useState<number | null>(null)

  const weightType = watch(
    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.weightType`,
  ) as string
  const onermB = watch(
    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.onerm`,
  ) as number
  const onermT = watch(
    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.onermTop`,
  ) as number

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
            {...register(
              `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.name`,
            )}
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
              {...register(
                `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.reps`,
                { valueAsNumber: true },
              )}
              placeholder='reps'
              defaultValue={1}
            />
          </div>
          <Input
            className=''
            {...register(
              `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.repUnit`,
            )}
            placeholder='rep unit'
          />
        </div>
        <div className='my-1 flex w-full flex-col items-center gap-2 md:gap-6 lg:flex-row'>
          <div className='flex items-center gap-4 md:gap-6'>
            <Controller
              control={control}
              name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.weightType`}
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
              onClick={() =>
                setValue(
                  `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.weightType`,
                  '',
                )
              }
            />
          </div>
          {weightType === 'onerm' && (
            <div className='flex flex-col gap-2'>
              <div className='flex gap-0 md:gap-10'>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(
                      `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.onerm`,
                      { valueAsNumber: true },
                    )}
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
                    {...register(
                      `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.onermTop`,
                      { valueAsNumber: true },
                    )}
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
                    {...register(
                      `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.onerm`,
                      { valueAsNumber: true },
                    )}
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
                    {...register(
                      `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.onermTop`,
                      { valueAsNumber: true },
                    )}
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
                  {...register(
                    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.weightBottom`,
                    { valueAsNumber: true },
                  )}
                  placeholder='weight bottom'
                />
                <span className='absolute right-8 top-2 text-gray-400'>kg</span>
              </div>

              <span className='flex shrink items-center'>-</span>
              <div className='relative'>
                <Input
                  type='number'
                  {...register(
                    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.weightTop`,
                    { valueAsNumber: true },
                  )}
                  placeholder='weight top'
                />
                <span className='absolute right-8 top-2 text-gray-400'>kg</span>
              </div>
            </div>
          )}
          {weightType === 'rpe' && (
            <div className='grid grid-cols-2 gap-4 md:gap-10'>
              <Controller
                name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.targetRpe`}
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
          {...register(
            `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.notes`,
          )}
          placeholder='notes'
        />
        <Input
          type='text'
          className='w-72'
          defaultValue={''}
          {...register(
            `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss.${ssIdx}.htmlLink`,
          )}
          placeholder='link'
        />
      </div>
    </div>
  )
}

const FormExerciseDialog = ({
  weekIdx,
  dayIdx,
  exerciseIdx,
  setIsOpen,
  onRemoveExercise,
}: {
  weekIdx: number
  dayIdx: number
  exerciseIdx: number
  setIsOpen: (args0: boolean) => void
  onRemoveExercise: (args0: number) => void
}) => {
  const formMethods = useFormContext()
  const { register, control, watch, setValue, getValues } = formMethods

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  const ssField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss`,
  })

  const ssArray = getValues(
    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.ss`,
  ) as SS[]

  const onRemoveSS = (index: number) => {
    ssField.remove(index)
  }

  const onInsertSS = (index: number) => {
    ssField.insert(index + 1, {
      name: '',
      lift: 'unlinked',
      reps: '',
      onerm: '',
      onermTop: '',
      weightTop: '',
      weightBottom: '',
      targetRpe: '',
      weightType: '',
      repUnit: '',
      notes: '',
      htmlLink: '',
    })
  }

  const [testWeight, setTestWeight] = useState<number | null>(null)

  const weightType = watch(
    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightType`,
  ) as string
  const liftType = watch(
    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.lift`,
  ) as string
  const name = watch(
    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`,
  ) as string

  const onermB = watch(
    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`,
  ) as number
  const onermT = watch(
    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onermTop`,
  ) as number

  const isSS = watch(
    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.isSS`,
  ) as boolean

  useEffect(() => {
    if (liftType != 'unlinked' && liftType !== '' && name == '')
      formMethods.setValue(
        `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`,
        liftType?.slice(0, 1).toUpperCase() + liftType?.slice(1) || '',
      )
  }, [liftType])

  return (
    <div className='flex flex-col justify-center p-4'>
      <div className='relative flex items-center justify-between gap-4'>
        <div className='p-1 px-4 text-xl font-extrabold italic tracking-widest underline decoration-yellow-500 decoration-2 underline-offset-8'>
          &nbsp;{exerciseIdx + 1}&nbsp;
        </div>
        <Controller
          control={control}
          name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.isSS`}
          defaultValue={Array.isArray(ssArray) && ssArray.length > 0}
          render={({ field: { onChange, value } }) => (
            <div className='absolute left-16 top-2 flex items-baseline gap-2'>
              <Checkbox
                id='isSS'
                checked={value as boolean}
                onCheckedChange={onChange}
              />
              <Label
                htmlFor='isSS'
                className=' text-lg'
              >
                SuperSet
              </Label>
            </div>
          )}
        />
      </div>
      <div className='flex flex-col gap-4'>
        {!isSS ? (
          <div className={`flex flex-col gap-4 ${isSS ? 'hidden' : ''}`}>
            <div className='grid grid-cols-2 gap-1 gap-x-4 md:grid-cols-5  md:gap-8'>
              <div className='flex flex-col justify-center'>
                <Controller
                  control={control}
                  name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.lift`}
                  defaultValue='unlinked'
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
                {...register(
                  `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`,
                )}
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
                  {...register(
                    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.sets`,
                    { valueAsNumber: true },
                  )}
                  placeholder='sets'
                  defaultValue={1}
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
                  {...register(
                    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.reps`,
                    { valueAsNumber: true },
                  )}
                  placeholder='reps'
                  defaultValue={1}
                />
              </div>
              <Input
                className=''
                {...register(
                  `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.repUnit`,
                )}
                placeholder='rep unit'
              />
            </div>
            <div className='my-1 flex w-full flex-col items-center justify-between gap-2 md:gap-6 lg:flex-row'>
              <div className='flex w-full flex-col items-center gap-4 md:gap-6 lg:flex-row'>
                <Controller
                  control={control}
                  name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightType`}
                  defaultValue={null}
                  render={({ field: { onChange, value } }) => (
                    <div className=''>
                      <RadioGroup
                        value={value as string}
                        onChange={onChange}
                      >
                        <div className='grid grid-cols-4 items-center justify-start gap-1 py-6 md:gap-2'>
                          {plans.map((plan) => (
                            <RadioGroup.Option
                              key={plan.name}
                              value={plan.value}
                              className={({ checked }) => `${
                                checked
                                  ? 'bg-gray-600 bg-opacity-75 text-gray-200'
                                  : 'bg-black text-gray-400'
                              }
                                relative flex flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg px-2 py-1 shadow-md hover:text-gray-200 focus:outline-none md:px-6 lg:flex-row lg:justify-between lg:py-4`}
                            >
                              {({ checked }) => (
                                <>
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
                                    <div className='ml-4 hidden shrink-0 text-white md:block'>
                                      <CheckCircleIcon className='h-6 w-6' />
                                    </div>
                                  )}
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
                  onClick={() =>
                    setValue(
                      `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightType`,
                      '',
                    )
                  }
                />
              </div>
              {weightType === 'onerm' && (
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-0 md:gap-10'>
                    <div className='relative'>
                      <Input
                        type='number'
                        {...register(
                          `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`,
                          { valueAsNumber: true },
                        )}
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
                        {...register(
                          `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onermTop`,
                          { valueAsNumber: true },
                        )}
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
                          <div>
                            {`${((testWeight / 100) * onermB).toFixed(1)}`}kg
                          </div>
                        )}
                        {onermT > 0 && (
                          <div>
                            - {`${((testWeight / 100) * onermT).toFixed(1)}`}kg
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
                        {...register(
                          `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`,
                          { valueAsNumber: true },
                        )}
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
                        {...register(
                          `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onermTop`,
                          { valueAsNumber: true },
                        )}
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
                          <div>
                            {`${((testWeight / 100) * onermB).toFixed(1)}`}kg
                          </div>
                        )}
                        {onermT > 0 && (
                          <div>
                            - {`${((testWeight / 100) * onermT).toFixed(1)}`}kg
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
                      {...register(
                        `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightBottom`,
                        { valueAsNumber: true },
                      )}
                      placeholder='weight bottom'
                    />
                    <span className='absolute right-8 top-2 text-gray-400'>
                      kg
                    </span>
                  </div>

                  <span className='flex shrink items-center'>-</span>
                  <div className='relative'>
                    <Input
                      type='number'
                      {...register(
                        `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightTop`,
                        { valueAsNumber: true },
                      )}
                      placeholder='weight top'
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
                    name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.targetRpe`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <NumericFormat
                        className=' flex h-10 w-full border-b border-gray-600 bg-black px-3 py-2 text-sm text-gray-200 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                        value={value}
                        onChange={onChange}
                        placeholder='rpe target'
                      />
                    )}
                  />
                </div>
              )}
            </div>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-center'>
              <div className='pr-4 text-lg'>Tempo</div>
              <div className='flex flex-row justify-between lg:items-center lg:gap-4'>
                <Input
                  type='number'
                  {...register(
                    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.tempoDown`,
                    { valueAsNumber: true },
                  )}
                  placeholder='Down Count'
                  className='w-24 px-1 lg:w-32'
                />
                <Input
                  type='number'
                  {...register(
                    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.tempoPause`,
                    { valueAsNumber: true },
                  )}
                  placeholder='Pause'
                  className='w-24 lg:w-32'
                />
                <Input
                  type='number'
                  {...register(
                    `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.tempoUp`,
                    { valueAsNumber: true },
                  )}
                  placeholder='Up Count'
                  className='w-24 lg:w-32'
                />
              </div>
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
                {...register(
                  `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.sets`,
                  { valueAsNumber: true },
                )}
                placeholder='sets'
                defaultValue={1}
              />
            </div>
            {ssArray?.map((_, idx) => (
              <div key={idx}>
                <FormSS
                  weekIdx={weekIdx}
                  dayIdx={dayIdx}
                  exerciseIdx={exerciseIdx}
                  ssIdx={idx}
                  onRemoveSS={onRemoveSS}
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
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row md:gap-10'>
          <Input
            type='text'
            {...register(
              `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.notes`,
            )}
            placeholder='notes'
          />

          <Controller
            control={control}
            name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.estimatedOnermIndex`}
            defaultValue={null}
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
                        {exerciseField?.fields?.map((_, idx) => (
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
                                    selected ? 'font-bold' : 'font-semibold'
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
          {...register(
            `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.htmlLink`,
          )}
          placeholder='link'
        />
      </div>
      <div className='w-full flex justify-center'>
        <Button
          type='button'
          size='lg'
          variant='secondary'
          className='center mt-8 w-36'
          onClick={() => setIsOpen(false)}
        >
          Done
        </Button>
      </div>
    </div>
  )
}

export default FormExerciseDialog

import { useFormContext, Controller, useFieldArray } from 'react-hook-form'

import { useState } from 'react'

import { Input } from '@/components/ui/input'

import { RadioGroup } from '@headlessui/react'
import {
  XCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { NumericFormat } from 'react-number-format'
import { Label } from '@/components/ui/label'

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

export default FormSS

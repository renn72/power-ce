import {
  useFormContext, Controller, useFieldArray,
} from 'react-hook-form'

import {
  Fragment, useEffect,
} from 'react'

import LiftPicker from './liftPicker'
import { Input, } from '@/components/ui/input'

import {
  Listbox, Transition, RadioGroup,
} from '@headlessui/react'

import {
  ChevronUpDownIcon, CheckIcon, XCircleIcon, CheckCircleIcon, XMarkIcon,
} from '@heroicons/react/24/outline'

import { NumericFormat, } from 'react-number-format'
import { Label, } from '@/components/ui/label'

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

const FormExercise = ({
  weekIdx, dayIdx, exerciseIdx, onRemoveExercise
}:
  { weekIdx: number, dayIdx: number, exerciseIdx: number, onRemoveExercise : (args0 : number)  => void }) => {
  const formMethods = useFormContext()
  const {
    register, control, watch, setValue,
  } = formMethods

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  const weightType = watch(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightType`) as string
  const liftType = watch(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.lift`) as string
  const name = watch(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`) as string

  useEffect(() => {
    if (liftType != 'unlinked' && liftType !== '' && name == '') formMethods.setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`, (liftType?.slice(0, 1).toUpperCase() + liftType?.slice(1)) || '')

  }, [liftType,])

  return (

    <div className='flex flex-col justify-center'>
      <div className='flex justify-between items-center gap-4'>
        <div
          className='text-xl p-1 font-extrabold italic underline decoration-yellow-500 tracking-widest decoration-2 underline-offset-8 px-4'
        >
          &nbsp;{exerciseIdx + 1}&nbsp;
        </div>
        <XMarkIcon
          className='h-9 w-9 font-bold text-gray-400 cursor-pointer hover:text-red-600'
          onClick={() => onRemoveExercise(exerciseIdx)}
        />
      </div>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-1 gap-x-4  md:gap-8'>
          <div className='flex flex-col justify-center'>
            <Controller
              control={control}
              name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.lift`}
              defaultValue='unlinked'
              render={({
                field: {
                  onChange, value,
                },
              }) => (<LiftPicker onChange={onChange} value={value} />)}
            />
          </div>
          <Input
            className='text-yellow-500'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`,)}
            placeholder='name'
          />
          <div className='flex items-center col-span-2 md:col-span-1'>
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
              {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.sets`, { valueAsNumber: true, })}
              placeholder='sets'
              defaultValue={1}
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
              {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.reps`, { valueAsNumber: true, })}
              placeholder='reps'
              defaultValue={1}
            />
          </div>
          <Input
            className=''
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.repUnit`,)}
            placeholder='rep unit'
          />
        </div>
        <div className='my-1 flex flex-col lg:flex-row gap-2 md:gap-6 items-center justify-between w-full'>
          <div className='flex gap-4 md:gap-6 items-center w-full'>
            <Controller
              control={control}
              name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightType`}
              defaultValue={null}
              render={({
                field: {
                  onChange, value,
                },
              }) => (
                  <div className=''>
                    <RadioGroup value={value} onChange={onChange}>
                      <div className='flex items-center justify-start gap-1 md:gap-2'>
                        {plans.map((plan) => (
                          <RadioGroup.Option
                            key={plan.name}
                            value={plan.value}
                            className={({
                              active, checked,
                            }) => `${checked ? 'bg-gray-600 bg-opacity-75 text-gray-200' : 'bg-black text-gray-400'}
                                                relative flex cursor-pointer rounded-lg px-2 md:px-6 shadow-md focus:outline-none h-10`
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
                                          className={`font-medium  ${checked ? 'text-yellow-500' : 'text-gray-400'}`}
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
              className='h-6 w-6 text-gray-400 cursor-pointer hover:text-red-600'
              onClick={() => setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightType`, '')}
            />
          </div>
          {weightType === 'onerm'
            && (
              <div className='flex gap-0 md:gap-10'>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`, { valueAsNumber: true, })}
                    placeholder='1rm percent'
                  />
                  <span className='absolute top-2 right-8 text-gray-400'>%</span>
                </div>
                <span className='shrink flex items-center'>-</span>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onermTop`, { valueAsNumber: true, })}
                    placeholder='1rm percent top'
                  />
                  <span className='absolute top-2 right-8 text-gray-400'>%</span>
                </div>
              </div>
            )}
          {weightType === 'percent'
            && (
              <div className='flex gap-0 md:gap-10'>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`, { valueAsNumber: true, })}
                    placeholder='percent'
                  />
                  <span className='absolute top-2 right-8 text-gray-400'>%</span>
                </div>
                <span className='shrink flex items-center'>-</span>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onermTop`, { valueAsNumber: true, })}
                    placeholder='percent top'
                  />
                  <span className='absolute top-2 right-8 text-gray-400'>%</span>
                </div>
              </div>
            )}
          {weightType === 'weight'
            && (

              <div className='flex gap-0 md:gap-10'>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightBottom`, { valueAsNumber: true, })}
                    placeholder='weight bottom'
                  />
                  <span className='absolute top-2 right-8 text-gray-400'>kg</span>
                </div>

                <span className='shrink flex items-center'>-</span>
                <div className='relative'>
                  <Input
                    type='number'
                    {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightTop`, { valueAsNumber: true, })}
                    placeholder='weight top'
                  />
                  <span className='absolute top-2 right-8 text-gray-400'>kg</span>
                </div>
              </div>
            )
          }
          {
            weightType === 'rpe'
            && (

              <div className='grid grid-cols-2 gap-4 md:gap-10'>
                <Controller
                  name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.targetRpe`}
                  control={control}
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
        <div className='flex flex-col md:flex-row gap-4 md:gap-10 items-center justify-between'>
          <Input
            type='text'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.notes`)}
            placeholder='notes'
          />

          <Controller
            control={control}
            name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.estimatedOnermIndex`}
            defaultValue={null}
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
                        {exerciseField?.fields?.map((_, idx) => (
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
          className='w-72'
          {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.htmlLink`)}
          placeholder='link'
        />
      </div>
    </div>
  )
}

export default FormExercise

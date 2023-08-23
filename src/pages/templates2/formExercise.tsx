import {
  useFormContext, Controller, useFieldArray,
} from 'react-hook-form'

import { Fragment, } from 'react'

import { useAtom, } from 'jotai'
import { useUser, } from '@clerk/nextjs'
import { api, } from '~/utils/api'

import LiftPicker from './liftPicker'
import {
  Input, InputNumber,
} from '@/components/ui/input'

import {
  Listbox, Transition, RadioGroup,
} from '@headlessui/react'

import {
  squatAtom, deadliftAtom, benchAtom,
} from '~/store/store'

import {
  ChevronUpDownIcon, CheckIcon, XCircleIcon, CheckCircleIcon,
} from '@heroicons/react/24/outline'

import getWeight from '~/utils/getWeight'

import { type Block, } from '~/store/types'
import { Checkbox, } from '@/components/ui/checkbox'

import { NumericFormat, } from 'react-number-format'

const GetWeight = ({
  week, day, exercise, lifts,
}: { week: number, day: number, exercise: number, lifts: { lift: string, weight: string }[] }) => {
  const formMethods = useFormContext<Block>()

  const watch = formMethods.watch([
    `week.${week}.day.${day}.exercise.${exercise}.onerm`,
    `week.${week}.day.${day}.exercise.${exercise}.lift`,
    `week.${week}.day.${day}.exercise.${exercise}.onermTop`,
  ])



  const weight = lifts?.filter((lift) => lift.lift === watch[1])[0]?.weight

  if (!weight) return null
  if (!watch[0]) return null

  const res = getWeight(+watch[0], +weight)

  if (!watch[2]) return (<div>{res}kg</div>) 

  const res2 = getWeight(+watch[2], +weight)

  return (
    <div>
      {res}kg - {res2}kg
    </div>
  )

}

const plans = [
  {
    name: 'OneRM Percent',
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

const FormExercise = ({
  weekIdx, dayIdx, exerciseIdx,
}:
  { weekIdx: number, dayIdx: number, exerciseIdx: number }) => {
  const formMethods = useFormContext()
  const {
    register, control, getValues, watch,
  } = formMethods

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  const { user, } = useUser()

  const { data: userCoreOneRM, } = api.oneRepMax.getUserCoreLifts.useQuery({ userId: user?.id || '', })
  const userLifts = userCoreOneRM?.map((lift) => {
    return {
      lift: lift.lift, weight: lift.weight,
    }
  })

  const weightType = watch(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightType`)

  const w = watch(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.targetRpe`)

  return (

    <div className='flex flex-col justify-center'>
      <div
        className='text-lg p-1 font-bold'
      >
        {exerciseIdx + 1}
      </div>
      <li className='flex flex-col gap-2'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10'>
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
            className='focus:border-white'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`,)}
            placeholder='name'
          />
          <Input
            type='number'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.sets`, { valueAsNumber: true, })}
            placeholder='sets'
          />
          <Input
            type='number'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.reps`, { valueAsNumber: true, })}
            placeholder='reps'
          />
        </div>
        <div className='my-1'>
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
                  <RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
                  <div className='flex items-center justify-start gap-4 md:gap-10'>
                    {plans.map((plan) => (
                      <RadioGroup.Option
                        key={plan.name}
                        value={plan.value}
                        className={({
                          active, checked,
                        }) => `${checked ? 'bg-gray-600 bg-opacity-75 text-gray-200' : 'bg-gray-800 text-gray-400'}
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
        </div>
        {weightType === 'onerm'
          && (
            <div className='grid grid-cols-4 gap-4 md:gap-10'>
              <Input
                type='number'
                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`, { valueAsNumber: true, })}
                placeholder='1rm percent'
              />
              <Input
                type='number'
                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onermTop`, { valueAsNumber: true, })}
                placeholder='1rm percent top'
              />
              <div className='text-sm flex flex-col items-center justify-center'>
                <GetWeight
                  week={weekIdx}
                  day={dayIdx}
                  exercise={exerciseIdx}
                  lifts={userLifts}
                />
              </div>
            </div>
          )}
        {weightType === 'weight'
          && (

            <div className='grid grid-cols-4 gap-4 md:gap-10'>
              <Input
                type='number'
                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightBottom`, { valueAsNumber: true, })}
                placeholder='weight bottom'
              />
              <Input
                type='number'
                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightTop`, { valueAsNumber: true, })}
                placeholder='weight top'
              />
            </div>
          )
        }
        {
          weightType === 'rpe'
          && (

            <div className='grid grid-cols-4 gap-4 md:gap-10'>
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
        <div className='flex gap-4 md:gap-10 items-center justify-between'>
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
                  <div className='relative text-xs sm:text-sm w-24 h-10'>
                    <Listbox.Button className='relative h-full w-full border border-gray-600 cursor-default rounded-lg py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300'>
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
                      <Listbox.Options className='absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 border border-gray-600 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
      </li>
    </div>
  )
}

export default FormExercise
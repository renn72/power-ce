import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
} from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover as PopoverCN,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, add } from 'date-fns'

import { api } from '~/utils/api'

import { toast } from 'react-hot-toast'

import { useUser, clerkClient } from '@clerk/nextjs'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { Fragment, useEffect, useState } from 'react'

import { Listbox, Transition, Popover } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { Label } from '@/components/ui/label'

type SettingsForm = {
  height: number
  DOB: string
  weight: number
  targetWeight: number
  weightGoal: string
  activityLevelTraining: string
  activityLevelRest: string
  goal: string
  benchOneRepMax: number
  deadliftOneRepMax: number
  squatOneRepMax: number
}

const Settings = () => {
  const { user } = useUser()

  const formMethods = useForm()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods

  const { mutate: updateSettings } =
    api.settings.createUpdateSettings.useMutation({
      onSuccess: () => {
        toast.success('Settings updated')
      },
    })

  const onSubmit = (data: SettingsForm) => {
    console.log(data)
    if (!user) return
    updateSettings({
      userId: user.id,
      DOB: data.DOB || '',
      height: data.height,
      weight: data.weight,
      targetWeight: data.targetWeight,
      weightGoal: data.weightGoal,
      activityLevelTraining: data.activityLevelTraining,
      activityLevelRest: data.activityLevelRest,
      benchOneRepMax: data.benchOneRepMax,
      deadliftOneRepMax: data.deadliftOneRepMax,
      squatOneRepMax: data.squatOneRepMax,
    })
  }
  const onError = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <div className='flex flex-col gap-4 px-4 py-2'>
        <div className='flex flex-col gap-1'>
          <Input
            type='number'
            placeholder='Height'
            {...register('height', { valueAsNumber: true })}
          />
          <div className='flex flex-col gap-4'>
            <Input
              type='number'
              placeholder='Weight'
              {...register('weight', { valueAsNumber: true })}
            />
            <Input
              type='number'
              placeholder='Weight Target'
              {...register('weight', { valueAsNumber: true })}
            />
          </div>
          <Controller
            name='weightGoal'
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <Listbox
                value={value as string}
                onChange={onChange}
              >
                <div className='z-1 relative'>
                  <Listbox.Button className='relative h-10 w-full cursor-default border-b border-gray-600 pl-3 pr-10 text-left shadow-md hover:border-white focus:outline-none md:w-[230px] md:px-2 '>
                    <span
                      className={`block truncate ${
                        value === '' ? 'text-sm text-gray-500' : ''
                      }`}
                    >
                      {value === '' ? 'Weight Goal' : value}
                    </span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                      <ChevronUpDownIcon
                        className='h-5 w-5'
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
                    <Listbox.Options className='max-h-120 absolute z-10 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 shadow-lg '>
                      {['weight loss', 'maintenence', 'weight gain'].map(
                        (t, Idx) => (
                          <Listbox.Option
                            key={Idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-8 pr-4 ${
                                active
                                  ? 'bg-yellow-400 text-black'
                                  : 'text-gray-200'
                              }`
                            }
                            value={t}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate`}>{t}</span>
                                {selected ? (
                                  <span className='absolute inset-y-0 left-0 flex items-center pl-1'>
                                    <CheckIcon
                                      className='h-5 w-5'
                                      aria-hidden='true'
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ),
                      )}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            )}
          />
          <Controller
            control={control}
            name='dob'
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
              <div className='flex items-end justify-between gap-2 md:justify-normal md:gap-6'>
                <PopoverCN>
                  <PopoverTrigger asChild>
                    <Button
                      className={cn(
                        'col-span-2 w-[190px] justify-start rounded-none border-0 border-b border-gray-600 px-1 text-left text-gray-200 hover:border-gray-200 md:w-[230px] md:px-2 ',
                        !value && 'text-gray-600',
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {value ? format(value, 'PPP') : <span>DOB</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='z-10 w-auto bg-black py-3 text-gray-200 md:px-3'>
                    <Calendar
                      mode='single'
                      selected={value}
                      onSelect={(e) => {
                        onChange(e)
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </PopoverCN>
              </div>
            )}
          />
          <h2>Activity Level</h2>
          <div className='relative flex items-center gap-2'>
            <Label className='w-16'>Training</Label>
            <Controller
              name='activityLevelTraining'
              control={control}
              defaultValue={''}
              render={({ field: { onChange, value } }) => (
                <Listbox
                  value={value as string}
                  onChange={onChange}
                >
                  <div className='z-1 relative'>
                    <Listbox.Button className='relative h-10 w-60 cursor-default border-b border-gray-600 pl-3 pr-10 text-left shadow-md hover:border-white focus:outline-none md:w-60 '>
                      <span className='block truncate'>{value}</span>
                      <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                        <ChevronUpDownIcon
                          className='h-5 w-5'
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
                      <Listbox.Options className='max-h-120 absolute z-10 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 shadow-lg '>
                        {[
                          'sedentary',
                          'mild',
                          'moderate',
                          'heavy',
                          'extreme',
                        ].map((t, Idx) => (
                          <Listbox.Option
                            key={Idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-8 pr-4 ${
                                active
                                  ? 'bg-yellow-400 text-black'
                                  : 'text-gray-200'
                              }`
                            }
                            value={t}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate`}>{t}</span>
                                {selected ? (
                                  <span className='absolute inset-y-0 left-0 flex items-center pl-1'>
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
              )}
            />
            <Popover className=''>
              {({ open }) => (
                <>
                  <Popover.Button>
                    <QuestionMarkCircleIcon className='h-5 w-5 text-gray-400' />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute left-0 z-10 w-[90vw] max-w-sm px-4 sm:px-0'>
                      <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                        <div className='bg-gray-900 p-4 text-lg'>
                          <ul>
                            <li>
                              <span className='font-semibold'>Sedentary </span>-
                              no exercise
                            </li>
                            <li>
                              <span className='font-semibold'>Mild </span>-
                              20min
                            </li>
                            <li>
                              <span className='font-semibold'>Moderate </span>-
                              30-60min
                            </li>
                            <li>
                              <span className='font-semibold'>Heavy </span>-
                              greater than 60min
                            </li>
                            <li>
                              <span className='font-semibold'>Extreme</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
          <div className='flex items-center gap-2'>
            <Label className='w-16'>Rest</Label>
            <Controller
              name='activityLevelRest'
              control={control}
              defaultValue={''}
              render={({ field: { onChange, value } }) => (
                <Listbox
                  value={value as string}
                  onChange={onChange}
                >
                  <div className='z-1 relative'>
                    <Listbox.Button className='relative h-10 w-60 cursor-default border-b border-gray-600 pl-3 pr-10 text-left shadow-md hover:border-white focus:outline-none md:w-60 '>
                      <span className='block truncate'>{value}</span>
                      <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                        <ChevronUpDownIcon
                          className='h-5 w-5'
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
                      <Listbox.Options className='max-h-120 absolute z-10 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 shadow-lg '>
                        {[
                          'sedentary',
                          'mild',
                          'moderate',
                          'heavy',
                          'extreme',
                        ].map((t, Idx) => (
                          <Listbox.Option
                            key={Idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-8 pr-4 ${
                                active
                                  ? 'bg-yellow-400 text-black'
                                  : 'text-gray-200'
                              }`
                            }
                            value={t}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate`}>{t}</span>
                                {selected ? (
                                  <span className='absolute inset-y-0 left-0 flex items-center pl-1'>
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
              )}
            />
            <Popover className=''>
              {({ open }) => (
                <>
                  <Popover.Button>
                    <QuestionMarkCircleIcon className='h-5 w-5 text-gray-400' />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute left-0 z-10 w-[90vw] max-w-sm px-4 sm:px-0'>
                      <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                        <div className='bg-gray-900 p-4'>
                          <ul>
                            <li>
                              <span className='font-semibold'>Sedentary </span>-
                              no exercise
                            </li>
                            <li>
                              <span className='font-semibold'>Mild </span>-
                              20min
                            </li>
                            <li>
                              <span className='font-semibold'>Moderate </span>-
                              30-60min
                            </li>
                            <li>
                              <span className='font-semibold'>Heavy </span>-
                              greater than 60min
                            </li>
                            <li>
                              <span className='font-semibold'>Extreme</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
          <Input
            type='text'
            {...register('goal')}
            defaultValue={''}
            placeholder='Goal'
          />
          <Input
            type='number'
            {...register('benchOneRepMax', { valueAsNumber: true })}
            placeholder='Bench 1RM'
          />
          <Input
            type='number'
            {...register('deadliftOneRepMax', { valueAsNumber: true })}
            placeholder='Deadlift 1RM'
          />
          <Input
            type='number'
            {...register('squatOneRepMax', { valueAsNumber: true })}
            placeholder='Squat 1RM'
          />

          <Input
            type='text'
            {...register('openAddress')}
            defaultValue={''}
            placeholder='Open Powerlifting Address'
          />
          <Input
            type='text'
            {...register('instagram')}
            defaultValue={''}
            placeholder='Instagram'
          />
          <div className='flex justify-center'>
            <Button
              type='submit'
              className='w-40 bg-yellow-400 text-center font-bold text-gray-900 hover:bg-yellow-500'
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Settings

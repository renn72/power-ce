import React, {
  useState, useEffect,
} from 'react'
import {
  useForm, FormProvider, useFieldArray, useFormContext,
} from 'react-hook-form'
import { ErrorMessage, } from '@hookform/error-message'
import {
  useAtom, atom,
} from 'jotai'

import {
  PlusCircleIcon,
  MinusCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline'
import { toast, } from 'react-hot-toast'

import { api, } from '~/utils/api'
import { getRandomInt, } from '~/utils/utils'

import BlockTable from './blockTable'
import TemplateSelect from './templateSelect'
import { Button, } from '@/components/ui/button'
import { Input, } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { useAutoAnimate, } from '@formkit/auto-animate/react'

import {
  Disclosure, Transition, Tab,
} from '@headlessui/react'
import { ChevronUpIcon, } from '@heroicons/react/20/solid'

export const formDayAtom = atom(0)
export const formWeekAtom = atom(0)
export const formWeekSizeAtom = atom<number>(2)
export const blockIndexAtom = atom('')
export const selectedTemplateAtom = atom('')

type Exercise = {
  lift: string | null,
  name: string | null,
  onerm: string | null,
  sets: string | null,
  reps: string | null,
}

type Day = {
  isRestDay: boolean,
  exercise: Exercise[],
};

type Week = {
  day: Day[],
}

export type Block = {
  id: string,
  name: string,
  isProgram: boolean,
  week: Week[],
}

const dayText = [
  'Day 1',
  'Day 2',
  'Day 3',
  'Day 4',
  'Day 5',
  'Day 6',
  'Day 7',
]

const defaultValues = {
  name: `block-${getRandomInt(1000)}`,
  week: [
    {
      day: [
        {
          name: '1',
          exercise: [
            {
              lift: '',
              name: '',
              onerm: '',
              sets: '',
              reps: '',
            },
          ],
        },
        {
          name: '2',
          exercise: [
            {
              lift: '',
              name: '',
              onerm: '',
              sets: '',
              reps: '',
            },
          ],
        },
        {
          name: '3',
          exercise: [
            {
              lift: '',
              name: '',
              onerm: '',
              sets: '',
              reps: '',
            },
          ],
        },
        {
          name: '4',
          exercise: [
            {
              lift: '',
              name: '',
              onerm: '',
              sets: '',
              reps: '',
            },
          ],
        },
        {
          name: '5',
          exercise: [
            {
              lift: '',
              name: '',
              onerm: '',
              sets: '',
              reps: '',
            },
          ],
        },
        {
          name: '6',
          exercise: [
            {
              lift: '',
              name: '',
              onerm: '',
              sets: '',
              reps: '',
            },
          ],
        },
        {
          name: '7',
          exercise: [
            {
              lift: '',
              name: '',
              onerm: '',
              sets: '',
              reps: '',
            },
          ],
        },
      ],
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const FormDay = ({
  weekIdx, dayIdx,
}: { weekIdx: number, dayIdx: number }) => {
  const formMethods = useFormContext()
  const {
    register, unregister, reset, setValue, control, getValues, handleSubmit, setError, formState: { errors, },
  } = formMethods

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  const [parent,] = useAutoAnimate(/* optional config */)

  return (
    <>
      <ul ref={parent} className='flex flex-col gap-2 mb-2'>
        {exerciseField.fields.map((item, index) => {
          return (
            <li key={item.id} className='flex gap-2'>
              <Input
                className='hover:bg-gray-800'
                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${index}.lift`)}
                placeholder='lift'
              />
              <Input
                className='hover:bg-gray-800'
                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${index}.name`)}
                placeholder='name'
              />
              <Input
                className='hover:bg-gray-800'
                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${index}.onerm`)}
                placeholder='1rm percent'
              />
              <Input
                className='hover:bg-gray-800'
                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${index}.sets`)}
                placeholder='sets'
              />
              <Input
                className='hover:bg-gray-800'
                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${index}.reps`)}
                placeholder='reps'
              />
            </li>
          )
        })}
      </ul>
      <Button
        onClick={() => exerciseField.append({})}
      >
        add exercise
      </Button>

    </>
  )
}

const FormWeek = ({ weekIdx, }: { weekIdx: number }) => {
  const formMethods = useFormContext()
  const {
    register, unregister, reset, setValue, control, getValues, handleSubmit, setError, formState: { errors, },
  } = formMethods

  const dayField = useFieldArray({
    control,
    name: `week.${weekIdx}.day`,
  })

  return (
    <>
      <Tab.Group >
        <Tab.List className='flex space-x-1 rounded-xl p-1'>
          {dayField.fields.map((item, index) => {
            return (
              <Tab
                key={item.id}
                className={({ selected, }) => classNames(
                  'w-full text-gray-400 rounded-lg py-2.5 leading-5 mx-1',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-gray-300 shadow text-gray-900 text-bold'
                    : 'text-blue-100 hover:bg-white/[0.07] hover:text-white'
                )
                }
              >
                {`day ${index + 1}`}
              </Tab>
            )
          })}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {dayField.fields.map((item, index) => {
            return (
              <Tab.Panel
                key={item.id}
                className={classNames(
                  'rounded-xl p-3',
                  'ring-gray-200 ring-opacity-20 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <FormDay weekIdx={weekIdx} dayIdx={index} />
              </Tab.Panel>
            )
          })}

        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

const Form = () => {
  const formMethods = useForm({ defaultValues, })
  const {
    register, unregister, reset, setValue, control, getValues, handleSubmit, setError, formState: { errors, },
  } = formMethods

  const [
    isUpdate,
    setIsUpdate,
  ] = useState(false)

  const onSubmit = (data: any) => {

    console.log('submit', data)
  }
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e)
  }
  const onAddWeek = () => {
    weekField.append({
      day: [
        {
          name: '1',
          exercise: [],
        },
        {
          name: '2',
          exercise: [],
        },
        {
          name: '3',
          exercise: [],
        },
        {
          name: '4',
          exercise: [],
        },
        {
          name: '5',
          exercise: [],
        },
        {
          name: '6',
          exercise: [],
        },
        {
          name: '7',
          exercise: [],
        },
      ],
    })
  }

  const weekField = useFieldArray({
    control,
    name: 'week',
  })

  const [parent,] = useAutoAnimate(/* optional config */)

  console.log(getValues())

  return (
    <>
      <div className='mt-2 md:mt-8 text-xxs md:text-base w-full flex flex-col justify-center items-center px-2 '>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit, onError)} className='w-full flex flex-col justify-center items-center'>
            <div ref={parent} className='flex flex-col w-full max-w-7xl gap-1 sm:gap-4 border border-gray-600 rounded-xl p-2 sm:p-6'>

              {/* template select */}
              <div className='flex gap-2 items-center justify-center'>
                <div>
                  <Button
                    type='button'
                    className=''
                  >
                    New Template
                  </Button>
                </div>
              </div>

              {/* Title */}
              <div className='flex flex-col gap-2 items-center justify-center'>
                <div className='relative rounded-md shadow-lg'>
                  <Input className=''
                    placeholder='Title'
                    defaultValue={``}
                    {...register('name', { required: 'This is required.', })}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name='name'
                  render={({ message, }) => <p className='text-red-400'>{message}</p>}
                />
              </div>

              {/* week */}

              {/* form */}
              {
                weekField.fields.map((week, weekIdx) => (
                  <Disclosure key={week.id} >
                    {({ open, }) => (
                      <div className='border border-gray-400 min-w-full p-2 rounded-xl'>
                        <Disclosure.Button className='flex justify-between rounded-lg px-8 py-2 text-left text-lg hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                          <span>{`Week ${weekIdx + 1}`}</span>
                          <ChevronUpIcon
                            className={`${open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-gray-400`}
                          />
                        </Disclosure.Button>

                        <Transition
                          className='transition-all duration-300 ease-out'
                          enterFrom='transform scale-70 opacity-0'
                          enterTo='transform scale-100 opacity-100'
                          leaveFrom='transform scale-100 opacity-100'
                          leaveTo='transform scale-70 opacity-0'
                        >
                          <Disclosure.Panel>
                            <FormWeek weekIdx={weekIdx} />
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                ))}

              <Button type='button' onClick={() => onAddWeek()}>Add Week</Button>
              <div className='flex gap-4 justify-center'>
                <button
                  type='submit'
                  className='rounded-lg py-2 px-4 bg-white text-gray-600'
                  onClick={() => setIsUpdate(false)}
                >
                  save new
                </button>
                <button
                  type='submit'
                  className='rounded-lg py-2 px-4 bg-white text-gray-600'
                  onClick={() => setIsUpdate(true)}
                >
                  update
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default Form

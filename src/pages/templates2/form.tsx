import React, {
  useState, useEffect,
} from 'react'
import {
  useForm, FormProvider, useFieldArray, useFormContext, Controller,
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

import TemplateSelect from './templateSelect'
import LiftPicker from './liftPicker'
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
  squatAtom, deadliftAtom, benchAtom,
} from '~/store/store'

import {
  Disclosure, Transition, Tab,
} from '@headlessui/react'
import { ChevronUpIcon, } from '@heroicons/react/20/solid'

import getWeight from '~/utils/getWeight'

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
              lift: 'unlinked',
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

const GetWeight = ({
  week, day, exercise,
}: { week: number, day: number, exercise: number }) => {
  const [squat,] = useAtom(squatAtom)
  const [deadlift,] = useAtom(deadliftAtom)
  const [bench,] = useAtom(benchAtom)
  const formMethods = useFormContext<Block>()

  const watch = formMethods.watch([
    `week.${week}.day.${day}.exercise.${exercise}.onerm`,
    `week.${week}.day.${day}.exercise.${exercise}.lift`,
  ])

  const checkWeight = () => {
    const lift = watch[1] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.lift
    const onerm = watch[0] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.onerm

    if (!lift) return null
    if (!onerm) return null
    if (lift === 'unlinked') return null

    if (lift === 'Squat') {
      return `${getWeight(squat, +onerm)} - ${getWeight(squat, +onerm*1.05)}kg`
    }
    if (lift === 'Deadlift') {
      return `${getWeight(deadlift, +onerm)} - ${getWeight(deadlift, +onerm*1.05)}kg`
    }
    if (lift === 'Bench') {
      return `${getWeight(bench, +onerm)} - ${getWeight(bench, +onerm*1.05)}kg`
    }
    return null
  }
  return (
    <div>
      {checkWeight()}
    </div>
  )
}

const FormExercise = ({
  weekIdx, dayIdx, exerciseIdx,
}:
  { weekIdx: number, dayIdx: number, exerciseIdx: number }) => {
  const formMethods = useFormContext()
  const {
    register, control,
  } = formMethods

  return (

    <li className='grid grid-cols-3 md:grid-cols-6 gap-2'>
      <div className='flex flex-col justify-center'>
        <Controller
          control={control}
          name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.lift`}
          defaultValue='unlinked'
          render={({ field: { onChange, }, }) => (<LiftPicker onChange={onChange} />)}
        />
      </div>
      <Input
        className='hover:bg-gray-800'
        {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`,)}
        placeholder='name'
      />
      <Input
        className='hover:bg-gray-800'
        {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`,)}
        placeholder='1rm percent'
      />
      <Input
        className='hover:bg-gray-800'
        {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.sets`,)}
        placeholder='sets'
      />
      <Input
        className='hover:bg-gray-800'
        {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.reps`,)}
        placeholder='reps'
      />
      <div className='text-sm flex flex-col items-center justify-center'>
        <GetWeight
          week={weekIdx}
          day={dayIdx}
          exercise={exerciseIdx}
        />
      </div>
    </li>
  )
}

const FormDay = ({
  weekIdx, dayIdx,
}:
  { weekIdx: number, dayIdx: number }) => {
  const formMethods = useFormContext()
  const {
    register, unregister, reset, setValue, control, getValues, handleSubmit, setError, formState: { errors, },
  } = formMethods

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  const [parent,] = useAutoAnimate(/* optional config */)

  console.log('render')

  return (
    <>
      <div className='flex flex-col justify-center items-stretch gap-2'>
        <ul ref={parent} className='flex flex-col gap-4 mb-2'>
          {exerciseField.fields.map((item, index) => {
            return (
              <FormExercise
                key={item.id}
                weekIdx={weekIdx}
                dayIdx={dayIdx}
                exerciseIdx={index}
              />
            )
          })}
        </ul>
        <div className='flex gap-2 mx-auto'>
          <Button
            type='button'
            className='border-0'
            onClick={() => exerciseField.append({})}
          >
            <PlusCircleIcon className='w-8 h-8 hover:scale-110' />
          </Button>
          <Button
            type='button'
            className='border-0'
            onClick={() => exerciseField.remove(exerciseField.fields.length - 1)}
          >
            <MinusCircleIcon className='w-8 h-8 hover:scale-90' />
          </Button>
        </div>

      </div>
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
        <Tab.List className='flex rounded-xl p-1 border border-gray-600'>
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
        <Tab.Panels className='mt-4'>
          {dayField.fields.map((item, index) => {
            return (
              <Tab.Panel
                key={item.id}
                className={classNames(
                  'rounded-xl',
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
                        <Disclosure.Button className='flex justify-between items-center gap-2 rounded-lg px-8 py-2 text-left text-lg hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                          <span>{`Week ${weekIdx + 1}`}</span>
                          <ChevronUpIcon
                            className={`${open ? 'rotate-180 transform' : ''
                              } h-8 w-8 text-gray-400`}
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

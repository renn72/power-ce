import React, {
  useState, useEffect,
} from 'react'
import {
  useForm, FormProvider, useFieldArray,
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
import FormDay from './formDay'
import { Button, } from '@/components/ui/button'
import { Input, } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Disclosure, } from '@headlessui/react'
import { ChevronUpIcon, } from '@heroicons/react/20/solid'

export const formDayAtom = atom(0)
export const formWeekAtom = atom(0)
export const formWeekSizeAtom = atom<number>(2)
export const blockIndexAtom = atom('')
export const selectedTemplateAtom = atom('')

type Exercise = {
  lift: string | null,
  name: string | null,
  onerm: number | null,
  sets: number | null,
  reps: number | null,
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

const Form = () => {
  const [
    formDay,
    setFormDay,
  ] = useAtom(formDayAtom)
  const [
    formWeek,
    setFormWeek,
  ] = useAtom(formWeekAtom)
  // const [formWeekSize, setFormWeekSize] = useAtom(formWeekSizeAtom)
  const [
    blockIndex,
    setBlockIndex,
  ] = useAtom(blockIndexAtom)
  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useAtom(selectedTemplateAtom)

  const formMethods = useForm<Block>()
  const {
    register, unregister, reset, setValue, control, getValues, handleSubmit, setError, formState: { errors, },
  } = formMethods
  const [
    formIndex,
    setFormIndex,
  ] = useState<number[][]>(
    [
      [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
      ],
      [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
      ],
    ],
  )
  const [
    isUpdate,
    setIsUpdate,
  ] = useState(false)

  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()
  const blocksTitle = blocksData?.map((block) => block.name)

  const ctx = api.useContext()

  const { mutate: blockCreateMutate, } = api.blocks.create.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })
  const { mutate: blockUpdateMutate, } = api.blocks.update.useMutation({
    onSuccess: () => {
      console.log('success')
      void ctx.blocks.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
    },
  })

  const onSubmit = (data: Block) => {
    if (blocksTitle && blocksTitle.includes(data.name) && !isUpdate) {
      setError('name', {
        type: 'manual',
        message: 'Need a unique name',
      })
      console.log('clash')
      return
    }
    const block: Block = {
      name: data.name,
      id: '',
      isProgram: false,
      week: data.week.map(
        (week) => ({
          day: week.day.map(
            (day) => ({
              isRestDay: day.isRestDay,
              exercise: day.exercise.map(
                (exercise) => ({
                  name: exercise.name,
                  lift: exercise.lift,
                  onerm: exercise.onerm ? exercise.onerm : null,
                  sets: exercise.sets ? exercise.sets : null,
                  reps: exercise.reps ? exercise.reps : null,
                })
              ),
            })
          ),
        })
      ),
    }
    console.log('isUpdate', isUpdate)

    if (isUpdate && blockIndex !== '') {
      block.id = blockIndex
      console.log(block)
      blockUpdateMutate(block)
    } else {
      blockCreateMutate(block)
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onError = (errors, e) => console.log(errors, e)

  const onAddExercise = () => {
    console.log('add exercise')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formIndex[formWeek][formDay] += 1
    setFormIndex([...formIndex,])
  }

  const onRemoveExercise = () => {
    console.log('remove exercise')
    if (!formIndex[formWeek]) return
    if (!formIndex[formWeek][formDay]) return

    if (formIndex[formWeek][formDay] && formIndex[formWeek][formDay] > 1) {
      unregister(`week.${formWeek}.day.${formDay}.exercise.${formIndex[formWeek][formDay] - 1}`)
      formIndex[formWeek][formDay] -= 1
      setFormIndex([...formIndex,])
    }
  }
  const onSetFormDay = (idx: number) => {
    const newDay = (formDay + idx)
    if (newDay >= 0 && newDay <= 6) {
      setFormDay(newDay)
    }
  }
  const onSetFormWeek = (idx: number) => {
    const newWeek = (formWeek + idx)
    if (newWeek >= 0 && newWeek < formIndex.length) {
      setFormWeek(newWeek)
    }
  }
  const onAddWeek = () => {
    // setFormWeekSize(formWeekSize + 1)
    setFormIndex([
      ...formIndex,
      [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
      ],
    ])
  }
  const onRemoveWeek = () => {
    // setFormWeekSize(formWeekSize - 1)
    if (formIndex.length - 1 <= 0) return
    setFormIndex(formIndex.slice(0, -1))
    if (formIndex.length - 1 <= formWeek) setFormWeek(formWeek - 1)
    unregister(`week.${formIndex.length - 1}`)
  }
  const onNewTemplate = () => {
    console.log('new')
    // setFormWeekSize(2)
    setFormIndex([
      [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
      ],
      [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
      ],
    ])
    setBlockIndex('')
    setFormDay(0)
    setFormWeek(0)
    // setFormWeekSize(2)
    reset()
  }

  const onSelectTemplate = (templateName: string) => {
    setSelectedTemplate(templateName)

    const block = blocksData?.filter((block) => block.name === templateName)[0]

    unregister()
    setValue('name', block?.name || '')
    const newFormIndex: number[][] = [[],]
    block?.week.forEach((week, weekIdx) => {
      newFormIndex[weekIdx] = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ]
      week.day.forEach((day, dayIdx) => {
        setValue(`week.${weekIdx}.day.${dayIdx}.isRestDay`, day?.isRestDay) // eslint-disable-line @typescript-eslint/no-unsafe-argument
        newFormIndex[weekIdx][dayIdx] = day?.exercise?.length || 0
        day.exercise.forEach((exercise, exerciseIdx) => {
          setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.lift`, exercise.lift || null) // eslint-disable-line @typescript-eslint/no-unsafe-argument
          setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`, exercise.name || null)
          setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`, exercise.onerm || null) // eslint-disable-line @typescript-eslint/no-unsafe-argument
          setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.sets`, exercise.sets || null) // eslint-disable-line @typescript-eslint/no-unsafe-argument
          setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.reps`, exercise.reps || null) // eslint-disable-line @typescript-eslint/no-unsafe-argument
        })
      })
    })

    setBlockIndex(block?.id || '')
    setFormDay(0)
    setFormWeek(0)
    setFormIndex(newFormIndex)
  }

  const weekField = useFieldArray({
    control,
    name: 'week',
  })

  console.log(getValues())

  if (blocksLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className='flex gap-2 sm:gap-6 justify-center items-center text-sm sm:text-base font-semibold'>

        <div>
          <Button
            className=''
            onClick={() => onNewTemplate()}
          >
            New Template
          </Button>
        </div>

        <TemplateSelect onSelectTemplate={onSelectTemplate} />

      </div>
      <div className='mt-2 md:mt-8 text-xxs md:text-sm flex flex-col items-center'>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className='flex flex-col gap-1 sm:gap-4 border border-gray-600 rounded-xl p-2 sm:p-6'>

              {/* Title */}
              <div className='flex flex-col gap-2 items-center justify-center'>
                <div className='relative rounded-md shadow-lg'>
                  <Input className=''
                    placeholder='Title'
                    defaultValue={`block-${getRandomInt(1000)}`}
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
              <div className='flex justify-center items-center gap-4 text-lg text-gray-200 md:py-2'>
                <button type='button' onClick={() => onRemoveWeek()}>
                  <MinusCircleIcon className='h-12 w-12 text-gray-800' aria-hidden='true' />
                </button>
                <ChevronLeftIcon className='h-8 w-8 cursor-pointer' onClick={() => onSetFormWeek(-1)} />
                Week {formWeek + 1}/{formIndex.length}
                <ChevronRightIcon className='h-8 w-8 cursor-pointer' onClick={() => onSetFormWeek(1)} />
                <button type='button' onClick={() => onAddWeek()}>
                  <PlusCircleIcon className='h-12 w-12 text-gray-800' aria-hidden='true' />
                </button>
              </div>

              {/* day */}
              <div className='flex justify-center items-center gap-4 text-lg text-gray-200 sm:pb-2'>
                <ChevronLeftIcon className='h-8 w-8 cursor-pointer' onClick={() => onSetFormDay(-1)} />
                {dayText[formDay]}
                <ChevronRightIcon className='h-8 w-8 cursor-pointer' onClick={() => onSetFormDay(1)} />
              </div>

              {/* form */}
              {
                formIndex.map((week, weekIdx) => (
                  <Disclosure key={weekIdx} as='div' >
                    {({ open, }) => (
                      <div className='border border-gray-400 p-2 rounded-xl'>
                        <Disclosure.Button className='flex w-full justify-between rounded-lg px-4 py-2 text-left text-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                          <span>{`Week ${weekIdx + 1}`}</span>
                          <ChevronUpIcon
                            className={`${open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          <div className={`flex gap-10`}>
                            {week.map((day, dayIdx) => (
                              <FormDay key={dayIdx} weekIdx={weekIdx} dayIdx={dayIdx} day={day} />
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                ))}

              <div className='flex justify-center gap-4 mt-4'>
                <button type='button' onClick={() => onAddExercise()}>
                  <PlusCircleIcon className='h-12 w-12 text-gray-800' aria-hidden='true' />
                </button>
                <button type='button' onClick={() => onRemoveExercise()}>
                  <MinusCircleIcon className='h-12 w-12 text-gray-800' aria-hidden='true' />
                </button>
              </div>

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
          <BlockTable />
        </FormProvider>
      </div>
    </>
  )
}

export default Form

import React, { useState, } from 'react'
import {
  useAtom, atom,
} from 'jotai'

import { ErrorMessage, } from '@hookform/error-message'

import {
  useForm, FormProvider, useFieldArray,
} from 'react-hook-form'

import { toast, } from 'react-hot-toast'

import { api, } from '~/utils/api'

import { Button, } from '@/components/ui/button'
import { Input, } from '@/components/ui/input'

import { useAutoAnimate, } from '@formkit/auto-animate/react'

import {
  Disclosure, Transition, Tab,
} from '@headlessui/react'
import { ChevronUpIcon, } from '@heroicons/react/20/solid'

import FormWeekData from './formWeekData'
import TemplateSelect from './templateSelect'

import { defaultValues, } from '~/store/defaultValues'
import { type Block, } from '~/store/types'
import {
  type BlockData, type WeekData,
} from '~/store/types'

import {
  getRandomInt, classNames,
} from '~/utils/utils'
import WeekTemplateSelect from './weekTemplateSelect'

export const selectedTemplateAtom = atom('')

const Form = () => {
  const formMethods = useForm({ defaultValues, })
  const {
    register, unregister, getValues, watch, reset, setValue, control, handleSubmit, clearErrors, setError, formState: { errors, },
  } = formMethods

  const [
    isUpdate,
    setIsUpdate,
  ] = useState(false)

  const [
    blockId,
    setBlockId,
  ] = useState('')

  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useAtom(selectedTemplateAtom)

  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()
  const blocksTitle = blocksData?.map((block) => block.name)

  const {
    data: weeksData, isLoading: weeksLoading,
  } = api.blocks.getAllWeekTemplates.useQuery()
  const weeksTitle = weeksData?.map((week) => week.name)

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
    console.log('submit')
    if (isUpdate) {
      updateBlock(data)
    } else {
      saveNewBlock(data)
    }
  }

  const saveNewBlock = (data: Block) => {
    console.log('saveNewBlock', data)
    if (blocksTitle && blocksTitle.includes(data.name) && !isUpdate) {
      setError('name', {
        type: 'manual',
        message: 'Need a unique name',
      })
      console.log('clash')
      return
    }
    const block: BlockData = {
      name: data.name,
      id: '',
      isProgram: false,
      week: data.week.map(
        (week) => ({
          name: week.name || '',
          isTemplate: false,
          day: week.day.map(
            (day) => ({
              isRestDay: day.isRestDay,
              exercise: day.exercise.map(
                (exercise) => ({
                  name: exercise.name,
                  lift: exercise.lift,
                  onerm: exercise.onerm ? +exercise.onerm : null,
                  onermTop: exercise.onermTop ? +exercise.onermTop : null,
                  weightTop: exercise.weightTop ? +exercise.weightTop : null,
                  weightBottom: exercise.weightBottom ? +exercise.weightBottom : null,
                  targetRpe: exercise.targetRpe ? +exercise.targetRpe : null,
                  sets: exercise.sets ? +exercise.sets : null,
                  reps: exercise.reps ? +exercise.reps : null,
                  notes: exercise.notes,
                  isEstimatedOnerm: exercise.isEstimatedOnerm || false,
                  estimatedOnermIndex: exercise.estimatedOnermIndex,
                  weightType: exercise.weightType,
                  repUnit: exercise.repUnit,

                })
              ),
            })
          ),
        })
      ),
    }

    blockCreateMutate(block)
  }

  const updateBlock = (data: Block) => {
    console.log('updateBlock', data)
    console.log('blockId', blockId)
    const block: BlockData = {
      name: data.name,
      id: blockId,
      isProgram: false,
      week: data.week.map(
        (week) => ({
          name: week.name || '',
          isTemplate: false,
          day: week.day.map(
            (day) => ({
              isRestDay: day.isRestDay,
              exercise: day.exercise.map(
                (exercise) => ({
                  name: exercise.name,
                  lift: exercise.lift,
                  onerm: exercise.onerm ? +exercise.onerm : null,
                  onermTop: exercise.onermTop ? +exercise.onermTop : null,
                  weightTop: exercise.weightTop ? +exercise.weightTop : null,
                  weightBottom: exercise.weightBottom ? +exercise.weightBottom : null,
                  targetRpe: exercise.targetRpe ? +exercise.targetRpe : null,
                  sets: exercise.sets ? +exercise.sets : null,
                  reps: exercise.reps ? +exercise.reps : null,
                  notes: exercise.notes,
                  isEstimatedOnerm: exercise.isEstimatedOnerm || false,
                  estimatedOnermIndex: exercise.estimatedOnermIndex,
                  weightType: exercise.weightType,
                  repUnit: exercise.repUnit,

                })
              ),
            })
          ),
        })
      ),
    }

    blockUpdateMutate(block)
  }

  const onError = (errors, e) => {
    console.log('error', errors, e)
  }

  const onAddWeek = () => {
    weekField.append({
      name: '',
      isTemplate: false,
      day: [
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
      ],
    })
  }

  const onNewTemplate = () => {
    reset(defaultValues)
    setIsUpdate(false)
    setBlockId('')
    setValue('name', `block-${getRandomInt(1000)}`)
  }

  const onSelectTemplate = (template: string) => {
    console.log('onSelectTemplate', template)
    setSelectedTemplate(template)
  }

  const onLoadTemplate = () => {

    const block = blocksData?.filter((block) => block.name === selectedTemplate)[0]
    console.log('onLoadTemplate', block)
    setBlockId(block?.id || '')

    const template = {
      name: block?.name || '',
      week: block?.week.map(
        (week) => ({
          name: week.name || '',
          isTemplate: false,
          day: week.day.map(
            (day) => ({
              isRestDay: day.isRestDay,
              exercise: day.exercise.map(
                (exercise) => ({
                  name: exercise.name || '',
                  lift: exercise.lift || '',
                  onerm: exercise.onerm ? exercise.onerm.toString() : undefined,
                  onermTop: exercise.onermTop ? exercise.onermTop.toString() : undefined,
                  weightTop: exercise.weightTop ? exercise.weightTop.toString() : undefined,
                  weightBottom: exercise.weightBottom ? exercise.weightBottom.toString() : undefined,
                  sets: exercise.sets ? exercise.sets.toString() : undefined,
                  reps: exercise.reps ? exercise.reps.toString() : undefined,
                  targetRpe: exercise.targetRpe ? exercise.targetRpe.toString() : undefined,
                  isEstimatedOnerm: exercise.isEstimatedOnerm || false,
                  estimatedOnermIndex: exercise.estimatedOnermIndex,
                  notes: exercise.notes || '',
                  weightType: exercise.weightType || undefined,
                  repUnit: exercise.repUnit || undefined,
                })
              ),
            })
          ),
        })
      ),
    }
    console.log(template)
    reset(template)

    toast.success('Loaded')
  }

  const weekField = useFieldArray({
    control,
    name: 'week',
  })

  const onRemoveWeek = () => {
    console.log('remove week')
    weekField.remove(weekField.fields.length - 1)
  }

  const [parent,] = useAutoAnimate(/* optional config */)

  return (
    <>
      <div className='text-xxs md:text-base w-full flex flex-col justify-center items-center h-full'>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit, onError)} className='w-full flex flex-col justify-center items-center '>
            <div ref={parent} className='flex flex-col w-full gap-1 sm:gap-8 items-center'>
              <div className='flex flex-col w-full gap-1 min-h-[80vh] sm:gap-8 p-1 sm:p-6 max-w-screen-2xl items-center '>

                {/* template select */}
                <div className='flex flex-col md:flex-row gap-2 md:gap-8 items-center justify-start'>
                  <TemplateSelect onSelectTemplate={onSelectTemplate} />
                  <div className='flex gap-2 md:gap-8 items-center justify-start'>
                    <Button
                      type='button'
                      className='text-sm sm:text-xl tracking-tighter sm:tracking-normal '
                      onClick={() => onNewTemplate()}
                    >
                      New
                    </Button>
                    <Button
                      type='button'
                      className='text-sm sm:text-xl tracking-tighter sm:tracking-normal '
                      onClick={() => onLoadTemplate()}
                    >
                      Load
                    </Button>
                    <Button
                      type='submit'
                      className='text-sm sm:text-xl tracking-tighter sm:tracking-normal'
                      onClick={() => setIsUpdate(false)}
                    >
                      Save New
                    </Button>
                    <Button
                      type='submit'
                      className='text-sm sm:text-xl tracking-tighter sm:tracking-normal'
                      onClick={() => setIsUpdate(true)}
                    >
                      Update
                    </Button>
                  </div>
                </div>

                {/* Title */}
                <div className='flex flex-col gap-2 items-start justify-center'>
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

                <div className='flex flex-col w-full gap-2 '>
                  <Tab.Group >
                    <Tab.List className='flex gap-8 justify-start text-xl'>
                      {weekField.fields.map((item, index) => {
                        return (
                          <Tab
                            key={item.id}
                            className={({ selected, }) => classNames(
                              'py-1.5 px-6 mx-1 border-b border-transparent',
                              'focus:outline-none',
                              selected
                                ? 'border-yellow-400 border-b shadow text-bold'
                                : 'hover:border-b hover:border-gray-400 font-normal',
                            )
                            }
                          >
                            {`Week ${index + 1}`}
                          </Tab>
                        )
                      })}
                    </Tab.List>
                    <Tab.Panels className='mt-4'>
                      {weekField.fields.map((item, index) => {
                        return (
                          <Tab.Panel
                            key={item.id}
                            className={classNames(
                              'rounded-xl',
                              ''
                            )}
                          >
                            <FormWeekData weekIdx={index} />
                          </Tab.Panel>
                        )
                      })}

                    </Tab.Panels>
                  </Tab.Group>

                  <div className='flex gap-2 items-center justify-center'>
                    <Button type='button' className='w-fit px-6 md:px-12' onClick={() => onAddWeek()}>Add Week</Button>
                    <Button type='button' className='w-fit px-6 md:px-12' onClick={() => onRemoveWeek()}>Remove Week</Button>
                  </div>
                </div>
              </div>
              <div className='flex gap-4 justify-center'>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default Form

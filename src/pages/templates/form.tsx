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
  Disclosure, Transition,
} from '@headlessui/react'
import { ChevronUpIcon, } from '@heroicons/react/20/solid'

import FormWeekData from './formWeekData'
import TemplateSelect from './templateSelect'

import { defaultValues, } from '~/store/defaultValues'
import { type Block, } from '~/store/types'
import {
  type BlockData, type WeekData,
} from '~/store/types'

import { getRandomInt, } from '~/utils/utils'
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

  const [parent,] = useAutoAnimate(/* optional config */)

  return (
    <>
      <div className='mt-2 md:mt-8 text-xxs md:text-base w-full flex flex-col justify-center items-center px-2 '>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit, onError)} className='w-full flex flex-col justify-center items-center'>
            <div ref={parent} className='flex flex-col w-full max-w-screen-2xl gap-1 sm:gap-4 border border-gray-600 rounded-xl p-2 sm:p-6'>

              {/* template select */}
              <div className='flex gap-2 items-center justify-center'>
                <Button
                  type='button'
                  className='text-xs tracking-tighter sm:tracking-normal sm:text-base'
                  onClick={() => onNewTemplate()}
                >
                  New Template
                </Button>
                <TemplateSelect onSelectTemplate={onSelectTemplate} />
                <Button
                  type='button'
                  className=''
                  onClick={() => onLoadTemplate()}
                >
                  Load
                </Button>
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

              {
                weekField.fields.map((week, weekIdx) => (
                  <FormWeekData key={week.id} weekIdx={weekIdx} />
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

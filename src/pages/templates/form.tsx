import React, { useState } from 'react'
import { useAtom, atom } from 'jotai'

import { ErrorMessage } from '@hookform/error-message'

import { useForm, FormProvider, useFieldArray } from 'react-hook-form'

import { toast } from 'react-hot-toast'

import { api } from '~/utils/api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { Tab } from '@headlessui/react'

import FormWeekData from './formWeekData'
import TemplateSelect from './templateSelect'

import { defaultValues } from '~/store/defaultValues'
import { type Block } from '~/store/types'
import { type BlockData } from '~/store/types'

import { classNames } from '~/utils/utils'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

export const selectedTemplateAtom = atom('')

const Form = () => {
  const formMethods = useForm({ defaultValues })
  const {
    register,
    reset,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = formMethods

  const [isUpdate, setIsUpdate] = useState(false)

  const [blockId, setBlockId] = useState('')

  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom)

  const { data: blocksData } = api.blocks.getAll.useQuery()
  const blocksTitle = blocksData?.map((block) => block.name)

  const ctx = api.useContext()

  const { mutate: blockCreateMutate } = api.blocks.create.useMutation({
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
  const { mutate: blockUpdateMutate } = api.blocks.update.useMutation({
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
      week: data.week.map((week) => ({
        name: week.name || '',
        isTemplate: false,
        day: week.day.map((day) => ({
          isRestDay: day.isRestDay,
          isComplete: false,
          exercise: day.exercise.map((exercise) => ({
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
            htmlLink: exercise.htmlLink,
            isComplete: false,
          })),
        })),
      })),
    }

    console.log('block', block)

    blockCreateMutate(block)
  }

  const updateBlock = (data: Block) => {
    console.log('updateBlock', data)
    console.log('blockId', blockId)
    const block: BlockData = {
      name: data.name,
      id: blockId,
      isProgram: false,
      week: data.week.map((week) => ({
        name: week.name || '',
        isTemplate: false,
        day: week.day.map((day) => ({
          isRestDay: day.isRestDay,
          isComplete: false,
          exercise: day.exercise.map((exercise) => ({
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
            htmlLink: exercise.htmlLink,
            isComplete: false,
          })),
        })),
      })),
    }

    console.log('block', JSON.stringify(block, null, 2))

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
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
      ],
    })
  }

  const onNewTemplate = () => {
    reset(defaultValues)
    setIsUpdate(false)
    setBlockId('')
  }

  const onSelectTemplate = (template: string) => {
    console.log('onSelectTemplate', template)
    setSelectedTemplate(template)
  }

  const onLoadTemplate = () => {
    const block = blocksData?.filter(
      (block) => block.name === selectedTemplate,
    )[0]
    console.log('onLoadTemplate', block)
    setBlockId(block?.id || '')

    const template = {
      name: block?.name || '',
      week: block?.week.map((week) => ({
        name: week.name || '',
        isTemplate: false,
        day: week.day.map((day) => ({
          isRestDay: day.isRestDay,
          exercise: day.exercise.map((exercise) => ({
            name: exercise.name || '',
            lift: exercise.lift || '',
            onerm: exercise.onerm ? exercise.onerm.toString() : undefined,
            onermTop: exercise.onermTop
              ? exercise.onermTop.toString()
              : undefined,
            weightTop: exercise.weightTop
              ? exercise.weightTop.toString()
              : undefined,
            weightBottom: exercise.weightBottom
              ? exercise.weightBottom.toString()
              : undefined,
            sets: exercise.sets ? exercise.sets.toString() : undefined,
            reps: exercise.reps ? exercise.reps.toString() : undefined,
            targetRpe: exercise.targetRpe
              ? exercise.targetRpe.toString()
              : undefined,
            isEstimatedOnerm: exercise.isEstimatedOnerm || false,
            estimatedOnermIndex: exercise.estimatedOnermIndex,
            notes: exercise.notes || '',
            weightType: exercise.weightType || undefined,
            repUnit: exercise.repUnit || undefined,
            htmlLink: exercise.htmlLink || undefined,
          })),
        })),
      })),
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

  const [parent] = useAutoAnimate(/* optional config */)

  return (
    <>
      <div className='text-xxs flex h-full w-full flex-col items-center justify-center md:text-base'>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className='flex w-full flex-col items-center justify-center '
          >
            <div
              ref={parent}
              className='flex w-full flex-col items-center gap-1 sm:gap-8'
            >
              <div className='flex min-h-[80vh] w-full max-w-[1600px] flex-col items-center gap-1 p-1 sm:gap-8 sm:p-4 '>
                {/* template select */}
                <div className='flex w-full  items-center gap-2'>
                  <TemplateSelect onSelectTemplate={onSelectTemplate} />
                  <div className='flex items-center justify-start gap-2'>
                    <Button
                      type='button'
                      className='w-24 text-sm tracking-tighter sm:text-xl sm:tracking-normal md:w-36'
                      onClick={() => onNewTemplate()}
                    >
                      New
                    </Button>
                    <Button
                      type='button'
                      className='w-24 text-sm tracking-tighter sm:text-xl sm:tracking-normal md:w-36'
                      onClick={() => onLoadTemplate()}
                    >
                      Load
                    </Button>
                  </div>
                </div>

                {/* Title */}
                <div className='flex  w-full gap-2'>
                  <div className='flex flex-col items-start justify-center gap-2'>
                    <div className='relative rounded-md shadow-lg'>
                      <Input
                        className='w-40 md:w-72'
                        placeholder='Title'
                        defaultValue={``}
                        {...register('name', { required: 'This is required.' })}
                      />
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name='name'
                      render={({ message }) => (
                        <p className='text-red-400'>{message}</p>
                      )}
                    />
                  </div>
                  <Button
                    type='submit'
                    className='w-24 px-0 text-sm tracking-tighter sm:text-xl sm:tracking-normal md:w-36'
                    onClick={() => setIsUpdate(false)}
                  >
                    Save New
                  </Button>
                  <Button
                    type='submit'
                    className='w-24 text-sm tracking-tighter sm:text-xl sm:tracking-normal md:w-36'
                    onClick={() => setIsUpdate(true)}
                  >
                    Update
                  </Button>
                </div>

                <div className='flex w-full flex-col gap-2 '>
                  <Tab.Group>
                    <Tab.List className='flex justify-start gap-8 text-xl'>
                      <MinusCircleIcon
                        type='button'
                        className='w-10 h-10 text-gray-500 hover:text-gray-200'
                        onClick={() => onRemoveWeek()}
                      />
                      {weekField.fields.map((item, index) => {
                        return (
                          <Tab
                            key={item.id}
                            className={({ selected }) =>
                              classNames(
                                'mx-1 border-b border-transparent px-6 py-1.5',
                                'focus:outline-none',
                                selected
                                  ? 'text-bold border-b border-yellow-400 shadow'
                                  : 'font-normal hover:border-b hover:border-gray-400',
                              )
                            }
                          >
                            {`Week ${index + 1}`}
                          </Tab>
                        )
                      })}
                      <PlusCircleIcon
                        className='w-10 h-10 text-gray-500 hover:text-gray-200'
                        onClick={() => onAddWeek()}
                      />
                    </Tab.List>
                    <Tab.Panels className='mt-4'>
                      {weekField.fields.map((item, index) => {
                        return (
                          <Tab.Panel
                            key={item.id}
                            className={classNames('rounded-xl', '')}
                          >
                            <FormWeekData weekIdx={index} />
                          </Tab.Panel>
                        )
                      })}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className='mt-12 flex items-center justify-center gap-2'></div>
                </div>
              </div>
              <div className='my-28 flex justify-center gap-4'></div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default Form

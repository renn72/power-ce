import React, { useState, useContext } from 'react'
import { useAtom, atom } from 'jotai'
import { useSession } from 'next-auth/react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

import { ErrorMessage } from '@hookform/error-message'

import { useForm, FormProvider, useFieldArray } from 'react-hook-form'

import { toast } from 'react-hot-toast'

import { api } from '~/utils/api'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Switch } from '@headlessui/react'

import TemplateSelect from './templateSelect'
import FormWeek from './formWeek'

import { defaultValues } from '~/store/defaultValues'
import { type Block } from '~/store/types'
import { type BlockData } from '~/store/types'

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { LoadingWrapper } from '~/components/loading'

import { FieldArrayContext } from './index'

export const selectedTemplateAtom = atom('')
export const isSuperAdminAtom = atom(false)

const Form = () => {
  const { data: session } = useSession()
  const user = session?.user
  const formMethods = useForm({ defaultValues })
  const {
    register,
    reset,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = formMethods

  const fieldArrayContext = useContext(FieldArrayContext)

  const [isOpen, setIsOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [blockId, setBlockId] = useState('')
  const [isSuperAdmin, setIsSuperAdmin] = useAtom(isSuperAdminAtom)
  const isMe = user?.id === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a'

  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom)

  const { data: blocksData } = api.blocks.getAll.useQuery() // TODO: just load titles
  const blocksTitle = blocksData?.map((block) => block.name)

  const ctx = api.useUtils()

  const { mutate: blockCreateMutate } = api.blocks.create.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })
  const { mutate: blockUpdateMutate } = api.blocks.update.useMutation({
    onSuccess: (e) => {
      console.log('success', e)
      setBlockId(e[1]?.id)
      setIsOpen(false)
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllBlockTitles.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const onSubmit = (data: Block) => {
    setIsOpen(true)
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
        id: '',
        name: week.name || '',
        isTemplate: false,
        day: week.day.map((day) => ({
          isRestDay: day.isRestDay,
          isComplete: false,
          warmupTemplateId: day.warmupTemplateId || '',
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
            tempoDown: exercise.tempoDown ? +exercise.tempoDown : null,
            tempoUp: exercise.tempoUp ? +exercise.tempoUp : null,
            tempoPause: exercise.tempoPause ? +exercise.tempoPause : null,
            isSS: exercise.isSS || false,
            ss: exercise.ss.map((s) => ({
              name: s.name,
              onerm: s.onerm ? +s.onerm : null,
              onermTop: s.onermTop ? +s.onermTop : null,
              weightTop: s.weightTop ? +s.weightTop : null,
              weightBottom: s.weightBottom ? +s.weightBottom : null,
              targetRpe: s.targetRpe ? +s.targetRpe : null,
              reps: s.reps ? +s.reps : null,
              weightType: s.weightType,
              repUnit: s.repUnit,
              notes: s.notes,
              htmlLink: s.htmlLink,
            })),
          })),
        })),
      })),
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
      week: data.week.map((week) => ({
        name: week.name || '',
        isTemplate: false,
        day: week.day.map((day) => ({
          isRestDay: day.isRestDay,
          isComplete: false,
          warmupTemplateId: day.warmupTemplateId || '',
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
            tempoDown: exercise.tempoDown ? +exercise.tempoDown : null,
            tempoUp: exercise.tempoUp ? +exercise.tempoUp : null,
            tempoPause: exercise.tempoPause ? +exercise.tempoPause : null,
            isSS: exercise.isSS || false,
            ss: exercise.ss.map((s) => ({
              name: s.name,
              onerm: s.onerm ? +s.onerm : null,
              onermTop: s.onermTop ? +s.onermTop : null,
              weightTop: s.weightTop ? +s.weightTop : null,
              weightBottom: s.weightBottom ? +s.weightBottom : null,
              targetRpe: s.targetRpe ? +s.targetRpe : null,
              reps: s.reps ? +s.reps : null,
              weightType: s.weightType,
              repUnit: s.repUnit,
              notes: s.notes,
              htmlLink: s.htmlLink,
            })),
          })),
        })),
      })),
    }

    blockUpdateMutate(block)
  }

  const onError = () => {
    toast.error('Error')
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
    setSelectedTemplate(template)
  }

  const onLoadTemplate = () => {
    const block = blocksData?.find((block) => block.id === selectedTemplate)
    setBlockId(block?.id || '')

    const template = {
      name: block?.name || '',
      week: block?.week.map((week) => ({
        name: week.name || '',
        isTemplate: false,
        day: week.day.map((day) => ({
          isRestDay: day.isRestDay,
          warmupTemplateId: day.warmupTemplateId || '',
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
            tempoDown: exercise.tempoDown || undefined,
            tempoUp: exercise.tempoUp || undefined,
            tempoPause: exercise.tempoPause || undefined,
            isSS: exercise.ss.length > 0 ? true : false,
            ss: exercise.ss.map((s) => ({
              name: s.name || '',
              lift: s.lift || '',
              onerm: s.onerm ? s.onerm.toString() : undefined,
              onermTop: s.onermTop ? s.onermTop.toString() : undefined,
              weightTop: s.weightTop ? s.weightTop.toString() : undefined,
              weightBottom: s.weightBottom
                ? s.weightBottom.toString()
                : undefined,
              sets: s.sets ? s.sets.toString() : undefined,
              reps: s.reps ? s.reps.toString() : undefined,
              targetRpe: s.targetRpe ? s.targetRpe.toString() : undefined,
              weightType: s.weightType || undefined,
              repUnit: s.repUnit || undefined,
              notes: s.notes || '',
              htmlLink: s.htmlLink || undefined,
            })),
          })),
        })),
      })),
    }
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

  const handleDrag = (result) => {
    console.log('result', result)
    const { source, destination } = result

    const sourceDayId = source.droppableId
    const sourceIndex = source.index
    const destDayId = destination.droppableId
    const destIndex = destination.index

    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    if (sourceDayId  === destDayId) {
      console.log('same day')
      fieldArrayContext[sourceDayId].move(sourceIndex, destIndex)
      return
    }

    const sourceDay = fieldArrayContext[sourceDayId].fields[sourceIndex]
    fieldArrayContext[sourceDayId].remove(sourceIndex)
    fieldArrayContext[destDayId].insert(destIndex, sourceDay)

    console.log(fieldArrayContext)
  }

  return (
    <>
      <LoadingWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className='text-xxs flex h-full w-full flex-col items-center justify-center md:text-base'>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className='flex w-full flex-col items-center justify-center '
          >
            <div className='flex w-full flex-col items-center gap-1 sm:gap-8'>
              <div className='flex min-h-[60vh] w-full flex-col items-center gap-2 p-1 sm:gap-4 sm:p-2 '>
                {/* template select */}
                <div className='flex w-full items-center justify-between rounded-lg bg-gray-900 p-2 '>
                  <div className='flex w-full gap-2'>
                    <TemplateSelect onSelectTemplate={onSelectTemplate} />
                    <div className='flex w-full items-center justify-around gap-2 md:w-fit md:justify-start'>
                      <Button
                        type='button'
                        className='w-36 bg-gray-900 text-sm tracking-tighter sm:text-lg sm:tracking-normal'
                        onClick={() => onNewTemplate()}
                      >
                        New
                      </Button>
                      <Button
                        type='button'
                        className='w-36 bg-gray-900 text-sm  tracking-tighter sm:text-lg sm:tracking-normal'
                        onClick={() => onLoadTemplate()}
                      >
                        Load
                      </Button>
                    </div>
                  </div>
                  {isMe && (
                    <div className='flex items-center gap-1 text-sm'>
                      Super
                      <Switch
                        checked={isSuperAdmin}
                        onChange={setIsSuperAdmin}
                        className={cn(
                          isSuperAdmin ? 'bg-gray-200' : 'bg-gray-600',
                          'relative inline-flex h-[14px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent',
                          ' transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                        )}
                      >
                        <span
                          aria-hidden='true'
                          className={cn(
                            isSuperAdmin ? 'translate-x-6' : 'translate-x-0',
                            'pointer-events-none inline-block h-[10px] w-[14px] transform',
                            'rounded-full bg-gray-900 shadow-lg ring-0 transition duration-200 ease-in-out',
                          )}
                        />
                      </Switch>
                    </div>
                  )}

                  {/* Title */}
                  <div className='flex w-full justify-end gap-2'>
                    <div className='flex flex-col items-start justify-center gap-2'>
                      <div className='relative rounded-md px-4 shadow-lg'>
                        <Input
                          className='w-40 bg-gray-900  md:w-64 '
                          placeholder='Title'
                          defaultValue={``}
                          {...register('name', {
                            required: 'This is required.',
                          })}
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
                      className='w-24 bg-gray-900 px-0  text-sm tracking-tighter sm:text-lg sm:tracking-normal md:w-36'
                      onClick={() => setIsUpdate(false)}
                    >
                      Save New
                    </Button>
                    <Button
                      type='submit'
                      className='w-24 bg-gray-900  text-sm tracking-tighter sm:text-lg sm:tracking-normal md:w-36'
                      onClick={() => setIsUpdate(true)}
                    >
                      Update
                    </Button>
                  </div>
                </div>

                <DragDropContext onDragEnd={handleDrag}>
                  <div className='flex w-full flex-col gap-8 '>
                    {weekField.fields.map((week, weekIndex) => (
                      <FormWeek
                        key={week.id}
                        weekIdx={weekIndex}
                      />
                    ))}
                  </div>
                </DragDropContext>
                <PlusCircleIcon
                  className='mt-12 h-12 w-12 text-gray-400 hover:text-gray-200'
                  onClick={() => onAddWeek()}
                />
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

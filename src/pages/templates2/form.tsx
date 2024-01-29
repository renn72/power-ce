import React, { useState, useContext } from 'react'
import { useAtom, atom } from 'jotai'
import { useSession } from 'next-auth/react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

import { useForm, FormProvider, useFieldArray } from 'react-hook-form'

import { toast } from 'react-hot-toast'

import { api } from '~/utils/api'

import FormWeek from './formWeek'
import FormHeader from './formHeader'

import { defaultValues } from '~/store/defaultValues'
import { type Block } from '~/store/types'
import { type BlockData } from '~/store/types'

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { LoadingWrapper } from '~/components/loading'

import { FieldArrayContext } from './index'
import { type UseFieldArrayReturn } from 'react-hook-form'
import { type UseFieldArray } from './index'

import ExerciseDropper from './exerciseDropper'
import { ScrollArea } from '@/components/ui/scroll-area'
import Navbar from '~/components/navbar'
import Footer from '~/components/footer'

export const selectedTemplateAtom = atom('')
export const isSuperAdminAtom = atom(false)

interface DragResult {
  source: {
    droppableId: string
    index: number
  }
  destination: {
    droppableId: string
    index: number
  }
  draggableId: string
}

const Form = () => {
  const { data: session } = useSession()
  const user = session?.user
  const userId = user?.id || ''
  const formMethods = useForm({ defaultValues })
  const {
    register,
    reset,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = formMethods


  const { data: userNav,  } = api.users.get.useQuery({
    userId: userId,
  })

  const fieldArrayContext = useContext(FieldArrayContext)

  const [isOpen, setIsOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [blockId, setBlockId] = useState('')

  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom)

  const { data: blocksData } = api.blocks.getAll.useQuery() // TODO: just load titles
  const blocksTitle = blocksData?.map((block) => block.name)
  const { data: exerciseTemplates } = api.exercise.getAll.useQuery({
    userId: userId,
  })

  const ctx = api.useUtils()

  const { mutate: blockCreateMutate } = api.blocks.create.useMutation({
    onSuccess: () => {
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
    console.log('submit', data)
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
            restTime: exercise.restTime ? +exercise.restTime : null,
            restUnit: exercise.restUnit,
            targetRpeHigh: exercise.targetRpeHigh,
            ss: exercise.ss.map((s) => ({
              id: '',
              name: s.name,
              lift: s.lift,
              onerm: s.onerm ? +s.onerm : null,
              onermTop: s.onermTop ? +s.onermTop : null,
              weightTop: s.weightTop ? +s.weightTop : null,
              weightBottom: s.weightBottom
                ? +s.weightBottom
                : null,
              targetRpe: s.targetRpe ? +s.targetRpe : null,
              sets: s.sets ? +s.sets : null,
              reps: s.reps ? +s.reps : null,
              notes: s.notes,
              isEstimatedOnerm: s.isEstimatedOnerm || false,
              estimatedOnermIndex: s.estimatedOnermIndex,
              weightType: s.weightType,
              repUnit: s.repUnit,
              htmlLink: s.htmlLink,
              isComplete: false,
              restTime: s.restTime ? +s.restTime : null,
              restUnit: s.restUnit,
              targetRpeHigh: s.targetRpeHigh,
              field1: null,
              field2: null,
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
      id: blockId || '',
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
            restTime: exercise.restTime ? +exercise.restTime : null,
            restUnit: exercise.restUnit,
            targetRpeHigh: exercise.targetRpeHigh,
            ss: exercise.ss.map((s) => ({
              id: '',
              name: s.name,
              lift: s.lift,
              onerm: s.onerm ? +s.onerm : null,
              onermTop: s.onermTop ? +s.onermTop : null,
              weightTop: s.weightTop ? +s.weightTop : null,
              weightBottom: s.weightBottom
                ? +s.weightBottom
                : null,
              targetRpe: s.targetRpe ? +s.targetRpe : null,
              sets: s.sets ? +s.sets : null,
              reps: s.reps ? Number(s.reps) : null,
              notes: s.notes,
              isEstimatedOnerm: s.isEstimatedOnerm || false,
              estimatedOnermIndex: s.estimatedOnermIndex,
              weightType: s.weightType,
              repUnit: s.repUnit,
              htmlLink: s.htmlLink,
              isComplete: false,
              restTime: s.restTime ? +s.restTime : null,
              restUnit: s.restUnit,
              targetRpeHigh: s.targetRpeHigh,
              field1: null,
              field2: null,
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

  const weekField = useFieldArray({
    control,
    name: 'week',
  })

  const onRemoveWeek = () => {
    console.log('remove week')
    weekField.remove(weekField.fields.length - 1)
  }

  const handleDrag = (result: DragResult) => {
    const { source, destination } = result
    if (!destination) return

    const sourceDayId = source.droppableId
    const sourceIndex = source.index
    const destDayId = destination.droppableId
    const destIndex = destination.index

    const sourceArray = fieldArrayContext?.[sourceDayId] as UseFieldArrayReturn
    const destArray = fieldArrayContext?.[destDayId] as UseFieldArrayReturn

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    if (sourceDayId === destDayId) {
      console.log('same day')
      sourceArray.move(sourceIndex, destIndex)
      return
    }

    if (destDayId === 'templates') return
    if (sourceDayId === 'templates') {
      const exercise = exerciseTemplates?.find(
        (t) => t.id === result.draggableId,
      )

      if (!exercise) return

      destArray.insert(destIndex, exercise)

      return
    }

    const sourceDay = sourceArray.fields[sourceIndex]
    destArray.insert(destIndex, sourceDay)
    sourceArray.remove(sourceIndex)
  }

  return (
    <>
      <LoadingWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <DragDropContext
        className='overflow-auto'
        onDragEnd={handleDrag}
      >
        <div className='flex w-full tracking-tight h-full '>
          <ScrollArea className='h-screen w-full'>
            <Navbar user={userNav || null}/>
            <FormProvider {...formMethods}>
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className='flex w-full flex-col items-center min-h-[90vh] '
              >
                <div className='flex w-full flex-col items-center gap-1 sm:gap-8'>
                  <div className='flex min-h-[60vh] w-full flex-col items-center gap-2 p-1 sm:gap-4'>
                    <FormHeader
                      setIsUpdate={setIsUpdate}
                      setBlockId={setBlockId}
                      onSubmit={onSubmit}
                    />

                    <div className='flex w-full flex-col gap-8 '>
                      {weekField.fields.map((week, weekIndex) => (
                        <FormWeek
                          key={week.id}
                          weekIdx={weekIndex}
                        />
                      ))}
                    </div>
                    <PlusCircleIcon
                      className='mt-12 h-12 w-12 text-gray-400 hover:text-gray-200'
                      onClick={() => onAddWeek()}
                    />
                  </div>
                  <div className='my-28 flex justify-center gap-4'></div>
                </div>
              </form>
            </FormProvider>
            <Footer />
          </ScrollArea>
          <ExerciseDropper />
        </div>
      </DragDropContext>
    </>
  )
}

export default Form

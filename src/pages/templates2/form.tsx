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
import { type PrismaBlock } from '~/store/types'

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { LoadingWrapper } from '~/components/loading'

import { FieldArrayContext } from './index'
import { type UseFieldArrayReturn } from 'react-hook-form'

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
  const formMethods = useForm<PrismaBlock>({ defaultValues })
  const {
    register,
    reset,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = formMethods

  const { data: userNav } = api.users.get.useQuery({
    userId: userId,
  })

  const fieldArrayContext = useContext(FieldArrayContext)

  const [isOpen, setIsOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [blockId, setBlockId] = useState('')

  const { data: blocksData } = api.blocks.getAll.useQuery() // TODO: just load titles
  const blocksTitle = blocksData?.map((block) => block.name)
  const { data: exerciseTemplates } = api.exercise.getAll.useQuery({
    userId: userId,
  })

  const ctx = api.useUtils()

  const { mutate: blockCreateMutate } = api.template.create.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllBlockTitles.invalidate()
    },
    onError: (e) => {
      toast.error('Error')
      setIsOpen(false)
    },
  })
  const { mutate: blockUpdateMutate } = api.template.update.useMutation({
    onSuccess: (e) => {
      setBlockId(e[1]?.id)
      setIsOpen(false)
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllBlockTitles.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
      setIsOpen(false)
    },
  })

  const onSubmit = (data: PrismaBlock) => {
    console.log('submit', data)
    console.log('isUpdate', isUpdate)
    setIsOpen(true)
    saveNewBlock(data)
  }
  const onUpdate = (data: PrismaBlock) => {
    console.log('submit', data)
    setIsOpen(true)
    updateBlock(data)
  }

  const saveNewBlock = (data: PrismaBlock) => {
    console.log('saveNewBlock', data)
    if (blocksTitle && blocksTitle.includes(data.name) && !isUpdate) {
      setError('name', {
        type: 'manual',
        message: 'Need a unique name',
      })
      console.log('clash')
      setIsOpen(false)
      return
    }

    const block = {
      ...data,
      trainerId: userId,
      week: {
        create: data.week.map((week) => ({
          ...week,
          day: {
            create: week.day.map((day) => ({
              ...day,
              exercise: {
                create: day.exercise.map((exercise) => ({
                  ...exercise,
                  ss: {
                    create: exercise.ss.map((s) => ({
                      ...s,
                    })),
                  },
                })),
              },
            })),
          },
        })),
      },
    }
    blockCreateMutate(block)
  }

  const updateBlock = (data: PrismaBlock) => {
    const block = {
      ...data,
      createdAt: new Date(),
      id: blockId,
      trainerId: userId,
      week: {
        create: data.week.map((week) => {
          delete week?.blockId
          return {
            ...week,
            day: {
              create: week.day.map((day) => {
                delete day?.weekId
                return {
                  ...day,
                  exercise: {
                    create: day.exercise.map((exercise) => {
                      delete exercise?.dayId
                      return {
                        ...exercise,
                        ss: {
                          create: exercise.ss.map((s) => {
                            delete s?.exerciseId
                            return {
                              ...s,
                            }
                          }),
                        },
                      }
                    }),
                  },
                }
              }),
            },
          }
        }),
      },
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
        <div className='flex h-full w-full tracking-tight '>
          <ScrollArea className='h-screen w-full'>
            <Navbar user={userNav || null} />
            <FormProvider {...formMethods}>
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className='flex min-h-[90vh] w-full flex-col items-center '
              >
                <div className='flex w-full flex-col items-center gap-1 sm:gap-8'>
                  <div className='flex min-h-[60vh] w-full flex-col items-center gap-2 p-1 sm:gap-4'>
                    <FormHeader
                      setBlockId={setBlockId}
                      onSubmit={onSubmit}
                      onUpdate={onUpdate}
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

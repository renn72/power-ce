import React, { useState, useContext, useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { DragDropContext } from '@hello-pangea/dnd'

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
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

export const selectedTemplateAtom = atom('')
export const isSuperAdminAtom = atom(false)

export const isProgramAtom = atom(false)
export const isEditProgramAtom = atom(false)

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

const Form = ({
  isProgramProps = false,
  ProgramId = null,
  program = null,
  triggerReset = null,
}: {
  isProgramProps?: boolean
  ProgramId?: string | null
  triggerReset?: number | null
  program?: PrismaBlock | null
}) => {
  const { data: session } = useSession()
  const user = session?.user
  const userId = user?.id || ''

  const ctx = api.useUtils()

  const formMethods = useForm<PrismaBlock>({ defaultValues })
  const { control, handleSubmit, setError, reset, getValues } = formMethods

  const [isEditProgram, _setIsEditProgram] = useAtom(isEditProgramAtom)
  const [isProgram, setIsProgram] = useAtom(isProgramAtom)

  useEffect(() => {
    setIsProgram(isProgramProps)
  }, [])

  const { data: userNav } = api.users.get.useQuery({
    userId: userId,
  })

  const fieldArrayContext = useContext(FieldArrayContext)

  const [isOpen, setIsOpen] = useState(false)
  const [isSaveOpen, setIsSaveOpen] = useState(false)
  const [isUpdate, _setIsUpdate] = useState(false)
  const [blockId, setBlockId] = useState('')

  const [isAddWeekOpen, setIsAddWeekOpen] = useState(false)

  const { data: blocksIdTitle } =
    api.templateBuilder.getAllTemplateTitles.useQuery()
  const blocksTitle = blocksIdTitle?.map((block) => block.name)
  const { data: exerciseTemplates } =
    api.templateBuilder.getAllExerciseTemplates.useQuery()

  // const { data: program, isLoading: programLoading } = api.blocks.get.useQuery({
  //   id: ProgramId || '',
  // })
  const weekField = useFieldArray({
    control,
    name: 'week',
    shouldUnregister: false,
  })

  useEffect(() => {
    console.log('effect')
    if (isProgramProps) {
      console.log('isProgram')
      if (program === null || program === undefined) {
        console.log('null')
        reset(defaultValues)
      } else {
        setBlockId(program.id)
        const resetData = {
          ...program,
          week: program.week?.map((_week) => {
            const { blockId, ...week } = _week
            return {
              ...week,
              day: week?.day?.map((_day) => {
                const { weekId, ...day } = _day
                return {
                  ...day,
                  exercise: day?.exercise?.map((_exercise) => {
                    const { dayId, ...exercise } = _exercise
                    return {
                      ...exercise,
                      set: exercise?.set?.map((_set) => {
                        const { exerciseId, ...set } = _set
                        return { ...set }
                      }),
                      ss: exercise?.ss?.map((_s) => {
                        const { exerciseId, ...s } = _s
                        return {
                          ...s,
                        }
                      }),
                    }
                  }),
                }
              }),
            }
          }),
        }
        console.log('resetData', resetData)
        reset(resetData)
        weekField.fields.forEach((week, idx) => {})
      }
    }
  }, [program, triggerReset])

  api.blocks.getUserActiveProgram.useQuery({ userId: program?.userId || '' })

  const { mutate: blockCreateMutate } = api.template.create.useMutation({
    onSuccess: (e) => {
      console.log('create', e)
      setBlockId(e?.id)
      setIsOpen(false)
      setIsSaveOpen(false)
      toast.success('Saved')
      void ctx.templateBuilder.getAllTemplateTitles.refetch()
      void ctx.templateBuilder.getAllYourExerciseTemplates.refetch()
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllBlockTitles.invalidate()
      void ctx.template.getAllWeekTemplates.invalidate()
      void ctx.template.get.invalidate()
    },
    onError: (e) => {
      toast.error(JSON.stringify(e))
      setIsOpen(false)
    },
  })
  const { mutate: blockUpdateMutate } = api.template.update.useMutation({
    onSuccess: (e) => {
      console.log('update', e)
      setBlockId(e[1]?.id)
      setIsOpen(false)
      setIsSaveOpen(false)
      toast.success('Saved')
      void ctx.templateBuilder.getAllTemplateTitles.refetch()
      void ctx.templateBuilder.getAllYourExerciseTemplates.refetch()
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllBlockTitles.invalidate()
      void ctx.template.getAllWeekTemplates.invalidate()
      void ctx.template.get.invalidate()
      void ctx.blocks.invalidate()
      if (isProgramProps) {
        void ctx.blocks.getUserActiveProgram.invalidate()
        void ctx.blocks.getUserActiveProgramFull.invalidate({
          userId: e[1]?.userId || '',
        })
        void ctx.blocks.getAllUserProgramsTitles.invalidate({
          userId: e[1]?.userId || '',
        })
      }
    },
    onError: (e) => {
      console.log('error', e)
      toast.error(JSON.stringify(e))
      setIsOpen(false)
    },
  })

  const onSubmit = (data: PrismaBlock) => {
    setIsOpen(true)
    console.log('onSubmit')
    saveNewBlock(data)
  }

  const onUpdate = (data: PrismaBlock) => {
    setIsOpen(true)
    console.log('onUpdate')
    updateBlock(data)
  }

  const onSaveProgram = (data: PrismaBlock) => {
    console.log('onSaveProgram', data)
    return
  }

  const onResetProgram = () => {
    if (!program) return
    setBlockId(program.id)
    const resetData = {
      ...program,
      week: program.week?.map((_week) => {
        const { blockId, ...week } = _week
        return {
          ...week,
          day: week?.day?.map((_day) => {
            const { weekId, ...day } = _day
            return {
              ...day,
              exercise: day?.exercise?.map((_exercise) => {
                const { dayId, ...exercise } = _exercise
                return {
                  ...exercise,
                  set: exercise?.set?.map((_set) => {
                    const { exerciseId, ...set } = _set
                    return { ...set }
                  }),
                  ss: exercise?.ss?.map((_s) => {
                    const { exerciseId, ...s } = _s
                    return {
                      ...s,
                    }
                  }),
                }
              }),
            }
          }),
        }
      }),
    }
    reset(resetData)
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

    // @ts-ignore
    delete data?.id
    const block = {
      ...data,
      trainerId: userId,
      week: {
        create: data.week.map((week) => {
          // @ts-ignore
          delete week?.id
          // @ts-ignore
          delete week?.blockId
          return {
            ...week,
            day: {
              create: week.day.map((day) => {
                // @ts-ignore
                delete day?.id
                // @ts-ignore
                delete day?.weekId
                return {
                  ...day,
                  exercise: {
                    create: day.exercise.map((exercise) => {
                      // @ts-ignore
                      delete exercise?.id
                      // @ts-ignore
                      delete exercise?.dayId
                      return {
                        ...exercise,
                        isTemplate: false,
                        ss: {
                          create: exercise?.ss?.map((s) => {
                            // @ts-ignore
                            delete s?.id
                            // @ts-ignore
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
          // @ts-ignore
          delete week?.id
          // @ts-ignore
          delete week?.blockId
          return {
            ...week,
            day: {
              create: week.day.map((day) => {
                // @ts-ignore
                delete day?.id
                // @ts-ignore
                delete day?.weekId
                return {
                  ...day,
                  exercise: {
                    create: day.exercise.map((exercise) => {
                      // @ts-ignore
                      delete exercise?.id
                      // @ts-ignore
                      delete exercise?.dayId
                      return {
                        ...exercise,
                        isTemplate: false,
                        set: {
                          create: exercise?.set?.map((set) => {
                            // @ts-ignore
                            delete set?.id
                            // @ts-ignore
                            delete set?.exerciseId
                            return {
                              ...set,
                            }
                          }),
                        },
                        ss: {
                          create: exercise.ss.map((s) => {
                            // @ts-ignore
                            delete s?.id
                            // @ts-ignore
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

  const onAddWeekCopyPrevious = () => {
    const week = weekField.fields[weekField.fields.length - 1]
    console.log('week', week)
    if (!week) return
    console.log('week', week)
    weekField.append({
      ...week,
      day: week.day.map((day) => {
        return {
          ...day,
          isComplete: false,
          exercise: day.exercise.map((exercise) => {
            return {
              ...exercise,
              isComplete: false,
              set: [],
              ss: exercise.ss.map((ss) => {
                return {
                  ...ss,
                  exerciseId: null,
                }
              }),
            }
          }),
        }
      }),
    })
  }

  const onAddWeek = () => {
    weekField.append({
      name: '',
      isTemplate: false,
      day: [
        // @ts-ignore
        {
          exercise: [],
          isRestDay: true,
        },
        // @ts-ignore
        {
          exercise: [],
          isRestDay: true,
        },
        // @ts-ignore
        {
          exercise: [],
          isRestDay: true,
        },
        // @ts-ignore
        {
          exercise: [],
          isRestDay: true,
        },
        // @ts-ignore
        {
          exercise: [],
          isRestDay: true,
        },
        // @ts-ignore
        {
          exercise: [],
          isRestDay: true,
        },
        // @ts-ignore
        {
          exercise: [],
          isRestDay: true,
        },
      ],
    })
  }

  const onRemoveWeek = (index: number) => {
    console.log('remove week')
    weekField.remove(index)
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
      console.log('same day')
      return
    }

    if (sourceDayId === destDayId) {
      console.log('same day')
      if (!sourceArray?.move) return
      sourceArray.move(sourceIndex, destIndex)
      return
    }

    if (destDayId === 'templates'){
      console.log('destDayId templates')
      return
    }
    if (sourceDayId === 'templates') {
      const exercise = exerciseTemplates?.find(
        (t) => t.id === result.draggableId,
      )

      if (!exercise){
        console.log('no exercise')
        return
      }

      console.log('insert exercise')
      destArray.insert(destIndex, exercise)

      return
    }
    console.log('insert day')

    const sourceDay = sourceArray.fields[sourceIndex]
    destArray.insert(destIndex, sourceDay)
    sourceArray.remove(sourceIndex)
  }

  console.log('values', getValues())

  return (
    <>
      <LoadingWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <DragDropContext
        className='overflow-auto'
        // @ts-ignore
        onDragEnd={handleDrag} // TODO: workout typing issue
      >
        <div className='flex h-full w-full tracking-tight-col '>
          <FormProvider {...formMethods}>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className='flex w-full flex-col items-center '
            >
              <div className='flex w-full flex-col items-center gap-1 sm:gap-8'>
                <div className='flex min-h-[60vh] w-full flex-col items-center justify-gap-2 p-1 py-0 sm:gap-4'>
                  <FormHeader
                    setBlockId={setBlockId}
                    onSubmit={onSubmit}
                    onUpdate={onUpdate}
                    setIsSaveOpen={setIsSaveOpen}
                    isSaveOpen={isSaveOpen}
                    onResetProgram={onResetProgram}
                    onSaveProgram={onSaveProgram}
                  />
                  <ScrollArea className='w-full max-h-[calc(100vh-8rem)]'>
                    <div className='flex w-full flex-col gap-8 '>
                      {weekField.fields.map((week, weekIndex) => (
                        <FormWeek
                          key={week.id}
                          weekIdx={weekIndex}
                          onRemoveWeek={onRemoveWeek}
                        />
                      ))}
                    </div>
                    {isProgram && !isEditProgram ? null : (
                      <Dialog
                        open={isAddWeekOpen}
                        onOpenChange={setIsAddWeekOpen}
                      >
                        <DialogTrigger className='w-full'>
                          <PlusCircleIcon className='mt-12 h-12 w-12 text-gray-400 hover:text-gray-200 mx-auto' />
                        </DialogTrigger>
                        <DialogContent className='flex flex-col items-center justify-center gap-4 bg-gray-900'>
                          <DialogHeader className='flex items-center justify-center gap-2 text-xl font-semibold'>
                            Add Week
                          </DialogHeader>
                          <div className='flex flex-col items-start justify-center gap-2'>
                            <Button
                              variant='secondary'
                              onClick={(e) => {
                                e.preventDefault()
                                setIsAddWeekOpen(false)
                                onAddWeek()
                              }}
                            >
                              Add Blank
                            </Button>
                            <Button
                              variant='secondary'
                              onClick={(e) => {
                                e.preventDefault()
                                setIsAddWeekOpen(false)
                                onAddWeekCopyPrevious()
                              }}
                            >
                              Copy Previous
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </ScrollArea>

                </div>
              </div>
            </form>
          </FormProvider>
          {/* <Footer /> */}
          {isProgram && !isEditProgram ? null : <ExerciseDropper />}
        </div>
      </DragDropContext>
    </>
  )
}

export default Form

import React, { useState } from 'react'
import { atom, useAtom } from 'jotai'

import { ErrorMessage } from '@hookform/error-message'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'

import type { PrismaBlock as Block, PrismaWeek as Week } from '~/store/types'

import { cn } from '@/lib/utils'
import FormDay from './formDay'
import WeekTemplateSelect from './weekTemplateSelect'

const loadedTemplateAtom = atom<string>('')

const FormWeekHeader = ({
  weekIdx,
  setLoadedTemplate,
  onRemoveWeek,
}: {
  weekIdx: number
  setLoadedTemplate: (value: string) => void
  onRemoveWeek: (weekIdx: number) => void
}) => {
  const formMethods = useFormContext<Block>()
  const {
    register,
    reset,
    clearErrors,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = formMethods
  const { data: session } = useSession()
  const user = session?.user
  const userId = user?.id || ''

  const [selectedWeekTemplate, setSelectedWeekTemplate] = useState('')

  const ctx = api.useUtils()
  const { mutate: weekCreateMutate } = api.template.createWeek.useMutation({
    onSuccess: () => {
      toast.success('Saved')
      void ctx.blocks.getAllWeekTemplates.invalidate()
    },
    onError: () => {
      toast.error('Error')
    },
  })
  const { data: weeksData } = api.template.getAllWeekTemplates.useQuery({
    userId: user?.id || '',
  })

  const onSelectWeekTemplate = (week: string) => {
    setSelectedWeekTemplate(week)
    console.log('selected', week)
  }

  const onLoadWeekTemplate = (weekIdx: number) => {
    const weekTemplate = weeksData?.find(
      (week) => week.id === selectedWeekTemplate,
    )

    const currentTemplate = getValues()

    const update = {
      ...currentTemplate,
      week: currentTemplate.week.map((week, idx) => {
        if (idx === weekIdx) {
          return weekTemplate
        }
        return week
      }),
    }
    console.log('update', update)

    setLoadedTemplate(selectedWeekTemplate)

    // setSelectedWeekTemplate('')

    reset(update)
    toast.success('Loaded')
  }

  const onSaveWeekAsTemplate = (weekIdx: number) => {
    const name = getValues(`week.${weekIdx}.name`)

    // handle error
    if (name === '') {
      setError(`week.${weekIdx}.name`, {
        type: 'manual',
        message: 'Need a unique name',
      })
      setTimeout(() => {
        clearErrors(`week.${weekIdx}.name`)
      }, 3000)
      toast.error('Need a unique name')
      console.log('clash')
      return
    }

    const data = getValues(`week.${weekIdx}`)

    const weekData = {
      ...data,
      trainerId: userId,
      isTemplate: true,
      day: {
        create: data.day.map((day) => ({
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
    }

    weekCreateMutate(weekData)
  }

  const [isSaveOpen, setIsSaveOpen] = useState(false)
  const [isLoadOpen, setIsLoadOpen] = useState(false)

  const weekName = watch(`week.${weekIdx}.name`)

  return (
    <div className='flex items-center justify-center gap-12 pb-2 pt-1'>
      <div className='text-xl font-bold'>
        {weekName ? weekName : `Week ${weekIdx + 1}`}
      </div>
      <div className='flex gap-2'>
        <Dialog
          open={isSaveOpen}
          onOpenChange={setIsSaveOpen}
        >
          <DialogTrigger asChild>
            <Button
              type='button'
              size='sm'
              variant='secondary'
              className='h-7 tracking-tighter'
            >
              Save
            </Button>
          </DialogTrigger>

          <DialogContent className='flex flex-col items-center justify-center gap-4 bg-gray-900'>
            <DialogHeader className='flex items-center justify-center gap-2 text-xl font-semibold'>
              Save Template
            </DialogHeader>
            <div className='flex flex-col items-start justify-center gap-2'>
              <div className='relative rounded-md px-4 shadow-lg'>
                <Input
                  className='w-40 bg-gray-900  md:w-64 '
                  placeholder='Title'
                  defaultValue={``}
                  {...register(`week.${weekIdx}.name`)}
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
            <div className='flex gap-4'>
              <Button
                type='submit'
                variant='secondary'
                onClick={() => {
                  setIsSaveOpen(false)
                  onSaveWeekAsTemplate(weekIdx)
                }}
              >
                Save New
              </Button>
              <Button
                type='submit'
                variant='secondary'
                onClick={() => {
                  setIsSaveOpen(false)
                }}
              >
                Update
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isLoadOpen}
          onOpenChange={setIsLoadOpen}
        >
          <DialogTrigger asChild>
            <Button
              type='button'
              size='sm'
              variant='secondary'
              className='h-7 tracking-tighter'
            >
              Load
            </Button>
          </DialogTrigger>

          <DialogContent className='flex flex-col items-center justify-center gap-4 bg-gray-900'>
            <DialogHeader className='flex items-center justify-center gap-2 text-xl font-semibold'>
              Save Template
            </DialogHeader>
            <WeekTemplateSelect
              onSelectWeekTemplate={onSelectWeekTemplate}
              selectedWeekTemplate={selectedWeekTemplate}
            />
            <div className='flex gap-4'>
              <Button
                type='submit'
                variant='secondary'
                onClick={() => {
                  onLoadWeekTemplate(weekIdx)
                  setIsLoadOpen(false)
                }}
              >
                Load
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          type='button'
          size='sm'
          variant='secondary'
          className='h-7 tracking-tighter'
          onClick={() => onRemoveWeek(weekIdx)}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

const FormWeek = ({
  weekIdx,
  onRemoveWeek,
}: {
  weekIdx: number
  onRemoveWeek: (weekIdx: number) => void
}) => {
  const formMethods = useFormContext<Block>()
  const {
    control,
    reset,
    getValues,
    formState: { errors },
  } = formMethods

  const dayField = useFieldArray({
    control,
    name: `week.${weekIdx}.day`,
  })

  const [loadedTemplate, setLoadedTemplate] = useAtom(loadedTemplateAtom)

  const { data: session } = useSession()
  const user = session?.user
  const userId = user?.id || ''

  return (
    <div className='flex flex-col gap-1 rounded-lg bg-gray-900 px-2 py-2 '>
      <FormWeekHeader
        weekIdx={weekIdx}
        setLoadedTemplate={setLoadedTemplate}
        onRemoveWeek={onRemoveWeek}
      />
      <div className='flex min-h-80 w-full gap-1'>
        {dayField.fields.map((day, dayIndex) => {
          return (
            <div
              key={day?.id || dayIndex}
              className={cn(
                'rounded-md bg-gray-800/60 p-2 hover:bg-gray-900',
                'flex w-[14.3%] flex-col items-center gap-1',
                day.isRestDay === true ? '' : '',
              )}
            >
              <h1 className='text-xl font-bold'>Day {dayIndex + 1}</h1>
              <FormDay
                weekIdx={weekIdx}
                dayIdx={dayIndex}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FormWeek

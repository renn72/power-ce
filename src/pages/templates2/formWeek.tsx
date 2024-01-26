import React, { useState } from 'react'
import { atom, useAtom } from 'jotai'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { ErrorMessage } from '@hookform/error-message'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'

import { type Block } from '~/store/types'

import { cn } from '@/lib/utils'
import FormDay from './formDay'
import WeekTemplateSelect from './weekTemplateSelect'

const loadedTemplateAtom = atom<string>('')

const FormWeek = ({ weekIdx }: { weekIdx: number }) => {
  const formMethods = useFormContext<Block>()
  const {
    control,
    register,
    reset,
    clearErrors,
    getValues,
    setError,
    formState: { errors },
  } = formMethods

  const dayField = useFieldArray({
    control,
    name: `week.${weekIdx}.day`,
  })

  const [selectedWeekTemplate, setSelectedWeekTemplate] = useState('')
  const [loadedTemplate, setLoadedTemplate] = useAtom(loadedTemplateAtom)

  const { data: session } = useSession()
  const user = session?.user

  const ctx = api.useUtils()
  const { data: weeksData } = api.blocks.getAllWeekTemplates.useQuery({
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
    // toast.success('Loaded')
  }

  const handleDrag = (result) => {
    console.log('result', result)
    console.log('days', dayField.fields)
    const { source, destination } = result

    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    const newDayFields = [...dayField.fields]
    const [removed] = newDayFields.splice(source.index, 1)
  }

  const restDays = dayField.fields.reduce(
    (a, i) => a + (i.isRestDay ? 1 : 0),
    0,
  )
  console.log(restDays)

  return (
    <div className='flex flex-col gap-1 rounded-lg'>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <div className='relative flex flex-col gap-2'>
            <Input
              className='text-xs sm:text-sm'
              placeholder='Week Name'
              defaultValue={``}
              {...register(`week.${weekIdx}.name`)}
              onChange={() => clearErrors(`week.${weekIdx}.name`)}
            />
            <div className='absolute top-12'>
              <ErrorMessage
                errors={errors}
                name={`week.${weekIdx}.name`}
                render={({ message }) => (
                  <p className='text-red-400'>{message}</p>
                )}
              />
            </div>
          </div>
          <Button
            type='button'
            className='text-xs sm:text-sm'
            onClick={() => onSaveWeekAsTemplate(weekIdx)}
          >
            Save
          </Button>
          <Button
            type='button'
            className='text-xs sm:text-sm'
            onClick={() => onUpdateWeekAsTemplate(weekIdx)}
          >
            Update
          </Button>
        </div>
        <div className='flex items-center gap-2'>
          <WeekTemplateSelect
            onSelectWeekTemplate={onSelectWeekTemplate}
            selectedWeekTemplate={selectedWeekTemplate}
          />
          <Button
            type='button'
            className='text-xs sm:text-sm'
            onClick={() => onLoadWeekTemplate(weekIdx)}
          >
            Load
          </Button>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDrag}>
        <div className='flex min-h-80 w-full gap-1'>
          {dayField.fields.map((day, dayIndex) => {
            return (
              <div
                key={day?.id || dayIndex}
                className={cn(
                  'rounded-md bg-gray-900/70 p-2 hover:bg-gray-900/90',
                  'flex flex-col items-center gap-1',
                  day.isRestDay === true ? 'shrink grow' : `w-1/${8 - restDays}`,
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
      </DragDropContext>
    </div>
  )
}

export default FormWeek

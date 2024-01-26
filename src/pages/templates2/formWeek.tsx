import React, { useState } from 'react'
import { atom } from 'jotai'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { ErrorMessage } from '@hookform/error-message'

import {
  useFieldArray,
  useFormContext,
} from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { type Block } from '~/store/types'

import { cn } from '@/lib/utils'
import FormDay from './formDay'

export const selectedTemplateAtom = atom('')
export const isSuperAdminAtom = atom(false)

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

  const onSaveWeekAsTemplate = (weekIdx: number) => {
    console.log('onSaveWeekAsTemplate', weekIdx)
  }

  const onUpdateWeekAsTemplate = (weekIdx: number) => {
    console.log('onUpdateWeekAsTemplate', weekIdx)
  }

  const onLoadWeekTemplate = (weekIdx: number) => {
    console.log('onLoadWeekTemplate', weekIdx)
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
  }

  return (
    <div className='flex flex-col'>
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
        <div>selector</div>
        <Button
          type='button'
          className='text-xs sm:text-sm'
          onClick={() => onLoadWeekTemplate(weekIdx)}
        >
          Load
        </Button>
      </div>
        <DragDropContext onDragEnd={handleDrag}>
      <div className='flex gap-1 mt-8'>
        {dayField.fields.map((day, dayIndex) => {
          return (
            <div
              key={day?.id || dayIndex}
              className={cn(
                'grow p-2 rounded-md bg-gray-900/60 hover:bg-gray-900/80',
                'flex flex-col gap-2 items-center',
                day.isRestDay === true ? 'w-30' : '',
              )}
            >
              <h1
                className='text-2xl font-bold'
              >Day {dayIndex+1}</h1>
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

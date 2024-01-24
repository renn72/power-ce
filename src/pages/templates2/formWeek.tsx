import React, { useState } from 'react'
import { atom } from 'jotai'

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
      <div className='flex mt-8'>
        {dayField.fields.map((day, dayIndex) => {
          return (
            <div
              key={day?.id || dayIndex}
              className={cn(
                'grow p-2 hover:rounded-md hover:bg-gray-900/70 transform tranistion-all duration-200 ease-in-out',
                'flex flex-col gap-2 items-center',
                day.isRestDay === true ? 'shrink' : 'shrink',
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
    </div>
  )
}

export default FormWeek

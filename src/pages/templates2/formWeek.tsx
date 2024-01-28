import React, { useState } from 'react'
import { atom, useAtom } from 'jotai'

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
    setValue,
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


  const restDays = dayField.fields.reduce(
    (a, i) => a + (i.isRestDay ? 1 : 0),
    0,
  )

  return (
    <div className='flex flex-col gap-1 rounded-lg bg-gray-900 px-2 py-2 '>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <div className='relative flex flex-col gap-2'>
            <Input
              className='bg-gray-900 text-xs sm:text-sm'
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
            className='bg-gray-900 text-xs sm:text-sm'
            onClick={() => onSaveWeekAsTemplate(weekIdx)}
          >
            Save
          </Button>
          <Button
            type='button'
            className='bg-gray-900 text-xs sm:text-sm'
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
            className='bg-gray-900 text-xs sm:text-sm'
            onClick={() => onLoadWeekTemplate(weekIdx)}
          >
            Load
          </Button>
        </div>
      </div>
        <div className='flex min-h-80 w-full gap-1'>
          {dayField.fields.map((day, dayIndex) => {
            return (
              <div
                key={day?.id || dayIndex}
                className={cn(
                  'rounded-md bg-gray-800/60 p-2 hover:bg-gray-900',
                  'flex flex-col items-center gap-1 w-[14.3%]',
                  day.isRestDay === true
                    ? ''
                    : '',
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

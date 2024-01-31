import React, { useState } from 'react'
import { atom, useAtom } from 'jotai'

import { ErrorMessage } from '@hookform/error-message'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'

import { type PrismaBlock as Block } from '~/store/types'

import { cn } from '@/lib/utils'
import FormDay from './formDay'
import WeekTemplateSelect from './weekTemplateSelect'

const loadedTemplateAtom = atom<string>('')

const FormWeekHeader = ({ weekIdx }: { weekIdx: number }) => {
  const formMethods = useFormContext<Block>()
  const {
    control,
    register,
    reset,
    clearErrors,
    getValues,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = formMethods

  const weekName = watch(`week.${weekIdx}.name`)

  return (
    <div className='flex items-center justify-center gap-8 p-1'>
      <div className='text-xl font-bold'>
        {weekName ? weekName : `Week ${weekIdx + 1}`}
      </div>
      <Button
        type='button'
        size='sm'
        className='bg-gray-900 text-xs sm:text-sm'
      >
        Save
      </Button>
    </div>
  )
}

const FormWeek = ({ weekIdx }: { weekIdx: number }) => {
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
    toast.success('Loaded')
  }

  return (
    <div className='flex flex-col gap-1 rounded-lg bg-gray-900 px-2 py-2 '>
      <FormWeekHeader weekIdx={weekIdx} />
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

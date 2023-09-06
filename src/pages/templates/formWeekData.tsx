import { useState, } from 'react'
import { useFormContext, } from 'react-hook-form'
import { ErrorMessage, } from '@hookform/error-message'
import {
  Disclosure, Transition,
} from '@headlessui/react'
import { ChevronUpIcon, } from '@heroicons/react/20/solid'

import { toast, } from 'react-hot-toast'
import { api, } from '~/utils/api'
import { Button, } from '@/components/ui/button'
import { Input, } from '@/components/ui/input'
import FormWeek from './formWeek'
import WeekTemplateSelect from './weekTemplateSelect'

import { type WeekData, } from '~/store/types'
import { type Block, } from '~/store/types'

const FormWeekData = ({ weekIdx, }: { weekIdx: number }) => {
  const formMethods = useFormContext<Block>()
  const {
    register, reset, clearErrors, getValues, setError, formState: { errors, },
  } = formMethods

  const [
    selectedWeekTemplate,
    setSelectedWeekTemplate,
  ] = useState('')

  const ctx = api.useContext()
  const { data: weeksData, } = api.blocks.getAllWeekTemplates.useQuery()

  const { mutate: weekCreateMutate, } = api.blocks.createWeek.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success('Saved')
      void ctx.blocks.getAllWeekTemplates.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const onSaveWeekAsTemplate = (weekIdx: number) => {
    console.log('onSaveWeekAsTemplate', weekIdx)
    const name = getValues(`week.${weekIdx}.name`)
    console.log('name', name)

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

    const week = getValues(`week.${weekIdx}`)
    console.log('week', week)

    const weekData: WeekData = {
      name: week.name,
      isTemplate: true,
      day: week.day.map(
        (day) => ({
          isRestDay: day.isRestDay,
          isComplete: false,
          exercise: day.exercise.map(
            (exercise) => ({
              name: exercise.name ? exercise.name : '',
              lift: exercise.lift ? exercise.lift : '',
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
              isComplete: false

            })
          ),
        })
      ),
    }
    weekCreateMutate(weekData)
  }

  const onSelectWeekTemplate = (week: string) => {
    console.log('onSelectWeekTemplate', weekIdx, '-', week)
    setSelectedWeekTemplate(week)
  }

  const onLoadWeekTemplate = (weekIdx: number) => {
    console.log('weeksdata', weeksData)
    const weekTemplate = weeksData?.find((week) => week.id === selectedWeekTemplate)
    console.log('onLoadWeekTemplate', weekTemplate)

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

    reset(update)

    console.log('values', getValues())

    setSelectedWeekTemplate('')
    toast.success('Loaded')
  }

  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='flex gap-2'>
            <div className='relative flex flex-col gap-2'>
              <Input
                className='text-xs sm:text-sm'
                placeholder='Week Name'
                defaultValue={``}
                {...register(`week.${weekIdx}.name`,)}
                onChange={() => clearErrors(`week.${weekIdx}.name`)}
              />
              <div className='absolute top-12'>
                <ErrorMessage
                  errors={errors}
                  name={`week.${weekIdx}.name`}
                  render={({ message, }) => <p className='text-red-400'>{message}</p>}
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
          </div>
          <div className='flex gap-2'>
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
        <div
          className='md:px-6'
        >
          <FormWeek weekIdx={weekIdx} />
        </div>
      </div>
    </>
  )
}

export default FormWeekData

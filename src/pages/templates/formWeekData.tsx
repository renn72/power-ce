import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormWeek from './formWeek'
import WeekTemplateSelect from './weekTemplateSelect'

import { type WeekData } from '~/store/types'
import { type Block } from '~/store/types'
import { atom, useAtom } from 'jotai'
import { useUser } from '@clerk/nextjs'

const loadedTemplateAtom = atom<string>('')

const FormWeekData = ({ weekIdx }: { weekIdx: number }) => {
  const formMethods = useFormContext<Block>()
  const {
    register,
    reset,
    clearErrors,
    getValues,
    setError,
    formState: { errors },
  } = formMethods

  const [selectedWeekTemplate, setSelectedWeekTemplate] = useState('')

  const [loadedTemplate, setLoadedTemplate] = useAtom(loadedTemplateAtom)

  const { user } = useUser()

  const ctx = api.useContext()
  const { data: weeksData } = api.blocks.getAllWeekTemplates.useQuery({
    userId: user?.id || '',
  })

  const { mutate: weekCreateMutate } = api.blocks.createWeek.useMutation({
    onSuccess: () => {
      toast.success('Saved')
      void ctx.blocks.getAllWeekTemplates.invalidate()
    },
    onError: () => {
      toast.error('Error')
    },
  })
  const { mutate: weekUpdateMutate } = api.blocks.updateWeek.useMutation({
    onSuccess: () => {
      toast.success('Saved')
      void ctx.blocks.getAllWeekTemplates.invalidate()
    },
    onError: () => {
      toast.error('Error')
    },
  })

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

    const week = getValues(`week.${weekIdx}`)

    const weekData: WeekData = {
      name: week.name,
      isTemplate: true,
      day: week.day.map((day) => ({
        isRestDay: day.isRestDay,
        isComplete: false,
        warmupTemplateId: day.warmupTemplateId,
        exercise: day.exercise.map((exercise) => ({
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
          isComplete: false,
          isSS: exercise.isSS || false,
          ss: exercise.ss.map((s) => ({
            name: s.name,
            onerm: s.onerm ? +s.onerm : null,
            onermTop: s.onermTop ? +s.onermTop : null,
            weightTop: s.weightTop ? +s.weightTop : null,
            weightBottom: s.weightBottom ? +s.weightBottom : null,
            targetRpe: s.targetRpe ? +s.targetRpe : null,
            reps: s.reps ? +s.reps : null,
            weightType: s.weightType,
            repUnit: s.repUnit,
          })),
        })),
      })),
    }
    weekCreateMutate(weekData)
  }

  const onUpdateWeekAsTemplate = (weekIdx: number) => {
    console.log('update', loadedTemplate)

    const week = getValues(`week.${weekIdx}`)

    const weekData: WeekData = {
      id: loadedTemplate,
      name: week.name,
      isTemplate: true,
      day: week.day.map((day) => ({
        id: loadedTemplate,
        isRestDay: day.isRestDay,
        isComplete: false,
        warmupTemplateId: day.warmupTemplateId,
        exercise: day.exercise.map((exercise) => ({
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
          isComplete: false,
          isSS: exercise.isSS || false,
          ss: exercise.ss.map((s) => ({
            name: s.name,
            onerm: s.onerm ? +s.onerm : null,
            onermTop: s.onermTop ? +s.onermTop : null,
            weightTop: s.weightTop ? +s.weightTop : null,
            weightBottom: s.weightBottom ? +s.weightBottom : null,
            targetRpe: s.targetRpe ? +s.targetRpe : null,
            reps: s.reps ? +s.reps : null,
            weightType: s.weightType,
            repUnit: s.repUnit,
          })),
        })),
      })),
    }
    weekUpdateMutate(weekData)
  }

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
    <>
      <div className='flex flex-col gap-6'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
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
        <div className='md:px-6'>
          <FormWeek weekIdx={weekIdx} />
        </div>
      </div>
    </>
  )
}

export default FormWeekData

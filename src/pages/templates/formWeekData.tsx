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
          exercise: day.exercise.map(
            (exercise) => ({
              name: exercise.name ? exercise.name : '',
              lift: exercise.lift ? exercise.lift : '',
              onerm: exercise.onerm ? +exercise.onerm : null,
              onermTop: exercise.onermTop ? +exercise.onermTop : null,
              sets: exercise.sets ? +exercise.sets : null,
              reps: exercise.reps ? +exercise.reps : null,
              isEstimatedOnerm: exercise.isEstimatedOnerm,
              notes: exercise.notes ? exercise.notes : '',
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
    const weekTemplate = weeksData?.filter((week) => week.name === selectedWeekTemplate)[0]
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

    reset(update)

    setSelectedWeekTemplate('')
    toast.success('Loaded')
  }

  return (
    <>
      <Disclosure defaultOpen={true} >
        {({ open, }) => (
          <div className='flex flex-col gap-8 border border-gray-400 min-w-full p-2 rounded-xl'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-6'>
              <Disclosure.Button className='flex justify-between items-center gap-2 rounded-lg px-8 py-2 text-left text-base sm:text-lg hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                <span>{`Week ${weekIdx + 1}`}</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-8 w-8 text-gray-400`}
                />
              </Disclosure.Button>
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

            <Transition
              className='transition-all duration-300 ease-out'
              enterFrom='transform scale-70 opacity-0'
              enterTo='transform scale-100 opacity-100'
              leaveFrom='transform scale-100 opacity-100'
              leaveTo='transform scale-70 opacity-0'
            >
              <Disclosure.Panel>
                <FormWeek weekIdx={weekIdx} />
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </>
  )
}

export default FormWeekData

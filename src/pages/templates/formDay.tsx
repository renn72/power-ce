import { useFieldArray, useFormContext, Controller } from 'react-hook-form'

import {
  PlusCircleIcon,
} from '@heroicons/react/24/outline'

import { Button } from '@/components/ui/button'
import { Switch } from '@headlessui/react'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import FormExercise from './formExercise'
import { useEffect } from 'react'

const FormDay = ({ weekIdx, dayIdx }: { weekIdx: number; dayIdx: number }) => {
  const formMethods = useFormContext()
  const { control, watch, getValues } = formMethods

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  const exerciseArray = getValues(`week.${weekIdx}.day.${dayIdx}.exercise`)

  const onRemoveExercise = (index: number) => {
    exerciseField.remove(index)
  }

  const onInsertExercise = (index: number) => {
    exerciseField.insert(index + 1, {
      name: '',
      lift: 'unlinked',
      sets: '',
      reps: '',
      onerm: '',
      onermTop: '',
      weightTop: '',
      weightBottom: '',
      targetRpe: '',
      notes: '',
      weightType: '',
      repUnit: '',
      htmlLink: '',
      isSS: false,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isRest: boolean = watch(`week.${weekIdx}.day.${dayIdx}.isRestDay`)

  useEffect(() => {
    if (isRest) {
      exerciseField.remove()
    }
  }, [isRest])

  const [parent] = useAutoAnimate(/* optional config */)

  return (
    <>
      <div className='flex flex-col items-stretch justify-center gap-2'>
        <Controller
          control={control}
          name={`week.${weekIdx}.day.${dayIdx}.isRestDay`}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <div className='mb-2 flex items-center justify-start gap-4 text-lg text-gray-600 sm:gap-6'>
              <label className={value ? `scale-110 text-gray-200` : ``}>
                Rest Day
              </label>
              <Switch
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                checked={value}
                onChange={onChange}
                className={`${value ? 'bg-gray-200' : 'bg-gray-600'}
          relative inline-flex h-[24px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75  sm:h-[28px] sm:w-[74px]`}
              >
                <span className='sr-only'>Is it a Rest Day</span>
                <span
                  aria-hidden='true'
                  className={`${value ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[24px] transform rounded-full bg-gray-900 shadow-lg ring-0 transition duration-200 ease-in-out sm:h-[24px] sm:w-[34px]`}
                />
              </Switch>
            </div>
          )}
        />
        <ul
          ref={parent}
          className='mb-12 flex flex-col gap-12'
        >
          {exerciseField.fields.map((item, index) => {
            return (
              <li key={item.id}>
                <FormExercise
                  weekIdx={weekIdx}
                  dayIdx={dayIdx}
                  exerciseIdx={index}
                  onRemoveExercise={onRemoveExercise}
                />
                <PlusCircleIcon
                  className='mx-auto mt-8 h-8 w-8 text-gray-400 hover:text-gray-200'
                  onClick={() => onInsertExercise(index)}
                />
              </li>
            )
          })}
        </ul>
        <div className='mx-auto flex gap-2'>
          <Button
            type='button'
            className={`border-0 text-gray-200 ${
              exerciseArray?.length === 0 ? '' : 'hidden'
            }`}
            disabled={isRest}
            onClick={() => exerciseField.append({})}
          >
            <PlusCircleIcon
              className={isRest ? `h-10 w-10` : `h-10 w-10 hover:scale-110`}
            />
          </Button>
        </div>
      </div>
    </>
  )
}

export default FormDay

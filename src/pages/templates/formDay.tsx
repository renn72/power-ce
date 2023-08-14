import {
  useFieldArray, useFormContext, Controller,
} from 'react-hook-form'

import {
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { Button, } from '@/components/ui/button'
import { Switch, } from '@headlessui/react'

import { useAutoAnimate, } from '@formkit/auto-animate/react'

import FormExercise from './formExercise'
import { useEffect, } from 'react'

const FormDay = ({
  weekIdx, dayIdx,
}:
  { weekIdx: number, dayIdx: number }) => {
  const formMethods = useFormContext()
  const {
    control, watch,
  } = formMethods

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  console.log('exerciseField', exerciseField)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isRest = watch(`week.${weekIdx}.day.${dayIdx}.isRestDay`)

  useEffect(() => {
    if (isRest) {
      exerciseField.remove()
    }
  }, [isRest,])

  const [parent,] = useAutoAnimate(/* optional config */)

  return (
    <>
      <div className='flex flex-col justify-center items-stretch gap-2'>
        <div className='flex justify-start items-center sm:gap-4 mb-2'>
          <label>rest day</label>
          <Controller
            control={control}
            name={`week.${weekIdx}.day.${dayIdx}.isRestDay`}
            defaultValue={false}
            render={({
              field: {
                onChange, value,
              },
            }) => (

              <Switch
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                checked={value}
                onChange={onChange}
                className={`${value ? 'bg-gray-200' : 'bg-gray-600'}
          relative inline-flex h-[18px] w-[64px] sm:h-[28px] sm:w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className='sr-only'>Is it a Rest Day</span>
                <span
                  aria-hidden='true'
                  className={`${value ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[14px] w-[24px] sm:h-[24px] sm:w-[34px] transform rounded-full bg-gray-900 shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            )}
          />
        </div>
        <ul ref={parent} className='flex flex-col gap-4 mb-2'>
          {exerciseField.fields.map((item, index) => {
            return (
              <FormExercise
                key={item.id}
                weekIdx={weekIdx}
                dayIdx={dayIdx}
                exerciseIdx={index}
              />
            )
          })}
        </ul>
        <div className='flex gap-2 mx-auto'>
          <Button
            type='button'
            className='border-0'
            onClick={() => exerciseField.append({})}
          >
            <PlusCircleIcon className='w-8 h-8 hover:scale-110' />
          </Button>
          <Button
            type='button'
            className='border-0'
            onClick={() => exerciseField.remove(exerciseField.fields.length - 1)}
          >
            <MinusCircleIcon className='w-8 h-8 hover:scale-90' />
          </Button>
        </div>

      </div>
    </>
  )
}

export default FormDay

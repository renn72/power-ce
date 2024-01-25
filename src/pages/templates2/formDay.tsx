import { useFieldArray, useFormContext, Controller } from 'react-hook-form'

import { api } from '~/utils/api'

import {
  PlusCircleIcon,
} from '@heroicons/react/24/outline'

import { Switch, } from '@headlessui/react'
import { type PrismaBlock } from '~/store/types'
import { type Set, SuperSet as SS } from '@prisma/client'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { useEffect } from 'react'
import { LoadingSpinner } from '~/components/loading'

import { cn } from '@/lib/utils'
import Warmup from './warmup'
import { useSession } from 'next-auth/react'
import FormExercise from './formExercise'

const FormDay = ({ weekIdx, dayIdx }: { weekIdx: number; dayIdx: number }) => {
  const formMethods = useFormContext<PrismaBlock>()
  const { control, watch, getValues } = formMethods

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  api.warmups.getAll.useQuery()

  const exerciseArray = getValues(`week.${weekIdx}.day.${dayIdx}.exercise`)

  const onRemoveExercise = (index: number) => {
    exerciseField.remove(index)
  }

  const onInsertExercise = (index: number) => {
    exerciseField.insert(index + 1, {
      id: '',
      name: '',
      lift: 'unlinked',
      sets: null,
      reps: null,
      onerm: null,
      onermTop: null,
      weightTop: null,
      weightBottom: null,
      targetRpe: null,
      notes: '',
      weightType: '',
      repUnit: '',
      htmlLink: '',
      isSS: false,
      isEstimatedOnerm: false,
      estimatedOnermIndex: null,
      field1: '',
      field2: '',
      tempoDown: null,
      tempoUp: null,
      tempoPause: null,
      isComplete: false,
      ss: [] as SS[],
      set: [] as Set[],
    })
  }

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
            <div className='mb-2 flex flex-col items-center justify-center gap-0 text-lg text-gray-600'>
              <label className={value ? `` : `hidden`}>Rest Day</label>
              <Switch
                checked={value}
                onChange={onChange}
                className={cn(
                  value ? 'bg-gray-200' : 'bg-gray-600',
                  'relative inline-flex h-[24px] w-[64px] shrink-0 cursor-pointer rounded-full',
                  'border-2 border-transparent transition-colors duration-200 ease-in-out',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                  'sm:h-[28px] sm:w-[74px]',
                )}
              >
                <span className='sr-only'>Is it a Rest Day</span>
                <span
                  aria-hidden='true'
                  className={cn(
                    value ? 'translate-x-9' : 'translate-x-0',
                    'pointer-events-none inline-block h-[20px] w-[24px] transform rounded-full bg-gray-900',
                    'shadow-lg ring-0 transition duration-150 ease-in-out sm:h-[24px] sm:w-[34px]',
                  )}
                />
              </Switch>
            </div>
          )}
        />
        <Warmup 
          weekIdx={weekIdx}
          dayIdx={dayIdx}
        />
        <div
          ref={parent}
          className='mb-24 flex flex-col gap-20'
        >
          {exerciseField.fields.map((item, index) => {
            return (
              <FormExercise
                key={item.id}
                exercise={item}
                exerciseIdx={index}
                weekIdx={weekIdx}
                dayIdx={dayIdx}
                onInsertExercise={onInsertExercise}
              />
            )
          })}
        </div>
        <div className='mx-auto flex gap-2 bg-opacity-100'>
          <PlusCircleIcon
            onClick={() => onInsertExercise(0)}
            className={cn(
              isRest
                ? 'hidden h-10 w-10'
                : 'h-10 w-10 text-gray-400 hover:scale-110 hover:text-gray-200',
              exerciseArray?.length === 0 ? '' : 'hidden',
            )}
          />
        </div>
      </div>
    </>
  )
}

export default FormDay

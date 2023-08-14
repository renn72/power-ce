import {
  useFormContext, Controller, useFieldArray,
} from 'react-hook-form'

import { Fragment, } from 'react'

import { useAtom, } from 'jotai'

import LiftPicker from './liftPicker'
import { Input, } from '@/components/ui/input'

import {
  Listbox, Transition,
} from '@headlessui/react'

import {
  squatAtom, deadliftAtom, benchAtom,
} from '~/store/store'

import {
  ChevronUpDownIcon, CheckIcon, XCircleIcon,
} from '@heroicons/react/24/outline'

import getWeight from '~/utils/getWeight'

import { type Block, } from '~/store/types'
import { Checkbox, } from '@/components/ui/checkbox'

const GetWeight = ({
  week, day, exercise,
}: { week: number, day: number, exercise: number }) => {
  const [squat,] = useAtom(squatAtom)
  const [deadlift,] = useAtom(deadliftAtom)
  const [bench,] = useAtom(benchAtom)
  const formMethods = useFormContext<Block>()

  const watch = formMethods.watch([
    `week.${week}.day.${day}.exercise.${exercise}.onerm`,
    `week.${week}.day.${day}.exercise.${exercise}.lift`,
    `week.${week}.day.${day}.exercise.${exercise}.onermTop`,
  ])

  const checkWeight = () => {
    const lift = watch[1] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.lift
    const onerm = watch[0] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.onerm
    const onermTop = watch[2] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.onerm

    if (!lift) return null
    if (!onerm) return null
    if (lift === 'unlinked') return null

    if (lift === 'Squat') {
      if (onermTop) {
        return `${getWeight(squat, +onerm)} - ${getWeight(squat, +onermTop)}kg`
      } else {
        return `${getWeight(squat, +onerm)} - ${getWeight(squat, +onerm * 1.05)}kg`
      }
    }
    if (lift === 'Deadlift') {
      if (onermTop) {
        return `${getWeight(deadlift, +onerm)} - ${getWeight(deadlift, +onermTop)}kg`
      } else {
        return `${getWeight(deadlift, +onerm)} - ${getWeight(deadlift, +onerm * 1.05)}kg`
      }
    }
    if (lift === 'Bench') {
      if (onermTop) {
        return `${getWeight(bench, +onerm)} - ${getWeight(bench, +onermTop)}kg`
      } else {
        return `${getWeight(bench, +onerm)} - ${getWeight(bench, +onerm * 1.05)}kg`
      }
    }
    return null
  }

  return (
    <div>
      {checkWeight()}
    </div>
  )
}

const FormExercise = ({
  weekIdx, dayIdx, exerciseIdx,
}:
  { weekIdx: number, dayIdx: number, exerciseIdx: number }) => {
  const formMethods = useFormContext()
  const {
    register, control,
  } = formMethods

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  return (

    <div className='flex flex-col justify-center'>
      <div
        className='text-lg p-1'
      >
        {exerciseIdx + 1}
      </div>
      <li className='flex flex-col gap-2'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
          <div className='flex flex-col justify-center'>
            <Controller
              control={control}
              name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.lift`}
              defaultValue='unlinked'
              render={({
                field: {
                  onChange, value,
                },
              }) => (<LiftPicker onChange={onChange} value={value} />)}
            />
          </div>
          <Input
            className='hover:bg-gray-800'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`,)}
            placeholder='name'
          />
          <Input
            className='hover:bg-gray-800'
            type='number'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.sets`, { valueAsNumber: true, })}
            placeholder='sets'
          />
          <Input
            className='hover:bg-gray-800'
            type='number'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.reps`, { valueAsNumber: true, })}
            placeholder='reps'
          />
        </div>
        <div className='grid grid-cols-4 gap-2'>
          <Input
            className='hover:bg-gray-800'
            type='number'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`, { valueAsNumber: true, })}
            placeholder='1rm percent'
          />
          <Input
            className='hover:bg-gray-800'
            type='number'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onermTop`, { valueAsNumber: true, })}
            placeholder='1rm percent top'
          />
          <div className='text-sm flex flex-col items-center justify-center'>
            <GetWeight
              week={weekIdx}
              day={dayIdx}
              exercise={exerciseIdx}
            />
          </div>
        </div>
        <div className='grid grid-cols-4 gap-2'>
          <Input
            className='hover:bg-gray-800'
            type='number'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightBottom`, { valueAsNumber: true, })}
            placeholder='weight bottom'
          />
          <Input
            className='hover:bg-gray-800'
            type='number'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.weightTop`, { valueAsNumber: true, })}
            placeholder='weight top'
          />
          <div className='text-sm flex flex-col items-center justify-center'>
            <GetWeight
              week={weekIdx}
              day={dayIdx}
              exercise={exerciseIdx}
            />
          </div>
        </div>
        <div className='flex gap-2 items-center justify-between'>
          <Input
            className='hover:bg-gray-800'
            type='text'
            {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.notes`)}
            placeholder='notes'
          />

          <Controller
            control={control}
            name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.estimatedOnermIndex`}
            defaultValue={null}
            render={({
              field: {
                onChange, value,
              },
            }) => (
              <div className='flex items-center gap-2'>
                <Listbox
                  value={value}
                  onChange={onChange}
                >
                  <div className='relative text-xs sm:text-sm w-24 h-10'>
                    <Listbox.Button className='relative h-full w-full border border-gray-600 cursor-default rounded-lg py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300'>
                      <span className={value ? `flex items-center` : `flex items-center text-gray-400`}>{value || 'e1rm'}</span>
                      <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                        <ChevronUpDownIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options className='absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 border border-gray-600 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {exerciseField?.fields?.map((_, idx) => (
                          <Listbox.Option
                            key={idx}
                            className={({ active, }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-200'
                              }`
                            }
                            value={idx + 1}
                          >
                            {({ selected, }) => (
                              <>
                                <span
                                  className={`block capitalize truncate ${selected ? 'font-bold' : 'font-semibold'
                                    }`}
                                >
                                  {idx + 1}
                                </span>
                                {selected
                                  ? (
                                    <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                    </span>
                                  )
                                  : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                <XCircleIcon
                  className='h-6 w-6 text-gray-400 cursor-pointer'
                  onClick={() => onChange(null)}
                />
              </div>
            )}
          />

        </div>
      </li>
    </div>
  )
}

export default FormExercise

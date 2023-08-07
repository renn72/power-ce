import {
  useFormContext, Controller,
} from 'react-hook-form'
import { useAtom, } from 'jotai'

import LiftPicker from './liftPicker'
import { Input, } from '@/components/ui/input'

import {
  squatAtom, deadliftAtom, benchAtom,
} from '~/store/store'

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

  return (

    <li className='flex flex-col gap-2'>
      <div className='grid grid-cols-3 md:grid-cols-7 gap-2'>
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
          {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`, { valueAsNumber: true, })}
          placeholder='1rm percent'
        />
        <Input
          className='hover:bg-gray-800'
          type='number'
          {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onermTop`, { valueAsNumber: true, })}
          placeholder='1rm percent top'
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
          name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.isEstimatedOnerm`}
          defaultValue={false}
          render={({
            field: {
              onChange, value,
            },
          }) => (
            <div className='flex text-gray-400 gap-2 items-center'>
              <label htmlFor='isEstimatedOnerm' className='text-sm'>e1rm</label>
              <Checkbox
                id='isEstimatedOnerm'
                className='hover:bg-gray-800 w-6 h-6 '
                  onCheckedChange={() => onChange(!value)}
                  checked={value}
              />
            </div>
          )}
        />

      </div>
    </li>
  )
}

export default FormExercise

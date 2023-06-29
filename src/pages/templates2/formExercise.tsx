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

import { type Block, } from './types'

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
  ])

  const checkWeight = () => {
    const lift = watch[1] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.lift
    const onerm = watch[0] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.onerm

    if (!lift) return null
    if (!onerm) return null
    if (lift === 'unlinked') return null

    if (lift === 'Squat') {
      return `${getWeight(squat, +onerm)} - ${getWeight(squat, +onerm * 1.05)}kg`
    }
    if (lift === 'Deadlift') {
      return `${getWeight(deadlift, +onerm)} - ${getWeight(deadlift, +onerm * 1.05)}kg`
    }
    if (lift === 'Bench') {
      return `${getWeight(bench, +onerm)} - ${getWeight(bench, +onerm * 1.05)}kg`
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

    <li className='grid grid-cols-3 md:grid-cols-6 gap-2'>
      <div className='flex flex-col justify-center'>
        <Controller
          control={control}
          name={`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.lift`}
          defaultValue='unlinked'
          render={({ field: { onChange, value}, }) => (<LiftPicker onChange={onChange} value={value} />)}
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
    </li>
  )
}

export default FormExercise

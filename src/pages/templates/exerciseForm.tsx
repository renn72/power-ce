import { useFormContext, Controller } from 'react-hook-form'
import { useAtom } from 'jotai'

import  LiftPicker  from './liftPicker'

import { getRandomInt } from '~/utils/utils'
import getWeight from '~/utils/getWeight'

import { squatAtom, deadliftAtom, benchAtom } from '~/store/store'
import type { Block } from './form'

const GetWeight = ({ week, day, exercise }: { week: number, day: number, exercise: number }) => {
  const [squat,] = useAtom(squatAtom);
  const [deadlift,] = useAtom(deadliftAtom);
  const [bench,] = useAtom(benchAtom);
  const formMethods = useFormContext<Block>();

  const watch = formMethods.watch([`week.${week}.day.${day}.exercise.${exercise}.onerm`, `week.${week}.day.${day}.exercise.${exercise}.lift`])

  const checkWeight = () => {
    const lift = watch[1] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.lift
    const onerm = watch[0] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.onerm

    if (!lift) return null
    if (!onerm) return null
    if (lift === "unlinked") return null

    let weight = 0
    if (lift === 'Squat') weight = getWeight(squat, onerm)
    if (lift === 'Deadlift') weight = getWeight(deadlift, onerm)
    if (lift === 'Bench') weight = getWeight(bench, onerm)

    return `${weight}kg`
  }
  return (
    <div>
      {checkWeight()}
    </div>
  )
}

const ExerciseForm = ({ weekIdx, dayIdx, idx } : { weekIdx: number, dayIdx: number, idx: number }) => {
  const formMethods = useFormContext();
  if (!formMethods) return null

  const { register, control } = formMethods

  return (
    <div key={idx} className="grid gap-1 md:gap-4 md:grid-cols-8 grid-cols-4 py-5 justify-items-center">

      {/* lift */}
      <div className="w-24 sm:w-36 flex flex-col justify-center col-span-2">
        <Controller
          control={control}
          name={`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.lift`}
          defaultValue="unlinked"
          render={({ field: { onChange } }) => (<LiftPicker onChange={onChange} />)}
        />
      </div>

      {/* name */}
      <input
        className="block h-full col-span-2 w-24 sm:w-36 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        placeholder="Name"
        defaultValue={`w${weekIdx + 1}.d${dayIdx + 1}.e${idx + 1}.name`}
        type="text"
        {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.name`,)}
      />
      {/* percent of one rep max */}
      <input
        className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        type="number"
        // defaultValue={getRandomInt(90)}
        placeholder="1rm%"
        {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.onerm`,
          {
            valueAsNumber: true,
          })
        }
      />
      {/* sets */}
      <input
        className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        type="number"
        placeholder="Sets"
        defaultValue={getRandomInt(10)}
        {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.sets`, {
          valueAsNumber: true,

        })}
      />
      {/* reps */}
      <input
        className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        type="number"
        placeholder="Reps"
        defaultValue={getRandomInt(10)}
        {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.reps`, {
          valueAsNumber: true,
        })}
      />
      <div
        className="block bg-white font-semibold h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-400"
      >
        <GetWeight
          week={weekIdx}
          day={dayIdx}
          exercise={idx}
        />
      </div>
    </div>
  )
}

export default ExerciseForm

import { useFormContext } from 'react-hook-form'
import { useAtom } from 'jotai'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import ExerciseForm from './exerciseForm'

import { formDayAtom } from './form'

const FormDay = ({ weekIdx, dayIdx, day }: { weekIdx: number, dayIdx: number, day: number }) => {
  const [formDay] = useAtom(formDayAtom)

  const [parent] = useAutoAnimate(/* optional config */)

  const formMethods = useFormContext();
  if (!formMethods) return null

  const { register } = formMethods

  return (
    <div ref={parent} className={`flex flex-col divide-y divide-dashed divide-gray-500 ${dayIdx == formDay ? `` : `hidden`}`}>
      <div className="flex justify-center gap-4 mb-2">
        <label>Is it a rest day?</label>
        <input
          className=" rounded-md p-2 text-gray-900"
          type="checkbox"
          defaultChecked={false}
          {...register(`week.${weekIdx}.day.${dayIdx}.isRestDay`, {
            shouldUnregister: true,
          })}
        />
      </div>
      {
        Array.from({
          length: day
        }
        ).map((_, idx) => (
          <ExerciseForm key={idx} idx={idx} weekIdx={weekIdx} dayIdx={dayIdx} />
        ))}
    </div>
  )
}

export default FormDay

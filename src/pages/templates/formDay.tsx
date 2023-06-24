import { useFormContext, Controller } from 'react-hook-form'
import { useAtom } from 'jotai'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Switch } from '@headlessui/react'

import ExerciseForm from './exerciseForm'

import { formDayAtom } from './form'

import { getRandomInt } from '~/utils/utils'

const FormDay = ({ weekIdx, dayIdx, day }: { weekIdx: number, dayIdx: number, day: number }) => {
  const [formDay] = useAtom(formDayAtom)


  const [parent] = useAutoAnimate(/* optional config */)

  const formMethods = useFormContext();
  if (!formMethods) return null

  const { register, control } = formMethods

  return (
    <div ref={parent} className={`flex flex-col divide-y divide-dashed divide-gray-500 ${dayIdx == formDay ? `` : `hidden`}`}>
      <div className="flex flex-col justify-center items-center sm:gap-4 mb-2">
        <label>Is it a rest day?</label>
        <Controller
          control={control}
          name={`week.${weekIdx}.day.${dayIdx}.isRestDay`}
          defaultValue={false}
          shouldUnregister={true}
          render={({ field: { onChange, value } }) => (

            <Switch
              checked={value}
              onChange={onChange}
              className={`${value ? 'bg-slate-900' : 'bg-slate-400'}
          relative inline-flex h-[18px] w-[64px] sm:h-[28px] sm:w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Is it a Rest Day</span>
              <span
                aria-hidden="true"
                className={`${value ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[14px] w-[24px] sm:h-[24px] sm:w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          )}
        />
        {/* <input */}
        {/*   className="hidden" */}
        {/*   type="text" */}
        {/*   {...register(`week.${weekIdx}.day.${dayIdx}.id`, { */}
        {/*     shouldUnregister: true, */}
        {/*   })} */}
        {/* /> */}
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

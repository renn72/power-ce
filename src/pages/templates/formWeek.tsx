import {
  useFieldArray, useFormContext,
} from 'react-hook-form'

import { Tab, } from '@headlessui/react'

import { classNames, } from '~/utils/utils'
import FormDay from './formDay'

const FormWeek = ({ weekIdx, }: { weekIdx: number }) => {
  const formMethods = useFormContext()
  const { control, } = formMethods

  const dayField = useFieldArray({
    control,
    name: `week.${weekIdx}.day`,
  })

  return (
    <>
      <Tab.Group >
        <Tab.List className='flex gap-1 md:gap-8 justify-start text-base md:text-lg '>
          {dayField.fields.map((item, index) => {
            return (
              <Tab
                key={item.id}
                className={({ selected, }) => classNames(
                  'py-1.5 w-full md:px-6 mx-1 border-b border-transparent',
                  'focus:outline-none',
                  selected
                    ? 'border-yellow-400 border-b shadow text-bold'
                    : 'hover:border-b hover:border-gray-400 font-normal'
                )
                }
              >
                {`Day ${index + 1}`}
              </Tab>
            )
          })}
        </Tab.List>
        <Tab.Panels className='mt-4'>
          {dayField.fields.map((item, index) => {
            return (
              <Tab.Panel
                key={item.id}
                className={classNames(
                  'rounded-xl',
                  ''
                )}
              >
                <FormDay weekIdx={weekIdx} dayIdx={index} />
              </Tab.Panel>
            )
          })}

        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

export default FormWeek

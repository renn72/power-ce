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
        <Tab.List className='flex rounded-xl p-1 border border-gray-600'>
          {dayField.fields.map((item, index) => {
            return (
              <Tab
                key={item.id}
                className={({ selected, }) => classNames(
                  'w-full text-gray-400 rounded-lg py-2.5 leading-5 mx-1',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-gray-300 shadow text-gray-900 text-bold'
                    : 'text-blue-100 hover:bg-white/[0.07] hover:text-white'
                )
                }
              >
                {`day ${index + 1}`}
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
                  'ring-gray-200 ring-opacity-20 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
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

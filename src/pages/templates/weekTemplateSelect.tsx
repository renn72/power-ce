import { Fragment, } from 'react'

import { api, } from '~/utils/api'

import {
  Listbox, Transition,
} from '@headlessui/react'
import {
  ChevronUpDownIcon, CheckIcon,
} from '@heroicons/react/24/outline'

const WeekTemplateSelect = ({
  onSelectWeekTemplate, selectedWeekTemplate,
}: { onSelectWeekTemplate: (week: string) => void, selectedWeekTemplate: string }) => {

  const { data: weeksData, } = api.blocks.getAllWeekTemplates.useQuery()

  const onSelect = (e: string) => {
    onSelectWeekTemplate(e)
  }

  return (
    <div className='w-40 sm:w-52 flex flex-col justify-center'>
      <Listbox value={selectedWeekTemplate} onChange={(e) => onSelect(e)}>
        <div className='relative z-10'>
          <Listbox.Button className='relative w-full border-b border-gray-600 cursor-default max-h-min h-10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none '>
            <span className='block truncate'>{weeksData?.find((w) => w.id == selectedWeekTemplate)?.name}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-6 w-6 text-gray-400'
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
            <Listbox.Options className='absolute z-20 mt-1 max-h-160 w-full border border-gray-600 overflow-auto bg-black py-1 '>
              {weeksData?.map((template, Idx) => (
                <Listbox.Option
                  key={Idx}
                  className={({ active, }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-yellow-400 text-gray-900' : 'text-gray-200'
                    }`
                  }
                  value={template.id}
                >
                  {({ selected, }) => (
                    <>
                      <span
                        className={`block truncate `}
                      >
                        {template.name}
                      </span>
                      {selected
                        ? (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 '>
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
    </div>
  )
}

export default WeekTemplateSelect

import {
  Fragment, useEffect, useState,
} from 'react'

import {
  Listbox, Transition,
} from '@headlessui/react'
import {
  ChevronUpDownIcon, CheckIcon,
} from '@heroicons/react/24/outline'

import { api, } from '~/utils/api'

const LiftPicker = ({
  onChange, value,
}: { onChange: (arg0: string) => void, value: string }) => {
  const [
    selectedLift,
    setSelectedLift,
  ] = useState(value)

  const {
    data: lifts, isLoading: primaryLiftsLoading,
  } = api.primaryLifts.getAll.useQuery()

  if (primaryLiftsLoading) return null
  if (!lifts) return null

  if (lifts.find((lift) => lift.name === 'unlinked') === undefined) {
    lifts.unshift({ id: 'unlinked', name: 'unlinked', })
  }

  return (
    <Listbox
      value={selectedLift}
      onChange={(e) => {
        onChange(e)
        setSelectedLift(e)
      }}
    >
      <div className='relative overflow-visible h-full text-xs sm:text-base'>
        <Listbox.Button className='relative w-full h-full border-b border-gray-600 cursor-default max-h-min py-2 pl-3 pr-10 text-left cursor-pointer focus:outline-none '>
          <span className='flex items-center capitalize'>{selectedLift}</span>
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
          <Listbox.Options className='absolute z-30 mt-1 max-h-160 w-full border border-gray-600 overflow-auto bg-black py-1 '>
            {lifts.map((lift, Idx) => (
              <Listbox.Option
                key={Idx}
                className={({ active, }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-200'
                  }`
                }
                value={lift.name}
              >
                {({ selected, }) => (
                  <>
                    <span
                      className={`block capitalize truncate ${selected ? 'font-bold' : 'font-semibold'
                        }`}
                    >
                      {lift.name}
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
  )
}

export default LiftPicker

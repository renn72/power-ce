import { Fragment } from 'react'
import { useAtom } from 'jotai'

import { api } from '~/utils/api'

import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon, } from '@heroicons/react/24/outline'

import { selectedTemplateAtom } from './form'

const TemplateSelect = ({onSelectTemplate} : {onSelectTemplate : (arg0 : string) => void}) => {
  const [selectedTemplate ] = useAtom(selectedTemplateAtom)

  const { data: blocksData, } = api.blocks.getAll.useQuery();
  const blocksTitle = blocksData?.map((block) => block.name)

  return (
    <div className="w-44 sm:w-52 flex flex-col justify-center">
      <Listbox value={selectedTemplate} onChange={(e) => onSelectTemplate(e)}>
        <div className="relative z-10">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white max-h-min h-10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="block truncate">{selectedTemplate}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {blocksTitle?.map((template, Idx) => (
                <Listbox.Option
                  key={Idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={template}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {template}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
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

export default TemplateSelect

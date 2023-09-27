import { Fragment, } from 'react'
import { useAtom, } from 'jotai'

import { api, } from '~/utils/api'

import { useUser } from '@clerk/nextjs'

import {
  Listbox, Transition,
} from '@headlessui/react'
import {
  ChevronUpDownIcon, CheckIcon,
} from '@heroicons/react/24/outline'

import { isSuperAdminAtom, selectedTemplateAtom, } from './form'

const TemplateSelect = ({ onSelectTemplate, }: { onSelectTemplate: (arg0: string) => void }) => {
  const [isSuperAdmin,] = useAtom(isSuperAdminAtom)
  const { user, } = useUser()
  const [selectedTemplate,] = useAtom(selectedTemplateAtom)

  const { data: blocksData, } = api.blocks.getAll.useQuery()
  const blocksTitle = blocksData?.filter((b) => b.trainerId === user?.id || isSuperAdmin ).map((block) => block.name)

  return (
    <div className='w-40 sm:w-72 flex flex-col text-gray-200 justify-center text-lg'>
      <Listbox value={selectedTemplate} onChange={(e) => onSelectTemplate(e)}>
        <div className='relative z-10'>
          <Listbox.Button className='relative w-full border-b border-gray-600 cursor-default max-h-min h-16 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none '>
            <span className='block truncate'>{selectedTemplate}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-8 w-8 text-gray-400'
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
              {blocksTitle?.map((template, Idx) => (
                <Listbox.Option
                  key={Idx}
                  className={({ active, }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-yellow-400 text-gray-900' : 'text-gray-200'
                    }`
                  }
                  value={template}
                >
                  {({ selected, }) => (
                    <>
                      <span
                        className={`block truncate `}
                      >
                        {template}
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

export default TemplateSelect

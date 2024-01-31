import { Fragment } from 'react'
import { useAtom } from 'jotai'

import { api } from '~/utils/api'

import { useSession } from 'next-auth/react'

import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'

import { isSuperAdminAtom, selectedTemplateAtom } from './form'
import { LoadingSpinner } from '~/components/loading'

import { cn } from '@/lib/utils'

const TemplateSelect = ({
  onSelectTemplate,
}: {
  onSelectTemplate: (arg0: string) => void
}) => {
  const [isSuperAdmin] = useAtom(isSuperAdminAtom)
  const { data: session } = useSession()
  const user = session?.user
  const userId = user?.id || ''
  const [selectedTemplate] = useAtom(selectedTemplateAtom)

  const { data: blocksTitle, isLoading } = api.template.getAllTemplateTitles.useQuery({userId: userId, isSuperAdmin: isSuperAdmin})
  
  if (!blocksTitle || isLoading) {
    <LoadingSpinner />
  }

  return (
    <div className='flex w-full flex-col justify-center text-lg text-gray-200 sm:w-72'>
      <Listbox
        value={selectedTemplate}
        onChange={(e) => onSelectTemplate(e)}
      >
        <div className='z-110 relative'>
          <Listbox.Button className='relative h-12 max-h-min w-full cursor-default border-b border-gray-600 py-2 pl-3 pr-10 text-left shadow-md hover:border-gray-200 focus:outline-none '>
            <span
              className={cn(
                'block truncate',
                selectedTemplate ? 'text-gray-200' : 'text-gray-600 text-sm',
              )}
            >
              {blocksTitle?.find((b) => b.id === selectedTemplate)?.name ||
                'Select a Template'}
            </span>
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
            <Listbox.Options className='max-h-96 absolute z-20 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 '>
              {blocksTitle?.map((template) => (
                <Listbox.Option
                  key={template.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-yellow-400 text-gray-900' : 'text-gray-200'
                    }`
                  }
                  value={template.id}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate `}>{template.name}</span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 '>
                          <CheckIcon
                            className='h-5 w-5'
                            aria-hidden='true'
                          />
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

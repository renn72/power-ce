import { useState, useEffect, Fragment } from 'react'

import { api } from '~/utils/api'

import { Listbox, Transition } from '@headlessui/react'
import {
  ChevronUpDownIcon,
  CheckIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

import { capitaliseString } from '~/utils/utils'

const TemplateSelect = ({
  onSelectTemplate,
  onSetTemplate,
  onClearTemplate,
  userId,
  userFirstName,
  userLastName,
}: {
  onSelectTemplate: (arg0: string, arg1: string) => void
  onSetTemplate: (arg0: string, arg1: string) => void
  onClearTemplate: (arg0: string) => void
  userId: string
  userFirstName: string | null
  userLastName: string | null
}) => {
  const [template, setTemplate] = useState('')
  const [isSet, setIsSet] = useState(false)

  const { data: blocksData, isLoading: blocksLoading } =
    api.blocks.getAllBlockTitles.useQuery()
  const { data: currentProgram } = api.blocks.getUserActiveProgram.useQuery({userId: userId})

  console.log('currentProgram', currentProgram)

  const onSetLocalTemplate = (template: string) => {
    setTemplate(template)
    onSelectTemplate(template, userId)
  }

  useEffect(() => {
    if (!currentProgram) return
    const userProgram = currentProgram[0]
    console.log('userProgram', userProgram)
    if (!userProgram) {
      setIsSet(false)
      setTemplate('')
      return
    }
    const templateName = userProgram?.name
    if (!templateName) return
    setIsSet(true)
    setTemplate(templateName)
  }, [currentProgram])

  const onSetTemplateWrapper = (template : string, userId : string) => {
    onSetTemplate(template, userId)
    setIsSet(false)
  }

  if (blocksLoading) return <div>loading</div>
  const blocksTitle = blocksData?.map((block) => block.name)

  // if (userId === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a') return null

  return (
    <div className='m-2 flex flex-col gap-6 md:flex-row '>
      <div className='flex w-64 items-center justify-between gap-2 text-lg font-semibold'>
        <div className='text-xl font-bold text-yellow-500'>
          {capitaliseString(userFirstName)} {capitaliseString(userLastName)}
        </div>
        {isSet && <CheckCircleIcon className='h-8 w-8 text-green-600' />}
      </div>

      <div className='flex justify-start sm:gap-2 md:items-center'>
        <div className='flex flex-col justify-center text-sm font-bold md:text-base'>
          <Listbox
            value={template}
            onChange={(e) => onSetLocalTemplate(e)}
          >
            <div className='z-1 relative'>
              <Listbox.Button className='relative h-10 w-60 cursor-default border-b border-gray-600 pl-3 pr-10 text-left shadow-md hover:border-white focus:outline-none '>
                <span className='block truncate'>{template}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon
                    className='h-5 w-5'
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
                <Listbox.Options className='max-h-120 absolute z-10 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 shadow-lg '>
                  {blocksTitle?.map((templateName, Idx) => (
                    <Listbox.Option
                      key={Idx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-8 pr-4 ${
                          active ? 'bg-yellow-400 text-black' : 'text-gray-200'
                        }`
                      }
                      value={templateName}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate`}>
                            {templateName}
                          </span>
                          {selected ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-1'>
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
        <div className='ml-4 flex items-end justify-start gap-2'>
          <PencilSquareIcon
            className='h-8 w-8 text-gray-400 hover:text-green-600'
            onClick={() => onSetTemplateWrapper(template, userId)}
          />
          <XCircleIcon
            className='col-span-1 h-8 w-8 text-gray-400 hover:text-red-600'
            onClick={() => onClearTemplate(userId)}
          />
        </div>
      </div>
    </div>
  )
}

export default TemplateSelect

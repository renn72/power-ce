import {
  useState, useEffect, Fragment,
} from 'react'

import { api, } from '~/utils/api'

import {
  Listbox, Transition,
} from '@headlessui/react'
import {
  ChevronUpDownIcon,
  CheckIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

import { capitaliseString, } from '~/utils/utils'

const TemplateSelect = (
  {
    onSelectTemplate,
    onSetTemplate,
    onClearTemplate,
    userId,
    userFirstName,
    userLastName,
  }:
    {
      onSelectTemplate: (arg0: string, arg1: string) => void,
      onSetTemplate: (arg0: string, arg1: string) => void,
      onClearTemplate: (arg0: string, ) => void,
      userId: string,
      userFirstName: string | null,
      userLastName: string | null
    }
) => {

  const [
    template,
    setTemplate,
  ] = useState('')
  const [
    isSet,
    setIsSet,
  ] = useState(false)

  const {
    data: userPrograms, isLoading: userProgramsLoading,
  } = api.userPrograms.getAll.useQuery()
  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()
  const { data: programsData, } = api.blocks.getAllPrograms.useQuery()

  const onSetLocalTemplate = (template: string) => {
    setTemplate(template)
    onSelectTemplate(template, userId)
  }

  useEffect(() => {
    const userProgram = userPrograms?.find((userProgram) => userProgram.userId === userId && userProgram.isProgramActive)
    if (!userProgram) {
      setIsSet(false)
      setTemplate('')
      return
    }
    const templateName = programsData?.find((program) => program.id === userProgram.programId)?.name
    if (!templateName) return
    setIsSet(true)
    setTemplate(templateName)
  }, [
    userPrograms,
    blocksData,
    userId,
    programsData,
  ])

  if (userProgramsLoading || blocksLoading) return <div>loading</div>
  const blocksTitle = blocksData?.map((block) => block.name)

  // if (userId === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a') return null

  return (
    <div className='p-2 grid grid-cols-4 sm:grid-cols-7 sm:gap-2 justify-between place-items-center sm:place-items-center text-gray-200 border-gray-500 border rounded-lg'>
      <div
        className='text-sm md:text-lg font-bold w-full rounded-lg p-2 col-span-2'>
        {capitaliseString(userFirstName)} {capitaliseString(userLastName)}
      </div>
      <div className='flex justify-center col-span-2 sm:col-span-1'>
        {isSet && (<CheckCircleIcon className='h-8 w-8 text-green-500' />)}
      </div>

      <div className='text-xs md:text-sm font-bold place-self-start flex flex-col justify-center col-span-2 border-gray-400 border rounded-lg'>
        <Listbox value={template} onChange={(e) => onSetLocalTemplate(e)}>
          <div className='relative z-1'>
            <Listbox.Button
              className='relative w-full w-32 sm:w-48 cursor-default rounded-lg  max-h-min h-10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300'
            >
              <span className='block truncate'>{template}</span>
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
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-gray-900 border-gray-400 border rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none '>
                {blocksTitle?.map((templateName, Idx) => (
                  <Listbox.Option
                    key={Idx}
                    className={({ active, }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-200 text-gray-900' : 'text-gray-200'
                      }`
                    }
                    value={templateName}
                  >
                    {({ selected, }) => (
                      <>
                        <span
                          className={`block truncate`}
                        >
                          {templateName}
                        </span>
                        {selected
                          ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-200'>
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
      <PencilSquareIcon
        className='text-gray-400 hover:text-gray-100 h-12 w-12 p-2 place-self-end'
        onClick={() => onSetTemplate(template, userId)}
      />
      <XCircleIcon
        className='text-gray-400 hover:text-gray-100 h-12 w-12 p-2'
        onClick={() => onClearTemplate(userId)}
      />
    </div>
  )
}

export default TemplateSelect

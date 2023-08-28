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
      onClearTemplate: (arg0: string,) => void,
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

  const onSetTemplateWrapper = (template, userId) => {
    onSetTemplate(template, userId)
    setIsSet(false)
  }

  if (userProgramsLoading || blocksLoading) return <div>loading</div>
  const blocksTitle = blocksData?.map((block) => block.name)

  // if (userId === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a') return null

  return (
    <div className='md:p-2 flex flex-col w-full md:flex-row sm:gap-2 justify-start md:items-center'>
      <div className='flex w-full sm:gap-2 justify-start md:items-center'>
        <div
          className='text-xl font-bold md:w-44 pr-2 rounded-lg text-yellow-500'>
          {capitaliseString(userFirstName)} {capitaliseString(userLastName)}
        </div>
        <div className='flex justify-center w-12'>
          {isSet && (<CheckCircleIcon className='h-8 w-8 text-green-600' />)}
        </div>
      </div>

      <div className='flex w-full sm:gap-2 justify-start md:items-center'>
        <div className='text-sm md:text-base font-bold flex flex-col justify-center'>
          <Listbox value={template} onChange={(e) => onSetLocalTemplate(e)}>
            <div className='relative z-1'>
              <Listbox.Button
                className='relative w-60 h-10 border-b border-gray-600 hover:border-white cursor-default pl-3 pr-10 text-left shadow-md focus:outline-none '
              >
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
                <Listbox.Options className='absolute z-10 mt-1 max-h-120 w-full overflow-auto bg-black border-gray-600 border py-1 shadow-lg '>
                  {blocksTitle?.map((templateName, Idx) => (
                    <Listbox.Option
                      key={Idx}
                      className={({ active, }) => `relative cursor-default select-none py-2 pl-8 pr-4 ${active ? 'bg-yellow-400 text-black' : 'text-gray-200'
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
                              <span className='absolute inset-y-0 left-0 flex items-center pl-1'>
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
        <div className='flex gap-2 ml-4 justify-start items-end'>
          <PencilSquareIcon
            className='text-gray-400 hover:text-green-600 h-8 w-8'
            onClick={() => onSetTemplateWrapper(template, userId)}
          />
          <XCircleIcon
            className='text-gray-400 hover:text-red-600 h-8 w-8 col-span-1'
            onClick={() => onClearTemplate(userId)}
          />
        </div>
      </div>
    </div>
  )
}

export default TemplateSelect

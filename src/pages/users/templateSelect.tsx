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

import { useSession } from 'next-auth/react'

const TemplateSelect = ({
  onSelectTemplate,
  onSetTemplate,
  onClearTemplate,
  userId,
  isCurrent,
}: {
  onSelectTemplate: (arg0: string, arg1: string) => void
  onSetTemplate: (arg0: string, arg1: string) => void
  onClearTemplate: (arg0: string) => void
  userId: string
  isCurrent: boolean
}) => {
  const [template, setTemplate] = useState('')
  const [isSet, setIsSet] = useState(false)

  const { data: session } = useSession()
  const user = session?.user
  const trainerId = user?.id || ''

  const ctx = api.useContext()

  const { data: blocksData, isLoading: blocksLoading } =
    api.blocks.getAllBlockTitles.useQuery()
  const { data: currentProgram } = api.blocks.getUserActiveProgramFull.useQuery(
    { userId: userId },
  )
  console.log('currentProgram', currentProgram)

  const { data: secondProgram } = api.blocks.getUserSecondaryProgram.useQuery({
    userId: userId,
  })
  console.log('secondProgram', secondProgram)

  const workoutCount = () => {
    if (!currentProgram) return ''
    const complete: number[] = currentProgram.week.map((w) =>
      w.day.map((d) => {
        if (d.isComplete === true) return 2
        if (d.exercise.some((e) => e.isComplete === true)) return 1
        return d.isRestDay ? 0 : -1
      }),
    )
    if (!complete) return ''

    const completeFlat = complete.flat()

    const lastIdxComplete = completeFlat.lastIndexOf(1)
    const lastIdxUnComplete = completeFlat.lastIndexOf(2)
    const lastIdx = Math.max(lastIdxComplete, lastIdxUnComplete)

    const unCompleteWeek = completeFlat.slice(lastIdx + 1)
    const final = unCompleteWeek.slice(
      unCompleteWeek.findIndex((i) => i == -1),
      -1,
    )

    if (final.reduce((acc, curr) => acc + curr * -1, 0) === 0) {
      return 0
    }

    return final.reduce((acc, curr) => acc + curr * -1, 0)
  }

  const countDown = () => {
    if (!currentProgram) return
    const complete: number[] = currentProgram.week.map((w) =>
      w.day.map((d) => {
        if (d.isComplete === true) return 2
        if (d.exercise.some((e) => e.isComplete === true)) return 1
        return d.isRestDay ? 0 : -1
      }),
    )
    if (!complete) return

    const completeFlat = complete.flat()

    const lastIdxComplete = completeFlat.lastIndexOf(1)
    const lastIdxUnComplete = completeFlat.lastIndexOf(2)
    const lastIdx = Math.max(lastIdxComplete, lastIdxUnComplete)

    const unCompleteWeek = completeFlat.slice(lastIdx + 1)
    const final = unCompleteWeek.slice(
      unCompleteWeek.findIndex((i) => i == -1),
      -1,
    )

    if (final.reduce((acc, curr) => acc + curr * -1, 0) === 0) {
      return 'Empty'
    }

    return `${final.length + 1} days left (${final.reduce(
      (acc, curr) => acc + curr * -1,
      0,
    )} workouts)`
  }

  const wrapperOnClearTemplate = (userId: string) => {
    onClearTemplate(userId)
    setIsSet(false)
    setTemplate('')
    void ctx.blocks.getUserActiveProgramFull.invalidate({ userId: userId })
    void ctx.blocks.getUserSecondaryProgram.invalidate({ userId: userId })
  }

  const onSetLocalTemplate = (template: string) => {
    setTemplate(template)
    onSelectTemplate(template, userId)
  }

  useEffect(() => {
    if (isCurrent) {
      if (!currentProgram) {
        setIsSet(false)
        setTemplate('')
        return
      }
      const templateName = currentProgram?.name
      if (!templateName) return
      setIsSet(true)
      setTemplate(templateName)
    } else {
      if (!secondProgram) {
        setIsSet(false)
        setTemplate('')
        return
      }
      const templateName = secondProgram?.name
      if (!templateName) return
      setIsSet(true)
      setTemplate(templateName)
    }
  }, [currentProgram, secondProgram])

  const onSetTemplateWrapper = (template: string, userId: string) => {
    onSetTemplate(template, userId)
  }

  if (blocksLoading) return <div>loading</div>
  const blocksTitle = blocksData
    ?.filter(
      (b) =>
        b.trainerId === trainerId ||
        trainerId === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a',
    )
    ?.map((block) => block.name)

  // if (userId === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a') return null

  return (
    <div className='mx-1 mx-2 flex flex-row items-center gap-6'>
      <div className='flex flex-row justify-normal gap-6 '>
        <div className='flex w-64 items-end text-lg font-semibold'>
          <div className='text-xl font-bold tracking-tighter text-yellow-500'>
            {isCurrent ? 'Current' : 'Next'} Program:{' '}
          </div>
          {isSet && false && (
            <CheckCircleIcon className='h-8 w-6 text-green-600 md:w-8' />
          )}
        </div>

        <div className='flex flex-row items-center justify-start gap-6'>
          <div className='flex items-center justify-start gap-2'>
            <div className='flex flex-col justify-center text-base font-bold'>
              <Listbox
                value={template}
                onChange={(e) => onSetLocalTemplate(e)}
              >
                <div className='z-1 relative'>
                  <Listbox.Button className='relative h-10  w-60 cursor-default border-b border-gray-600 pl-3 pr-10 text-left shadow-md hover:border-white focus:outline-none '>
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
                    <Listbox.Options className='absolute z-10 mt-1 max-h-[32rem] w-80 overflow-auto border border-gray-600 bg-black py-1 shadow-lg md:w-80 '>
                      {blocksTitle?.map((templateName, Idx) => (
                        <Listbox.Option
                          key={Idx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-8 pr-4 ${
                              active
                                ? 'bg-yellow-400 text-black'
                                : 'text-gray-200'
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
                className='h-8 w-8 text-gray-400 hover:text-green-600 md:w-8'
                onClick={() => onSetTemplateWrapper(template, userId)}
              />
              <XCircleIcon
                className='col-span-1 h-8 w-8 text-gray-400 hover:text-red-600 md:w-8'
                onClick={() => wrapperOnClearTemplate(userId)}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mt-2 text-sm font-normal ${
          Number(workoutCount()) <= 2
            ? Number(workoutCount()) <= 1
              ? 'text-red-500'
              : 'text-orange-400'
            : 'text-gray-400'
        }`}
      >
        {isCurrent && countDown()}
      </div>
    </div>
  )
}

export default TemplateSelect

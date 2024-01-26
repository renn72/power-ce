import { Fragment } from 'react'

import { api } from '~/utils/api'

import { Listbox, Transition } from '@headlessui/react'
import {
  ChevronUpDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'

const WeekTemplateSelect = ({
  onSelectWeekTemplate,
  selectedWeekTemplate,
}: {
  onSelectWeekTemplate: (week: string) => void
  selectedWeekTemplate: string
}) => {
  const { data: session } = useSession()
  const user = session?.user
  const ctx = api.useUtils()
  const { data: weeksData } = api.blocks.getAllWeekTemplates.useQuery({userId: user?.id || ''})

  const { mutate: weekDeleteMutate } = api.blocks.deleteWeek.useMutation({
    onSuccess: () => {
      toast.success('Deleted')
      void ctx.blocks.getAllWeekTemplates.invalidate()
    },
    onError: () => {
      toast.error('Error')
    },
  })

  const onSelect = (e: string) => {
    onSelectWeekTemplate(e)
  }

  return (
    <div className='flex flex-col justify-center w-72 text-lg'>
      <Listbox
        value={selectedWeekTemplate}
        onChange={(e) => onSelect(e)}
      >
        <div className='relative z-10'>
          <Listbox.Button className='relative h-10 max-h-min w-full cursor-default border-b border-gray-600 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none '>
            <span className='block truncate'>
              {weeksData?.find((w) => w.id == selectedWeekTemplate)?.name}
            </span>
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
            <Listbox.Options className='max-h-160 absolute z-20 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 '>
              {weeksData?.map((template, Idx) => (
                <Listbox.Option
                  key={Idx}
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
                      <span
                        onClick={(e) => {
                          e.stopPropagation()
                          weekDeleteMutate({ id: template.id })
                        }}
                        className='absolute right-2 top-0 flex h-full cursor-pointer items-center pl-3 hover:scale-110 hover:font-extrabold '
                      >
                        <XMarkIcon
                          className='h-5 w-5'
                          aria-hidden='true'
                        />
                      </span>
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

export default WeekTemplateSelect

import { api } from '~/utils/api'

import { Button } from '@/components/ui/button'
import { Listbox, Transition } from '@headlessui/react'

import { Fragment, useState } from 'react'

import ModalWrapper from '~/components/settings/modalWrapper'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'

const Gender = ({
  defaultValue,
  userId,
}: {
  defaultValue: string
  userId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const utils = api.useContext()
  const { mutate } = api.settings.updateGender.useMutation({
    onMutate: async (newData) => {
      await utils.settings.get.cancel({ userId: userId })
      const previousData = utils.settings.get.getData({
        userId: userId,
      })
      if (!previousData) return

      utils.settings.get.setData(
        { userId: userId },
        {
          ...previousData,
          gender: newData.gender,
        },
      )

      return { previousData }
    },
    onError: (err, _newData, context) => {
      console.log(err)
      utils.settings.get.setData({ userId: userId }, context?.previousData)
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-2xl'>Gender</h4>
        <p className='h-8 text-xl capitalize text-gray-400'>
          {defaultValue == '' ? '...' : defaultValue}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Listbox
          value={value}
          onChange={(e) => setValue(e)}
        >
          <div className='z-1 relative text-2xl'>
            <Listbox.Button className='relative h-10 w-full cursor-default border-b border-gray-600 pl-3 pr-10 text-left capitalize shadow-md hover:border-white focus:outline-none md:w-[230px] md:px-2 '>
              <span
                className={`block truncate ${
                  value === '' ? 'text-sm text-gray-500' : ''
                }`}
              >
                {value === '' ? 'Gender' : value}
              </span>
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
              <Listbox.Options className='max-h-120 absolute z-10 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 capitalize shadow-lg '>
                {['male', 'female'].map((t, Idx) => (
                  <Listbox.Option
                    key={Idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-8 pr-4 ${
                        active ? 'bg-yellow-400 text-black' : 'text-gray-200'
                      }`
                    }
                    value={t}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate`}>{t}</span>
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
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            className='bg-yellow-400 text-gray-900 text-lg h-fit w-28 font-bold'
            onClick={() => {
              if (!value) return
              mutate({ userId: userId, gender: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            className='bg-yellow-400 text-gray-900 text-lg h-fit w-28 font-bold'
            onClick={() => {
              mutate({ userId: userId, gender: '' })
              setValue('')
              setIsOpen(false)
            }}
          >
            Clear
          </Button>

          <Button
            className='bg-yellow-400 text-gray-900 text-lg h-fit w-28 font-bold'
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </ModalWrapper>
    </div>
  )
}

export default Gender

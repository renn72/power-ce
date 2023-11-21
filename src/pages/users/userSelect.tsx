import { useState, Fragment } from 'react'

import { api } from '~/utils/api'

import { useSession } from 'next-auth/react'

import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'

const UserSelect = ({
  onSelectUser,
}: {
  onSelectUser: (arg0: string) => void
}) => {
  const { data: session } = useSession()
  const currentUser = session?.user

  const [user, setUser] = useState<string>(currentUser?.id || 'all')

  const { data: users, isLoading: usersLoading } =
    api.users.getAllUsers.useQuery()

  const onSelect = (e: string) => {
    setUser(e)
    onSelectUser(e)
    console.log(e)
  }

  const getUser = (id: string) => {
    const user = users?.find((u) => u.id === id)
    if (user) {
      if (user.firstName) {
        return `${user.firstName || ''} ${user.lastName || ''}`
      }
      return user.email
    }
  }

  const allUsers = users?.map((u) => {
    return {
      id: u.id,
      firstName: u.firstName || '',
      lastName: u.lastName || '',
      email: u.email,
    }
  })

  if (usersLoading) return <div>loading</div>

  return (
    <div className='flex w-full flex-col justify-start sm:gap-2 md:flex-row md:items-center md:p-2'>
      <div className='flex w-full justify-start sm:gap-2 md:items-center'>
        <div className='flex flex-col justify-center text-sm font-bold md:text-base'>
          <Listbox
            value={user}
            onChange={onSelect}
          >
            <div className='z-1 relative'>
              <Listbox.Button className='relative h-10 w-60 cursor-default border-b border-gray-600 pl-3 pr-10 text-left shadow-md hover:border-white focus:outline-none '>
                <span className='block truncate capitalize'>
                  {getUser(user)}
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
                <Listbox.Options className='absolute z-10 mt-1 max-h-96 w-full overflow-auto border border-gray-600 bg-black py-1 shadow-lg '>
                  {allUsers?.map((u) => (
                    <Listbox.Option
                      key={u.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-8 pr-4 ${
                          active ? 'bg-yellow-400 text-black' : 'text-gray-200'
                        }`
                      }
                      value={u.id}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate capitalize`}>
                            {u.firstName ? u.firstName + ' ' + u.lastName : u.email }
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
      </div>
    </div>
  )
}

export default UserSelect

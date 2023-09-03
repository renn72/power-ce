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
} from '@heroicons/react/24/outline'

import { useUser, } from '@clerk/nextjs'

const UserSelect = (
  { onSelectUser, }:
    {
      onSelectUser: (arg0: string,) => void,
    }
) => {

  const { user: currentUser, } = useUser()

  const [
    user,
    setUser,
  ] = useState<string>(() => currentUser?.id || '')

  const {
    data: users, isLoading: usersLoading,
  } = api.users.getAllUsers.useQuery()

  const onSelect = (e: string) => {
    setUser(e)
    onSelectUser(e)
    console.log(e)
  }

  const getUser = (id: string) => {
    const user = users?.find((u) => u.id === id)
    if (user) {
      return `${user.firstName} ${user.lastName}`
    }
  }

  if (usersLoading) return <div>loading</div>

  return (
    <div className='md:p-2 flex flex-col w-full md:flex-row sm:gap-2 justify-start md:items-center'>

      <div className='flex w-full sm:gap-2 justify-start md:items-center'>
        <div className='text-sm md:text-base font-bold flex flex-col justify-center'>
          <Listbox value={user} onChange={onSelect}>
            <div className='relative z-1'>
              <Listbox.Button
                className='relative w-60 h-10 border-b border-gray-600 hover:border-white cursor-default pl-3 pr-10 text-left shadow-md focus:outline-none '
              >
                <span className='block truncate capitalize'>{getUser(user)}</span>
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
                  {users?.map((u, Idx) => (
                    <Listbox.Option
                      key={Idx}
                      className={({ active, }) => `relative cursor-default select-none py-2 pl-8 pr-4 ${active ? 'bg-yellow-400 text-black' : 'text-gray-200'
                        }`
                      }
                      value={u.id}
                    >
                      {({ selected, }) => (
                        <>
                          <span
                            className={`block truncate capitalize`}
                          >
                            {u.firstName} {u.lastName}
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
      </div>
    </div>
  )
}

export default UserSelect

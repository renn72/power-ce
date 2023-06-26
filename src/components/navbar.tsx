import { UserButton, } from '@clerk/nextjs'
import Link from 'next/link'
// import { api } from "~/utils/api";

import { useRouter, } from 'next/router'

import { Disclosure, } from '@headlessui/react'
import {
  Bars3Icon, XMarkIcon, FingerPrintIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  {
    name: 'Dashboard', href: '/',
  },
  {
    name: 'Users', href: '/users',
  },
  {
    name: 'Templates', href: '/templates',
  },
  {
    name: 'Program', href: '/program',
  },
]

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}
const Navbar = () => {
  const router = useRouter()
  return (
    <>
      <Disclosure as='nav' className='bg-gray-900 font-semibold tracking-wider text-gray-400'>
        {({ open, }) => (
          <>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='flex p-1 md:p-4 items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <Link href='/'>
                      <FingerPrintIcon className='h-6 w-6 md:h-8 md:w-8 text-indigo-300' aria-hidden='true' />
                    </Link>
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-10 flex items-baseline space-x-4'>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.href === router.pathname
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-md'
                          )}
                          aria-current={item.href === router.pathname ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='hidden md:block'>
                  <div className='ml-4 flex items-center md:ml-6 text-gray-100'>
                    <UserButton />
                  </div>
                </div>
                <div className='flex md:hidden text-white'>
                  {navigation.filter((item) => item.href === router.pathname)[0]?.name}
                </div>
                <div className='flex md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center mr-2 justify-center rounded-md bg-gray-800 p-0 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                    <span className='sr-only'>Open main menu</span>
                    {open
                      ? (
                        <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                      )
                      : (
                        <>
                          <Bars3Icon className='block h-6 w-6 mx-1' aria-hidden='true' />
                        </>
                      )}
                  </Disclosure.Button>
                  <UserButton />
                </div>
              </div>
            </div>

            <Disclosure.Panel className='md:hidden'>
              <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className={classNames(
                      item.href === router.pathname ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base'
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className='border-t border-gray-700 pb-3 pt-4'>
                <div className='p-4 ml-4 text-gray-100 flex justify-end items-center md:ml-6'>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}

export default Navbar

import { UserButton, } from '@clerk/nextjs'
import Link from 'next/link'
// import { api } from "~/utils/api";

import { useRouter, } from 'next/router'

import { Disclosure, } from '@headlessui/react'
import {
  Bars3Icon, XMarkIcon, FingerPrintIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
  {
    name: 'Dashboard', href: '/',
  },
  {
    name: 'Users', href: '/users',
  },
  {
    name: 'Primary Lifts', href: '/primary-lifts',
  },
  {
    name: 'Templates', href: '/templates',
  },
  {
    name: 'Lift', href: '/lift',
  },
  {
    name: "PB's", href: '/pbs',
  },
]

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}
const Navbar = () => {
  const router = useRouter()
  return (
    <>
      <Disclosure as='nav' className='bg-black font-semibold tracking-wider text-gray-200'>
        {({ open, }) => (
          <>
            <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
              <div className='flex p-2 md:p-4 items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <Link href='/'>
                      <Image  
                        src='/ce.png'
                        alt='logo'
                        width={50}
                        height={50}
                      />
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
                              ? 'bg-yellow-400 text-black'
                              : 'text-gray-200 hover:bg-gray-800 hover:text-white',
                            'rounded-md px-3 py-2 text-lg'
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
                <div className='flex text-lg md:hidden text-gray-200'>
                  {navigation.filter((item) => item.href === router.pathname)[0]?.name}
                </div>
                <div className='flex gap-4 md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center mr-2 justify-center rounded-md p-0'>
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
                      item.href === router.pathname ? 'bg-yellow-400 text-black' : 'hover:bg-gray-800',
                      'block rounded-md px-3 py-2 text-base'
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}

export default Navbar

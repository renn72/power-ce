import Link from 'next/link'
import { api } from "~/utils/api";

import { useRouter, } from 'next/router'

import { Disclosure, } from '@headlessui/react'
import {
  Bars3Icon, XMarkIcon, FingerPrintIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

const nav = [
  {
    name: 'Dashboard', href: '/',
  },
  {
    name: 'Program', href: '/program',
  },
  {
    name: 'Users', href: '/users', admin: true,
  },
  {
    name: 'Warmups', href: '/warmups', admin: true,
  },
  {
    name: 'Primary Lifts', href: '/primary-lifts', admin: true,
  },
  {
    name: 'Templates', href: '/templates', admin: true,
  },
  {
    name: 'Log', href: '/log', admin: true,
  },
  // {
  //   name: 'Stats', href: '/stats',  superAdmin: true,
  // },
  // {
  //   name: 'DirtyAdmin', href: '/test',  superAdmin: true,
  // },
  {
    name: 'Admin', href: '/admin',  superAdmin: true, admin:true,
  },
  // {
  //   name: 'Lift', href: '/lift',
  // },
  // {
  //   name: "PB's", href: '/pbs',
  // },
]

const admin = [
  'user_2RB3u3X0pKDxnvmHraPW3RfwrAv',
  'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a',
]
const superAdmin = ['user_2Pg92dlfZkKBNFSB50z9GJJBJ2a', 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a']

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}
const Navbar = () => {
  const userId = 'user_2UhBMdOLkQUazMBwmEWw0g6DQ1v' //sam
  const { data: user } = api.users.get.useQuery({ userId: userId })
  const router = useRouter()
  const isUserAdmin = admin.includes(user?.id || '')
  const isUserSuperAdmin = superAdmin.includes(user?.id || '')
  const navigation = nav.filter((item) => !item.admin || item.admin && isUserAdmin || item.superAdmin && isUserSuperAdmin)
  return (
    <>
      <Disclosure as='nav' className='bg-black font-semibold tracking-wider text-gray-200'>
        {({ open, }) => (
          <>
            <div className='px-4 sm:px-6 lg:px-8 py-2 md:py-4'>
              <div className='flex items-center justify-between'>
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
                              ? 'border-b-yellow-400 border-b'
                              : 'text-gray-200 hover:border-b hover:border-gray-600',
                            'px-3 py-2 text-lg'
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

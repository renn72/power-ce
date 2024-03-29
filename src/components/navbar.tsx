import Link from 'next/link'

import { useRouter } from 'next/router'
import { type User } from '@prisma/client'

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const nav = [
  {
    name: 'Dashboard',
    href: '/',
  },
  {
    name: 'Program',
    href: '/program',
  },
  {
    name: 'Users',
    href: '/users',
    admin: true,
  },
  {
    name: 'Warmups',
    href: '/warmups',
    admin: true,
  },
  {
    name: 'PL',
    href: '/primary-lifts',
    admin: true,
  },
  {
    name: 'Templates-O',
    href: '/templates',
    admin: true,
  },
  {
    name: 'Templates-N',
    href: '/templates2',
    admin: true,
  },
  {
    name: 'Log',
    href: '/log',
    admin: true,
  },
  {
    name: 'Admin',
    href: '/admin',
    admin: true,
  },
  {
    name: 'Records',
    href: '/records',
  },
  {
    name: 'Comp Plan',
    href: '/comp-plan',
    power: true,
    admin: true,
  },
  {
    name: 'AdminLog',
    href: '/adminLog',
    superAdmin: true,
    admin: true,
  },
]

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}
const Navbar = ({ user }: { user: User | null }) => {
  const router = useRouter()

  const isUserAdmin = user?.isAdmin
  const isUserSuperAdmin = user?.isSuper || false
  const isPower = user?.isPower || false
  const navigation = nav.filter(
    (item) =>
      !item.admin ||
      (item.admin && isUserAdmin && (!item.superAdmin || isUserSuperAdmin)) ||
      (item.power && isPower),
  )

  if (
    router.pathname === '/records-men' ||
    router.pathname === '/records-women'
  ) {
    return null
  }

  return (
    <>
      <Disclosure
        as='nav'
        className='bg-black font-semibold tracking-wider text-gray-200'
      >
        {({ open }) => (
          <>
            <div className='px-4 py-1 sm:px-2 lg:px-2'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <Link href='/'>
                      <Image
                        src='/ce.png'
                        alt='logo'
                        width={40}
                        height={40}
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
                              ? 'border-b border-b-yellow-400'
                              : 'text-gray-200 hover:border-b hover:border-gray-600',
                            'px-3 py-2 text-lg',
                          )}
                          aria-current={
                            item.href === router.pathname ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='hidden md:block'>
                  <div className='ml-4 flex items-center text-gray-100 md:ml-6'></div>
                </div>
                <div className='flex text-lg text-gray-200 md:hidden'>
                  {
                    navigation.filter(
                      (item) => item.href === router.pathname,
                    )[0]?.name
                  }
                </div>
                <div className='flex gap-4 md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='mr-2 inline-flex items-center justify-center rounded-md p-0'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className='block h-6 w-6'
                        aria-hidden='true'
                      />
                    ) : (
                      <>
                        <Bars3Icon
                          className='mx-1 block h-6 w-6'
                          aria-hidden='true'
                        />
                      </>
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='md:hidden'>
              <div className='space-y-1 px-1 pb-3 pt-2 sm:px-2'>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className={classNames(
                      item.href === router.pathname
                        ? 'bg-yellow-400 text-black'
                        : 'hover:bg-gray-800',
                      'block rounded-md px-3 py-2 text-base',
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

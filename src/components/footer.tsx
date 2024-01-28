import { useAtom } from 'jotai'
import RPEModal from './rpeModal'
import RmModal from './rmModal'
import DealoadModal from './deloadModal'

import { useSession } from 'next-auth/react'

import {
  rmModalIsOpenAtom,
  rpeModalIsOpenAtom,
  deloadModalIsOpenAtom,
} from '~/store/store'
import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/router'

const admin = [
  'user_2RB3u3X0pKDxnvmHraPW3RfwrAv',
  'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a',
]

const Footer = () => {
  const [, setRmModalIsOpen] = useAtom(rmModalIsOpenAtom)
  const [, setRpeModalIsOpen] = useAtom(rpeModalIsOpenAtom)
  const [, setDeloadModalIsOpen] = useAtom(deloadModalIsOpenAtom)
  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const router = useRouter()

  if (router.pathname === '/records-men' || router.pathname === '/records-women') return null
  return (
    <>
      <div className='flex items-center justify-between px-4 py-1 sm:px-6 lg:px-8'>
        <Link href='/'>
          <Image
            src='/ce.png'
            alt='logo'
            width={40}
            height={40}
          />
        </Link>
        {admin.includes(userId || '') && (
          <div className='flex gap-2 text-sm font-bold text-gray-400'>
            <button
              className='h-10 w-10 rounded-full border-2 border-gray-400 bg-gray-800 bg-transparent font-semibold hover:border-transparent hover:bg-gray-400 hover:text-white'
              onClick={() => setRpeModalIsOpen(true)}
            >
              RPE
            </button>
            <button
              className='h-10 w-10 rounded-full border-2 border-gray-400 bg-gray-800 bg-transparent font-semibold hover:border-transparent hover:bg-gray-400 hover:text-white'
              onClick={() => setRmModalIsOpen(true)}
            >
              RM
            </button>
            <button
              className='h-10 w-10 rounded-full border-2 border-gray-400 bg-gray-800 bg-transparent font-semibold hover:border-transparent hover:bg-gray-400 hover:text-white'
              onClick={() => setDeloadModalIsOpen(true)}
            >
              Del
            </button>
          </div>
        )}
      </div>
      <div>
        <RPEModal />
        <RmModal />
        <DealoadModal />
      </div>
    </>
  )
}

export default Footer

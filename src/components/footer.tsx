import { FingerPrintIcon, } from '@heroicons/react/24/outline'
import { useAtom, } from 'jotai'
import RPEModal from './rpeModal'
import RmModal from './rmModal'
import DealoadModal from './deloadModal'

import {
  rmModalIsOpenAtom, rpeModalIsOpenAtom, deloadModalIsOpenAtom,
} from '~/store/store'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const [, setRmModalIsOpen,] = useAtom(rmModalIsOpenAtom)
  const [, setRpeModalIsOpen,] = useAtom(rpeModalIsOpenAtom)
  const [, setDeloadModalIsOpen,] = useAtom(deloadModalIsOpenAtom)
  return (
    <>
      <div className='px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center'>
        <Link href='/'>
          <Image
            src='/ce.png'
            alt='logo'
            width={50}
            height={50}
          />
        </Link>
        <div className='flex gap-2 text-sm md:text-lg font-bold text-gray-400'>
          <button
            className='bg-transparent hover:bg-gray-400 bg-gray-800 font-semibold hover:text-white w-10 h-10 md:w-12 md:h-12 border-2 border-gray-400 hover:border-transparent rounded-full'
            onClick={() => setRpeModalIsOpen(true)}
          >
            RPE
          </button>
          <button
            className='bg-transparent hover:bg-gray-400 bg-gray-800 font-semibold hover:text-white w-10 h-10 md:w-12 md:h-12 border-2 border-gray-400 hover:border-transparent rounded-full'
            onClick={() => setRmModalIsOpen(true)}
          >
            RM
          </button>
          <button
            className='bg-transparent hover:bg-gray-400 bg-gray-800 font-semibold hover:text-white w-10 h-10 md:w-12 md:h-12 border-2 border-gray-400 hover:border-transparent rounded-full'
            onClick={() => setDeloadModalIsOpen(true)}
          >
            Del
          </button>
        </div>
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

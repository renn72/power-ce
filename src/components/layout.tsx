import type { PropsWithChildren } from 'react'
import Navbar from './navbar'
import Footer from './footer'

const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <div className='flex min-h-screen min-w-fit flex-col bg-black text-gray-200'>
        <Navbar />
        <div className='grow'>{props.children}</div>
        <Footer />
      </div>
    </>
  )
}

export default Layout

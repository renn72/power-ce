import type { PropsWithChildren, } from 'react'
import Navbar from './navbar'
import Footer from './footer'

const Layout = (props: PropsWithChildren) => {

  return (
    <>
      <div className='min-h-screen flex flex-col bg-black text-gray-200 min-w-fit'>
        <Navbar />
        <div className='grow'>{props.children}</div>
        <Footer />
      </div>
    </>
  )
}

export default Layout

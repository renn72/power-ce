import type { PropsWithChildren } from "react";
import Navbar from './navbar'
import Footer from './footer'

const Layout = ( props : PropsWithChildren) => {
  return (
    <>
      <div className="h-screen flex flex-col bg-gray-900 text-gray-200 font-sans min-w-fit">
        <Navbar />
        <div className="grow">{props.children}</div>
        <Footer />
      </div>
    </>
  )
}

export default Layout

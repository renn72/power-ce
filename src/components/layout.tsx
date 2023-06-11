import Navbar from './navbar'
import Footer from './footer'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Layout = ({ children }) => {
  return (
    <>
      <div className="h-screen flex flex-col bg-gray-600 font-sans">

        <Navbar />
        <div className="grow">{children}</div>
        <Footer />
      </div>
    </>
  )
}

export default Layout

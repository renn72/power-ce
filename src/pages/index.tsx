import { type NextPage } from 'next'

import { useUser } from '@clerk/nextjs'

const Home: NextPage = () => {
  const { user } = useUser()

  const userId = user?.id || ''
  // const userId = 'user_2UhBMdOLkQUazMBwmEWw0g6DQ1v'

  return (
    <>
      <main className='flex h-full flex-col px-2 font-semibold'>
        <h1 className='text-xl'>Profile</h1>

      </main>
    </>
  )
}

export default Home

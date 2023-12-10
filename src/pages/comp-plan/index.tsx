import { useSession } from 'next-auth/react'
import { useState } from 'react'
import CompPlan from '~/components/compPlan'
import UserSelect from './userSelect'

const Comp = () => {
  const { data: session } = useSession()
  const user = session?.user
  const isAdmin = user?.isAdmin
  const [userId, setUserId] = useState(user?.id || '')

  if (!user) return null

  return (
    <>
      {isAdmin && (
        <div className='flex justify-around p-1 max-w-lg'>
          <div className='py-3 text-lg font-semibold'>User:</div>
          <div className='pt-1'>
            <UserSelect
              userId={userId}
              onSelectUser={setUserId}
            />
          </div>
        </div>
      )}
      <CompPlan
        userId={userId}
        isAdmin={false}
      />
    </>
  )
}

export default Comp

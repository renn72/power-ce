import { useSession } from 'next-auth/react'
import { LoadingPage } from '~/components/loading'
import { api } from '~/utils/api'
import { getDate, getTime } from '~/utils/utils'

const Log = () => {
  const { data: sesion } = useSession()
  const user = sesion?.user
  const { data: sets, isLoading: setsLoading } =
    api.blocks.getLogSets.useQuery()
  const { data: users, isLoading: usersLoading } =
    api.users.getAllUsers.useQuery()

  if (setsLoading || usersLoading) return <LoadingPage />

  if (!sets || !users) return <div>no data</div>

  if (!user) return <div>Login</div>
  if (!user.isAdmin) return <div>Not Authorized</div>

  return (
    <div className='flex flex-col gap-1 text-sm md:text-lg'>
      {sets.slice(0, 500).map((set) => (
        <div key={set.id}>
          <div className='flex flex-col gap-0 md:flex-row md:gap-6'>
            <h3 className=''>
              {users.find((u) => u.id === set.userId)?.firstName}
            </h3>
            <div className='flex gap-3'>
              <div className='flex gap-1'>
                <h3 className=''>{getDate(set.flield1)}</h3>
                <h3 className=''>{getTime(set.flield1)}</h3>
              </div>
              <h3 className=''>{set.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Log

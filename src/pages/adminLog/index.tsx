import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import { type Log } from '@prisma/client'

import { getDateShort, getTime24 as getTime } from '~/utils/utils'

const Log = ({ log }: { log: Log }) => {
  const request = JSON.parse(log?.request)
  const response = JSON.parse(log?.response)
  console.log({log : log?.location})
  const reg = /iPhone/
  const location = log.location == 'authenticated' ? 'auth' : log.location == 'unauthenticated' ? 'unauth' : log.location
   return (
    <div className='grid grid-cols-12 gap-1 border-b border-gray-700'>
      <div className={`${log.location == 'SignIn' ? 'text-yellow-500 font-medium' : ''}`}>
        {log.action}</div>
      <div
        className='col-span-2'
      >{getTime(log.createdAt)}-{getDateShort(log.createdAt)}</div>
      <div className='font-semibold col-span-2'>
        {response?.firstName}
        {` `}
        {response?.lastName}
      </div>
      <div
        className='col-span-2'
      >
        {log?.url.slice(23, 32)}
        {log?.url.length > 32 ? '...' : ''}
      </div>
      <div 
        className={`${location == 'unauth' ? 'text-red-600' : ''}`}
      >
        {location}
      </div>
      <div
        className='col-span-2'
      >{request?.['x-real-ip']}</div>
      <div>{request?.['user-agent'].match(reg)}</div>
    </div>
  )
}

const AdminLog = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const ctx = api.useUtils()
  const user = ctx.users.get.getData({ userId: userId, location: 'base' })

  const { data: log, isLoading: logLoading } = api.adminLog.getAll.useQuery()

  if (!user?.isRoot) {
    return (
      <>
        <h1>Access Denied</h1>
      </>
    )
  }

  if (logLoading) return <h1>Loading...</h1>

  return (
    <>
      <h1>AdminLog</h1>
      <div className='flex w-full flex-col text-sm md:text-lg tracking-tighter gap-0 min-w-max '>
        {log?.map((l) => (
          <div key={l.id}>
            {l.userId === 'david' ||
            l.location === 'settings' ||
            l.location === 'settings_user' ||
            l.userId === 'mitch' ? null : (
              <Log log={l} />
            )}
          </div>
        ))}
      </div>
    </>
  )
}
export default AdminLog

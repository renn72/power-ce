import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import { type Log } from '@prisma/client'

import { getDateShort, getTime24 as getTime } from '~/utils/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Request {
  'x-real-ip': string
  'user-agent': string
}

interface Response {
  firstName: string
  lastName: string
}

const Log = ({ log, idx }: { log: Log; idx: number }) => {
  const request = JSON.parse(log?.request as string) as Request // eslint-disable-line
  const response = JSON.parse(log?.response as string) as Response // eslint-disable-line
  const reg = /iPhone/
  const url = log.url || ''
  const location =
    log.location == 'authenticated'
      ? 'auth'
      : log.location == 'unauthenticated'
      ? 'unauth'
      : log.location

  console.log(idx, log)
  console.log({ request, response })

  return (
    <div className='grid grid-cols-13 gap-1 border-b border-gray-700'>
      <div>{idx}</div>
      <div
        className={`${
          log.location == 'SignIn' ? 'font-medium text-yellow-500' : ''
        }`}
      >
        {log.action}
      </div>
      <div className='col-span-2'>
        {getTime(log.createdAt)}-{getDateShort(log.createdAt)}
      </div>
      <div className='col-span-2 font-semibold'>
        {response?.firstName}
        {` `}
        {response?.lastName}
      </div>
      <div className='col-span-2'>
        {url.slice(23, 32)}
        {url.length > 32 ? '...' : ''}
      </div>
      <div className={`${location == 'unauth' ? 'text-red-600' : ''}`}>
        {location}
      </div>
      <div className='col-span-2'>{request?.['x-real-ip']}</div>
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

  const { mutate: clearLog } = api.adminLog.deleteAll.useMutation({
    onSuccess: () => {
      void ctx.adminLog.getAll.invalidate()
    },
  })

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
      <div className='text-lg font-semibold'>Size: {log?.length}</div>
      <Button
        onClick={() => {
          clearLog()
          toast.success('Log Cleared')
        }}
        className='mb-10'
      >
        Clear Log
      </Button>
      <div className='flex w-full min-w-max flex-col gap-0 text-xs tracking-tighter md:text-base '>
        {log?.map((l, idx) => (
          <div key={l.id}>
            {l.userId === 'david' ||
            l.location === 'settings' ||
            l.location === 'settings_user' ? null : (
              <Log
                log={l}
                idx={idx}
              />
            )}
          </div>
        ))}
      </div>
    </>
  )
}
export default AdminLog

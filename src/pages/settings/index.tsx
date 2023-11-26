import { useSession } from 'next-auth/react'

import Settings from '~/components/settings'

const SettingsPage = () => {
  const { data: session } = useSession()
  const user = session?.user
  const userId = session?.user.id || ''

  if (!user) return <div>Login</div>

  return (
    <>
      <Settings userId={userId} />
    </>
  )
}
export default SettingsPage

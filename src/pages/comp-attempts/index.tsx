import { useSession } from 'next-auth/react'
import CompAttempts from '~/components/compAttempts'

const Comp = () => {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) return null

  return (
  <>
      <CompAttempts userId={user.id || ''} />
  </>
  )
}

export default Comp

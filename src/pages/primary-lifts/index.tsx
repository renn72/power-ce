import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type NextPage } from 'next'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { LoadingPage } from '~/components/loading'
import { api } from '~/utils/api'
import { defaultLifts } from '~/store/defaultValues'
import { useSession } from 'next-auth/react'

const PrimaryLifts: NextPage = () => {
  const { data: session } = useSession()
  const user = session?.user
  const [value, setValue] = useState('')

  const { data: primaryLifts, isLoading: primaryLiftsLoading } =
    api.primaryLifts.getAll.useQuery()

  const ctx = api.useContext()

  const { mutate: addPrimaryLift } = api.primaryLifts.create.useMutation({
    onSuccess: () => {
      toast.success('Primary Lift Added')
      void ctx.primaryLifts.getAll.invalidate()
    },
    onError: () => {
      toast.error('Error, Must be unique')
    },
  })

  const { mutate: deletePrimaryLift } = api.primaryLifts.delete.useMutation({
    onSuccess: () => {
      toast.success('Primary Lift Deleted')
      void ctx.primaryLifts.getAll.invalidate()
    },
    onError: () => {
      toast.error('Error')
    },
  })

  if (primaryLiftsLoading) return <LoadingPage />

  const onAdd = () => {
    console.log('onAdd')
    if (!value || value == '') return
    addPrimaryLift({ name: value.trim().toLowerCase() })
    setValue('')
  }

  const onDelete = (id: string) => {
    console.log('onDelete', id)
    deletePrimaryLift({ id })
  }

  if (!user) return <div>Login</div>
  if (!user.isAdmin) return <div>Not Authorized</div>

  return (
    <>
      <div className='mx-auto my-10 flex h-full max-w-lg flex-col gap-8 px-2 font-medium tracking-wider'>
        <div className='flex gap-4'>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={onAdd}>Add</Button>
        </div>

        <div className='flex flex-col gap-4'>
          {primaryLifts &&
            primaryLifts.map((primaryLift) => (
              <div
                key={primaryLift.id}
                className='flex items-center justify-between gap-8'
              >
                <div className='text-2xl capitalize'>{primaryLift.name}</div>
                {!defaultLifts.includes(primaryLift.name) && (
                  <div
                    className='cursor-pointer text-xl font-bold'
                    onClick={() => onDelete(primaryLift.id)}
                  >
                    X
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default PrimaryLifts

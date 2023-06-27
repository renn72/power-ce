import { type NextPage, } from 'next'
import { useUser, } from '@clerk/nextjs'
import { toast, } from 'react-hot-toast'
import { api, } from '~/utils/api'

import TemplateSelect from './templateSelect'
import { LoadingPage } from '~/components/loading'

const Users: NextPage = () => {
  // Check for admin role
  const { user, } = useUser()
  if (!user) return <div>Login</div>
  if (user.organizationMemberships[0]?.role !== 'admin') return <div>Not auth</div>

  const ctx = api.useContext()

  const { isLoading: userProgramsLoading, } = api.userPrograms.getAll.useQuery()
  const {
    data: allUsers, isLoading: usersLoading,
  } = api.users.getAll.useQuery()
  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()
  const { data: programsData, } = api.blocks.getAllPrograms.useQuery()
  const { mutate: userProgramCreateMutate, } = api.userPrograms.create.useMutation({
    onSuccess: () => {
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllPrograms.invalidate()
      void ctx.userPrograms.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })
  const { mutate: userProgramRemoveMutate, } = api.userPrograms.remove.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success('Removed')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllPrograms.invalidate()
      void ctx.userPrograms.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const onSelectTemplate = (template: string, userId: string) => {
    console.log('template', template)
    console.log('userId', userId)
  }

  const onClearTemplate = (userId: string) => {
    console.log('userId', userId)
    userProgramRemoveMutate({ userId: userId, })
  }

  const onSetTemplate = (template: string, userId: string) => {
    console.log('template', template)
    console.log('userId', userId)
    console.log('blocksData', blocksData)
    const templateId = blocksData?.find((block) => block.name === template)?.id
    console.log('templateId', templateId)
    if (!templateId) return

    userProgramCreateMutate({
      userId: userId,
      templateId: templateId,
      programId: '',
      isProgramActive: true,
    })
  }

  if (usersLoading || userProgramsLoading || blocksLoading) return <div><LoadingPage /></div>

  return (
    <>
      <div className='h-full flex flex-col'>
        <main >
          <div className='mx-auto max-w-4xl py-6 sm:px-6 lg:px-8'>
            <div className='flex flex-col gap-4 border border-gray-400 rounded-lg m-2 p-4'>
              <div className='text-xl font-bold text-gray-200'>Admins</div>
              <div className='flex flex-col gap-4'>
                {allUsers?.admins?.map((user) => (
                  <TemplateSelect
                    key={user.id}
                    onSelectTemplate={onSelectTemplate}
                    onSetTemplate={onSetTemplate}
                    onClearTemplate={onClearTemplate}
                    userId={user.id}
                    userFirstName={user.firstName}
                    userLastName={user.lastName}
                  />
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-4 border border-gray-400 rounded-lg m-2 mt-8 p-4'>
              <div className='text-xl font-bold text-gray-200'>Users</div>
              <div className='flex flex-col gap-4'>
                {allUsers?.users?.map((user) => (
                  <TemplateSelect
                    key={user.id}
                    onSelectTemplate={onSelectTemplate}
                    onSetTemplate={onSetTemplate}
                    onClearTemplate={onClearTemplate}
                    userId={user.id}
                    userFirstName={user.firstName}
                    userLastName={user.lastName}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Users

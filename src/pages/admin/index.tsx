import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import React from 'react'

import { getDate} from '~/utils/utils'

import { api } from '~/utils/api'

const Admin = () => {
  const { data: session} = useSession()
  const userId = session?.user?.id || ''
  const { data: user } = api.users.get.useQuery({ userId: userId })
  const ctx = api.useUtils()
  const { data: allTemplates, isLoading: allTemplatesLoading } =
    api.blocks.getAllBlockTitlesAdmin.useQuery()
  const { data: allPrograms, isLoading: allProgramsLoading } =
    api.blocks.getAllProgramTitles.useQuery()
  const { data: allUsers } = api.users.getAllUsers.useQuery()

  const { mutate: deleteSoftTemplate } = api.blocks.softDelete.useMutation({
    onSuccess: () => {
      void ctx.blocks.getAllBlockTitles.invalidate()
      void ctx.blocks.getAllProgramTitles.invalidate()
    },
  })
  const { mutate: deleteTemplate } = api.blocks.hardDelete.useMutation({
    onSuccess: () => {
      void ctx.blocks.getAllBlockTitles.invalidate()
      void ctx.blocks.getAllProgramTitles.invalidate()
    },
  })
  const { mutate: undeleteSoftTemplate } = api.blocks.softUnDelete.useMutation({
    onSuccess: () => {
      void ctx.blocks.getAllBlockTitles.invalidate()
      void ctx.blocks.getAllProgramTitles.invalidate()
    },
  })

  if (allTemplatesLoading || allProgramsLoading) return <div>Loading...</div>

  if (!allTemplates || !allPrograms || !allUsers) return null

  if (!user) return <div>Login</div>
  if (!user.isAdmin) return <div>Not Authorized</div>

  return (
    <div>
      <h1>Admin</h1>
      <div className='mb-12'>
        <h2 className='mb-8 text-3xl font-bold'>Templates</h2>
        <div className='flex flex-col gap-1'>
          {allTemplates
            ?.filter((t) => t.isDeleted !== true)
            .map((template) => (
              <div
                className='flex items-baseline gap-4 text-lg'
                key={template.id}
              >
                <Button
                  className='text-red-500'
                  onClick={() => {
                    deleteSoftTemplate({ id: template.id })
                  }}
                >
                  Delete
                </Button>
                <div className='w-72 overflow-hidden'>{template.name}</div>
              </div>
            ))}
        </div>
      </div>
      <div className='mb-12'>
        <h2 className='mb-8 text-3xl font-bold'>Deleted Templates</h2>
        <div className='flex flex-col gap-4'>
          {allTemplates
            ?.filter((t) => t.isDeleted === true)
            .map((template) => (
              <div
                className='flex items-baseline gap-4 text-lg'
                key={template.id}
              >
                <div className='w-72 overflow-hidden'>{template.name}</div>
                <Button
                  className='text-green-500'
                  onClick={() => {
                    undeleteSoftTemplate({ id: template.id })
                  }}
                >
                  UnDelete
                </Button>
                <Button
                  className='text-red-500 font-black'
                  onClick={() => {
                    deleteTemplate({ id: template.id })
                  }}
                >
                  Permantent Delete
                </Button>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2>Programs</h2>
        <div className='flex flex-col gap-8 '>
          {allUsers?.map((user) => (
            <div
              className='flex flex-col gap-1'
              key={user.id}
            >
              <div className='text-xl font-bold'>
                {user.firstName} {user.lastName}
              </div>
              {allPrograms
                ?.filter(
                  (p) => p.userIdOfProgram === user.id && p.isDeleted !== true,
                )
                .map((program) => (
                  <div
                    className='grid grid-cols-6 items-baseline gap-4 text-xl max-w-2xl'
                    key={program.id}
                  >
                      <h2 className='col-span-2'>
                        {program.name}
                      </h2>
                      <h2 className='col-span-2'>
                        {getDate(program.createdAt)}
                      </h2>
                      <div className='text-green-600'>
                        {program.isProgramActive ? 'Active' : null}
                      </div>
                      <Button
                        size='lg'
                        className='text-red-500 w-fit'
                        onClick={() => {
                          deleteTemplate({ id: program.id })
                        }}
                      >
                        Permantent Delete
                      </Button>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin

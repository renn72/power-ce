import { Button } from '@/components/ui/button'
import React from 'react'
import ProgramCard from '~/components/programCard'

import { api } from '~/utils/api'

const Admin = () => {
  const ctx = api.useContext()
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

  console.log({ allTemplates, allPrograms, allUsers })

  if (allTemplatesLoading || allProgramsLoading) return <div>Loading...</div>

  if (!allTemplates || !allPrograms || !allUsers) return null

  return (
    <div>
      <h1>Admin</h1>
      <div className='mb-12'>
        <h2 className='text-3xl font-bold mb-8'>Templates</h2>
        <div className='flex flex-col gap-4'>
          {allTemplates
            ?.filter((t) => t.isDeleted !== true)
            .map((template) => (
              <div
                className='flex gap-4 text-xl items-baseline'
                key={template.id}
              >
                <div className='w-72 overflow-hidden'>{template.name}</div>
                <Button
                  className='text-red-500'
                  onClick={() => {
                    deleteSoftTemplate({ id: template.id })
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
        </div>
      </div>
      <div className='mb-12'>
        <h2 className='text-3xl font-bold mb-8'>Deleted Templates</h2>
        <div className='flex flex-col gap-4'>
          {allTemplates
            ?.filter((t) => t.isDeleted === true)
            .map((template) => (
              <div
                className='flex gap-4 text-xl items-baseline'
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
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2>Programs</h2>
        <div className='flex flex-col gap-8 '>
          {allUsers?.map((user) => (
            <div
              className='flex flex-col gap-4'
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
                    className='flex gap-4 text-xl items-baseline'
                    key={program.id}
                  >
                    <div className='flex gap-4 items-baseline'>
                      <ProgramCard
                        programId={program.id}
                        isAdmin={true}
                      />
                      <div className='text-green-600'>
                        {program.isProgramActive ? 'Active' : null}
                      </div>
                      <Button
                        className='text-red-500'
                        onClick={() => {
                          deleteSoftTemplate({ id: program.id })
                        }}
                      >
                        Delete
                      </Button>
                    </div>
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

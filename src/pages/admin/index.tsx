import { Button } from '@/components/ui/button'
import React from 'react'
import ProgramCard from '~/components/programCard'

import { api } from '~/utils/api'

const Admin = () => {
  const ctx = api.useContext()
  const { data: allTemplates, isLoading: allTemplatesLoading } =
    api.blocks.getAllBlockTitles.useQuery()
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
        <h2>Templates</h2>
        <ul>
          {allTemplates?.map((template) => (
            <li
              className='flex gap-4'
              key={template.id}
            >
              <div>{template.name}</div>
              <div>{template.isDeleted ? 'deleted' : ''}</div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Programs</h2>
        <div className='flex flex-col gap-8 '>
          {allUsers?.map((user) => (
            <div
              className='flex flex-col gap-4 '
              key={user.id}
            >
              <div className='text-xl font-bold'>
                {user.firstName} {user.lastName}
              </div>
              {allPrograms
                ?.filter((p) => p.userIdOfProgram === user.id)
                .map((program) => (
                  <div
                    className={`flex gap-4 ${
                      program.isDeleted ? 'hidden' : ''
                    }`}
                    key={program.id}
                  >
                    {program.isDeleted === true ? null : (
                      <div className='flex gap-4'>
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
                    )}
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

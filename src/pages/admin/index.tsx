import React from 'react'
import ProgramCard from '~/components/programCard'

import { api } from '~/utils/api'

const Admin = () => {
  const { data: allTemplates, isLoading: allTemplatesLoading } =
    api.blocks.getAllBlockTitles.useQuery()
  const { data: allPrograms, isLoading: allProgramsLoading } =
    api.blocks.getAllProgramTitles.useQuery()
  const { data: allUsers } = api.users.getAllUsers.useQuery()

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
        <ul>
          {allPrograms?.map((program) => (
            <li
              className='flex gap-4'
              key={program.id}
            >
              <ProgramCard programId={program.id} isAdmin={true} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Admin

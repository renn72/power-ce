import { type UserProgram, } from '@prisma/client'
import { api, } from '~/utils/api'

const ProgramCard = ({ userProgram, }: { userProgram: UserProgram }) => {
  const { data: programs, } = api.blocks.getAllUserPrograms.useQuery()
  console.log(programs)
  const program = programs?.find((program) => program.id === userProgram.programId)
  console.log(program)
  return (
    <div className=''>
      Program: {userProgram.isProgramActive ? 'Active, ' : 'Inactive, '}
      Name: {program?.name}
    </div>
  )
}

export default ProgramCard

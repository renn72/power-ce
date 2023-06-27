import { type UserProgram, } from '@prisma/client'

const ProgramCard = ({ program, }: { program: UserProgram }) => {
  console.log(program)
  return (
    <div className=''>
      Program: {program.isProgramActive ? 'Active' : 'Inactive'}
    </div>
  )
}

export default ProgramCard

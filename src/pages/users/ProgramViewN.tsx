import React from 'react'

import { api } from '~/utils/api'

import Form from '~/pages/templates2/form'

import { createContext } from 'react'
import { type UseFieldArrayReturn } from 'react-hook-form'

export type UseFieldArray = {
  [key: string]: UseFieldArrayReturn
}

export const FieldArrayContext = createContext<UseFieldArray[]>([])
const ProgramViewN = ({
  programId,
  tabIndex,
}: {
  programId: string
  tabIndex: number
}) => {
  const { data, isLoading } = api.blocks.get.useQuery({ id: programId })
  if (isLoading) return null
  return (
    <div className='mt-10'>
      { programId === '' ? null : (
      <FieldArrayContext.Provider value={[]}>
        <main className='flex h-full min-w-[1600px] max-w-[100vw] flex-col items-center justify-center text-sm font-semibold sm:text-base'>
          <div className='flex w-full flex-col items-center justify-center '>
            <Form
              isProgramProps={true}
              ProgramId={programId}
              triggerReset={tabIndex}
              program={data}
            />
          </div>
        </main>
      </FieldArrayContext.Provider>
      )}
    </div>
  )
}

export default ProgramViewN

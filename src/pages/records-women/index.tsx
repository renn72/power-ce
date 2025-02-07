import { LoadingPage } from '~/components/loading'
import { api } from '~/utils/api'

import { useEffect } from 'react'

const women = [
  '44',
  '48',
  '52',
  '56',
  '60',
  '67.5',
  '75',
  '82.5',
  '90',
  '90+',
  'M-67.5',
  'M+67.5',
]

const men = [
  '52',
  '56',
  '60',
  '67.5',
  '75',
  '82.5',
  '90',
  '100',
  '110',
  '125',
  '140',
  '140+',
]

const Cell = ({
  recordName,
  recordWeight,
}: {
  recordName: string
  recordWeight: string
}) => {
  return (
    <div className='flex w-72 cursor-pointer items-baseline justify-center border border-gray-400 px-1 py-[0.50rem] 2xl:w-[32rem] 2xl:py-4'>
      {recordName.toLowerCase() === 'm.dash' ? (
        <div className='font-extrabold uppercase text-yellow-500'>
          {recordWeight.trim()}
          <span className='text-lg text-gray-400'>
            {recordName != '' && 'KG'}
          </span>
        </div>
      ) : (
        <div>
          {recordWeight.trim()}
          <span className='text-lg text-gray-400'>
            {recordName != '' && 'KG'}
          </span>
        </div>
      )}
      <div className='text-yellow-500'>{recordName != '' && '/'}</div>
      {recordName.toLowerCase() === 'm.dash' ? (
        <div className='font-extrabold uppercase text-yellow-500'>M.DASH</div>
      ) : (
        <div className='uppercase'>{recordName}</div>
      )}
    </div>
  )
}

const CellWCHeading = ({ children }: { children: React.ReactNode }) => (
  <div className='flex w-[7.88rem] justify-center border border-gray-800 bg-yellow-500 px-1 py-[0.60rem] font-extrabold tracking-tight text-gray-900  2xl:w-40 2xl:py-4'>
    {children}
  </div>
)

const CellWC = ({ children }: { children: React.ReactNode }) => (
  <div className='flex w-[7.88rem] justify-center border border-gray-400 px-1 py-2 font-extrabold tracking-tight  2xl:w-40 2xl:py-4'>
    {children}
  </div>
)

const CellHeading = ({ children }: { children: React.ReactNode }) => (
  <div className='flex w-72 justify-center border border-gray-800 bg-yellow-500  px-1 py-[0.60rem] font-extrabold tracking-tight text-gray-900  2xl:w-[32rem] 2xl:py-4'>
    {children}
  </div>
)

const Records = () => {
  const { data: _records, isLoading: recordsLoading } =
    api.records.getAll.useQuery()

  const records = _records?.map((r) => ({
    ...r,
    weight: Number(r.weight),
  }))

  const utils = api.useUtils()

  const pageRefresh = () => {
    utils.records.getAll.invalidate()
  }

  const setRefresh = () => {
    setTimeout(() => {
      pageRefresh()
    }, 1000 * 60 * 10) // 10 minutes
  }

  useEffect(() => {
    setRefresh()
  }, [records])

  if (recordsLoading) return <LoadingPage />

  return (
    <div className='text-3xxl flex w-fit flex-col gap-12 font-semibold'>
      <div className='flex flex-col'>
        <div className='flex w-fit items-baseline border border-gray-800 font-bold tracking-widest'>
          <CellWCHeading>WC</CellWCHeading>
          <CellHeading>SQUAT</CellHeading>
          <CellHeading>BENCH</CellHeading>
          <CellHeading>DEADLIFT</CellHeading>
          <CellHeading>TOTAL</CellHeading>
        </div>
        <div className='w-fit border border-gray-200 font-bold'>
          {women.map((weight) => (
            <div
              className='flex'
              key={weight}
            >
              <CellWC>{weight}</CellWC>
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'squat' &&
                        r.wc === weight &&
                        r.gender === 'w',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'squat' &&
                              r.wc === weight &&
                              r.gender === 'w',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'bench' &&
                        r.wc === weight &&
                        r.gender === 'w',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'bench' &&
                              r.wc === weight &&
                              r.gender === 'w',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'deadlift' &&
                        r.wc === weight &&
                        r.gender === 'w',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'deadlift' &&
                              r.wc === weight &&
                              r.gender === 'w',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'total' &&
                        r.wc === weight &&
                        r.gender === 'w',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'total' &&
                              r.wc === weight &&
                              r.gender === 'w',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Records

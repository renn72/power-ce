import { LoadingPage } from '~/components/loading'
import { api } from '~/utils/api'

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
    <div className='flex w-72 cursor-pointer justify-center items-baseline border border-gray-400 px-1 py-[0.50rem] 2xl:w-[32rem] 2xl:py-4'>
        <div>
          {recordWeight.trim()}
          <span className='text-lg text-gray-400'>{recordName != '' && 'KG'}</span>
        </div>
        <div className='text-yellow-500'>{recordName != '' && '/'}</div>
        <div className='uppercase'>{recordName}</div>
    </div>
  )
}

const CellWCHeading = ({ children }: { children: React.ReactNode }) => (
  <div className='flex w-[7.88rem] justify-center border border-gray-800 bg-yellow-500 px-1 py-[0.60rem] text-gray-900 2xl:w-40 2xl:py-4  font-extrabold tracking-tight'>
    {children}
  </div>
)

const CellWC = ({ children }: { children: React.ReactNode }) => (
  <div className='flex w-[7.88rem] justify-center border border-gray-400 px-1 py-2 2xl:w-40 2xl:py-4  font-extrabold tracking-tight'>
    {children}
  </div>
)

const CellHeading = ({ children }: { children: React.ReactNode }) => (
  <div className='flex w-72 justify-center border border-gray-800 bg-yellow-500  px-1 py-[0.60rem] text-gray-900 2xl:w-[32rem] 2xl:py-4  font-extrabold tracking-tight'>
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

  if (recordsLoading) return <LoadingPage />

  return (
    <div className='flex flex-col gap-12 font-semibold text-3xxl w-fit'>
      <div className='flex flex-col'>
        <div className='flex w-fit items-baseline font-bold border border-gray-800 tracking-widest'>
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


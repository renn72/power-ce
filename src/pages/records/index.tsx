import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Transition, Dialog } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { LoadingPage } from '~/components/loading'
import { api } from '~/utils/api'

const women = [
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

const ModalWrapper = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean
  setIsOpen: (args: boolean) => void
  children: React.ReactNode
}) => {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsOpen(true)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto text-gray-200'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-visible rounded-2xl bg-gray-900 p-6 text-left align-middle transition-all'>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
const Cell = ({
  wc,
  gender,
  lift,
  recordName,
  recordWeight,
  userId,
  isAuth,
}: {
  wc: string
  gender: string
  lift: string
  recordName: string
  recordWeight: string
  userId: string
  isAuth: boolean
}) => {
  const ctx = api.useContext()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const { mutate: saveRecord } = api.records.create.useMutation({
    onSuccess: (data) => {
      console.log(data)
      void ctx.records.getAll.invalidate()
    },
  })

  const onSave = () => {
    saveRecord({
      userId: userId,
      name: name,
      weight: Number(value),
      date: new Date().toISOString(),
      gender: gender,
      wc: wc,
      lift: lift,
    })
  }

  return (
    <div
      onClick={() => {
        if (!isAuth) return
        setIsOpen(true)
      }}
      className='flex w-64 cursor-pointer gap-2 border border-gray-400 px-4 py-2 hover:scale-105 hover:bg-gray-900'
    >
      <div className='flex gap-1'>
        <div>
          {recordWeight}
          <span className='text-sm text-gray-400'>kg</span>
        </div>
        <div className='text-yellow-500'>/</div>
        <div>{recordName}</div>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className='flex flex-col gap-2'>
          <h2 className='flex gap-2 text-2xl font-semibold mb-4'>
            <div>{gender === 'm' ? 'Men' : 'Women'}</div>
            <div>{wc}kg</div>
            <div className='capitalize'>{lift}</div>
          </h2>
          <div className='flex gap-1 text-xl justify-center'>
            <div>
              {recordWeight}
              <span className='text-sm text-gray-400'>kg</span>
            </div>
            <div className='text-yellow-500'>/</div>
            <div>{recordName}</div>
          </div>
          <Input
            placeholder='Name'
            className='bg-gray-900'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <Input
            placeholder='Weight'
            className='bg-gray-900'
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
          />
          <div className='mt-4 flex justify-center gap-2'>
            <Button
              onClick={() => {
                if (!value) return
                if (!name) return
                onSave()
                setIsOpen(false)
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setName('')
                setValue('')
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  )
}

const CellWCHeading = ({ children }: { children: React.ReactNode }) => (
  <div className='w-32 border border-gray-800 bg-yellow-500 px-4 py-2 text-gray-900'>
    {children}
  </div>
)

const CellWC = ({ children }: { children: React.ReactNode }) => (
  <div className='w-32 border border-gray-400 px-4 py-2'>{children}</div>
)

const CellHeading = ({ children }: { children: React.ReactNode }) => (
  <div className='w-64 border border-gray-800 bg-yellow-500 px-4  py-2 text-gray-900'>
    {children}
  </div>
)

const Records = () => {
  const { data: session } = useSession()
  const user = session?.user
  const userId = session?.user?.id || ''

  const isSuper = user?.isRecordEditor || false

  const { data: _records, isLoading: recordsLoading } = api.records.getAll.useQuery()

  const records = _records?.map((r) => ({
    ...r,
    weight: Number(r.weight),
  }))

  console.log(user)

  if (!user) return null
  if (recordsLoading) return <LoadingPage />

  return (
    <div className='mb-32 flex flex-col gap-12 text-xl font-semibold'>
      <div className='flex flex-col gap-1'>
        <h1>Men</h1>
        <div className='flex w-fit items-baseline font-bold tracking-widest'>
          <CellWCHeading>WC</CellWCHeading>
          <CellHeading>SQUAT</CellHeading>
          <CellHeading>BENCH</CellHeading>
          <CellHeading>DEADLIFT</CellHeading>
          <CellHeading>TOTAL</CellHeading>
        </div>
        <div className='w-fit border border-gray-200'>
          {men.map((weight) => (
            <div
              className='flex'
              key={weight}
            >
              <CellWC>{weight}</CellWC>
              <Cell
                recordName={
                  records
                    ?.filter((r) => r.lift === 'squat' && r.wc === weight && r.gender === 'm')
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
                          ?.filter((r) => r.lift === 'squat' && r.wc === weight && r.gender === 'm')
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
                gender={'m'}
                wc={weight}
                lift={'squat'}
                userId={userId}
                isAuth={isSuper}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'bench' &&
                        r.wc === weight &&
                        r.gender === 'm',
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
                              r.gender === 'm',
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
                gender={'m'}
                wc={weight}
                lift={'bench'}
                userId={userId}
                isAuth={isSuper}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'deadlift' &&
                        r.wc === weight &&
                        r.gender === 'm',
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
                              r.gender === 'm',
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
                gender={'m'}
                wc={weight}
                lift={'deadlift'}
                userId={userId}
                isAuth={isSuper}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'total' &&
                        r.wc === weight &&
                        r.gender === 'm',
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
                              r.gender === 'm',
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
                gender={'m'}
                wc={weight}
                lift={'total'}
                userId={userId}
                isAuth={isSuper}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <h1>Women</h1>
        <div className='flex w-fit items-baseline font-bold tracking-widest'>
          <CellWCHeading>WC</CellWCHeading>
          <CellHeading>SQUAT</CellHeading>
          <CellHeading>BENCH</CellHeading>
          <CellHeading>DEADLIFT</CellHeading>
          <CellHeading>TOTAL</CellHeading>
        </div>
        <div className='w-fit border border-gray-200'>
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
                gender={'w'}
                wc={weight}
                lift={'squat'}
                userId={userId}
                isAuth={isSuper}
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
                gender={'w'}
                wc={weight}
                lift={'bench'}
                userId={userId}
                isAuth={isSuper}
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
                gender={'w'}
                wc={weight}
                lift={'deadlift'}
                userId={userId}
                isAuth={isSuper}
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
                gender={'w'}
                wc={weight}
                lift={'total'}
                userId={userId}
                isAuth={isSuper}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Records

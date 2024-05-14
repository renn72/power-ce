import React, { useState, useEffect, } from 'react'
import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'

import { Disclosure, Transition, Tab, } from '@headlessui/react'

import { ChevronUpIcon } from '@heroicons/react/20/solid'
import TemplateSelect from './templateSelect'
import { LoadingPage, LoadingWrapper } from '~/components/loading'
import OneRMCard from '~/components/oneRMCard'

import ProgramView from '~/components/programView'
import CompDate from '~/components/compDate'
import UserSelect from './userSelect'

import CountDown from '~/components/countDown'
import TrainerSelect from './trainerSelect'
import Settings from '~/components/settings'
import { RefreshCcwIcon, } from 'lucide-react'
import { CopyIcon, } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CompPlan from '~/components/compPlan'
import ModalWrapper from '~/components/settings/modalWrapper'

import UserProgramCheck from './userProgramCheck'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const rpeChart = [
  [10, 100.0, 95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0],
  [9.5, 97.8, 93.9, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7],
  [9, 95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3],
  [8.5, 93.9, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0],
  [8, 92.9, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6],
  [7.5, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0, 61.3],
  [7, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6, 59.9],
  [6.5, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0, 61.3, 58.6],
  [6, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6, 59.9, 57.4],
]

const UserDisclosure = ({
  userId,
  isOneRM,
  programId,
}: {
  userId: string
  isOneRM: boolean
  programId: string
}) => (
  <Disclosure defaultOpen={false}>
    {({ open }) => (
      <div className='flex flex-col md:gap-8'>
        <div className='flex flex-col sm:flex-row md:gap-6'>
          <Disclosure.Button
            className={`${
              open
                ? 'border-b border-yellow-500'
                : 'border-b border-black hover:border-white'
            } flex items-center gap-2 px-2 py-0 text-lg font-medium `}
          >
            <span>{isOneRM ? 'One Rep Maxes' : 'Program'}</span>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-8 w-8 text-gray-400`}
            />
          </Disclosure.Button>
          <div className='flex gap-2'></div>
        </div>

        <Transition
          className='transition-all duration-300 ease-out'
          enterFrom='transform scale-70 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-70 opacity-0'
        >
          <Disclosure.Panel className=''>
            {isOneRM ? (
              <OneRMCard userId={userId} />
            ) : (
              <ProgramView
                userId={userId}
                isAdmin={true}
                programId={programId}
              />
            )}
          </Disclosure.Panel>
        </Transition>
      </div>
    )}
  </Disclosure>
)
const UserPage = ({
  onSelectTemplate,
  onSetTemplate,
  onClearTemplate,
  userId,
  userFirstName,
  userLastName,
}: {
  onSelectTemplate: (arg0: string, arg1: string) => void
  onSetTemplate: (arg0: string, arg1: string) => void
  onClearTemplate: (arg0: string) => void
  userId: string
  userFirstName: string | null
  userLastName: string | null
}) => {
  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId })
  const { data: activeProgram } = api.blocks.getUserActiveProgram.useQuery({
    userId: userId,
  })

  return (
    <div className='flex w-full flex-col justify-start gap-0'>
      <div className='flex w-full justify-end'>
        <CountDown userId={userId} />
      </div>
      <TemplateSelect
        onSelectTemplate={onSelectTemplate}
        onSetTemplate={onSetTemplate}
        onClearTemplate={onClearTemplate}
        userId={userId}
        userFirstName={userFirstName}
        userLastName={userLastName}
      />
      <TrainerSelect userId={userId} />
      <CompDate userId={userId} />
      <UserDisclosure
        userId={userId}
        isOneRM={true}
        programId={''}
      />
      {activeProgram ? (
        <UserDisclosure
          userId={userId}
          isOneRM={false}
          programId={activeProgram.id}
        />
      ) : null}
    </div>
  )
}

const ProgramHistory = ({ userId }: { userId: string }) => {
  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId })

  const { data: programs, isLoading: programsLoading } =
    api.blocks.getAllUserProgramsTitles.useQuery({ userId: userId })

  if (programsLoading) return <LoadingPage />

  return (
    <div className='flex flex-col gap-16'>
      {programs &&
        programs.map((program) => (
          <div key={program.id}>
            {program.isProgramActive ? null : (
              <Disclosure defaultOpen={false}>
                {({ open }) => (
                  <div className='flex flex-col md:gap-8'>
                    <div className='flex flex-col sm:flex-row md:gap-6'>
                      <Disclosure.Button
                        className={`${
                          open
                            ? 'border-b border-yellow-500'
                            : 'border-b border-black hover:border-white'
                        } flex items-center gap-2 px-2 py-2 text-lg font-medium `}
                      >
                        {program.name}
                        <ChevronUpIcon
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-8 w-8 text-gray-400`}
                        />
                      </Disclosure.Button>
                      <div className='flex gap-2'></div>
                    </div>

                    <Transition
                      className='transition-all duration-300 ease-out'
                      enterFrom='transform scale-70 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-70 opacity-0'
                    >
                      <Disclosure.Panel className=''>
                        <ProgramView
                          userId={userId}
                          programId={program.id}
                          isAdmin={false}
                        />
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            )}
          </div>
        ))}
    </div>
  )
}

const OpenPowerlifting = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ctx = api.useContext()
  const { data: compLifts, isLoading: compLiftsLoading } =
    api.compLift.getCompLifts.useQuery({
      userId: userId,
    })
  const { data: addressData } = api.compLift.getAddress.useQuery({
    userId: userId,
  })

  const { mutate: setOpenPowerliftingData } =
    api.compLift.setOpenPower.useMutation({
      onSuccess: (_data) => {
        void ctx.compLift.getCompLifts.invalidate({ userId: userId })
        setIsOpen(false)
      },
    })

  const { mutate: saveAddress } = api.compLift.createAddress.useMutation({
    onSuccess: () => {
      toast.success('saved')
      void ctx.compLift.getCompLifts.invalidate({ userId: userId })
    },
  })

  const [address, setAddress] = useState(addressData?.address || '')
  useEffect(() => {
    setAddress(addressData?.address || '')
  }, [addressData])

  if (compLiftsLoading) return <LoadingPage />

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex gap-24'>
        <div className='p-2 text-xl font-semibold capitalize text-yellow-500'>
          Competitions
        </div>
        <div
          className='p-2'
          onClick={() => {
            setIsOpen(true)
            setOpenPowerliftingData({ userId: userId })
          }}
        >
          <RefreshCcwIcon className='h-6 w-6 cursor-pointer text-yellow-400 hover:animate-spin hover:text-yellow-500 ' />
        </div>
      </div>
      <div className='flex max-w-[800px] flex-col gap-0 space-y-2 divide-y divide-dashed divide-gray-400'>
        {compLifts?.map((comp) => (
          <div
            key={comp.id}
            className='flex flex-col gap-1 pt-2'
          >
            <div className='flex flex-col gap-0'>
              <div className='flex flex-col  gap-0 text-lg'>
                <div className='capitalize  text-yellow-500'>
                  {comp.MeetName}
                </div>
                <div className='capitalize'>{comp.Federation}</div>
              </div>
              <div className='text-sm text-gray-400'>{comp.Date}</div>
            </div>
            <div className=''>
              Squat: {` `}
              {Math.max(
                Number(comp.Squat1),
                Number(comp.Squat2),
                Number(comp.Squat3),
                Number(comp.Squat4),
              )}
              kg
            </div>
            <div className=''>
              Bench: {` `}
              {Math.max(
                Number(comp.Bench1),
                Number(comp.Bench2),
                Number(comp.Bench3),
                Number(comp.Bench4),
              )}
              kg
            </div>
            <div className=''>
              Deadlift: {` `}
              {Math.max(
                Number(comp.Deadlift1),
                Number(comp.Deadlift2),
                Number(comp.Deadlift3),
                Number(comp.Deadlift4),
              )}
              kg
            </div>
            <div className=''>Total: {comp.Total}kg</div>
          </div>
        ))}
      </div>
      <div className='w-full'>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className='mb-4 w-[600px]'
          size={address.length / 1.7}
          placeholder='Open Powerlifting Address'
        />
        <div className='mb-4 pl-3 text-xs font-normal text-gray-600'>
          eg. https://www.openpowerlifting.org/api/liftercsv/johndoe
        </div>
        <div className='flex items-center gap-4'>
          <Button
            className='rounded bg-yellow-400 px-4 py-2 font-bold text-gray-900 hover:bg-yellow-500'
            onClick={() => saveAddress({ userId: userId, address: address })}
          >
            Save
          </Button>
        </div>
      </div>
      <LoadingWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}

const TabWrapper = ({ title }: { title: string }) => (
  <Tab
    className={({ selected }) =>
      classNames(
        'py-4 tracking-tighter hover:bg-gray-900',
        selected ? 'font-semibold text-white' : 'font-medium text-gray-500',
      )
    }
  >
    {title}
  </Tab>
)

const Users = () => {
  const { data: session } = useSession()
  const { data: user } = api.users.get.useQuery({
    userId: session?.user?.id || '',
  })
  const [userId, setUserId] = useState<string>(() => session?.user?.id || '')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [isRpeModalOpen, setIsRpeModalOpen] = useState<boolean>(false)
  const [rpeModalValue, setRpeModalValue] = useState<string>('')
  const [rpeModalKey, setRpeModalKey] = useState<string>('')

  const ctx = api.useUtils()

  const { data: allUsers} = api.users.getAllUsers.useQuery()

  const { mutate: userProgramCreateSecondaryMutate } =
    api.userPrograms.createSecondary.useMutation({
      onSuccess: () => {
        toast.success('Saved')
        setIsOpen(false)
        void ctx.blocks.getUserActiveProgram.invalidate()
        void ctx.blocks.getUserSecondaryProgram.invalidate()
        void ctx.blocks.getUserActiveProgramFull.invalidate()
        void ctx.blocks.getAllUserProgramsTitles.invalidate()
      },
      onError: (e) => {
        console.log('error', e)
        toast.error('Error')
        setIsOpen(false)
      },
    })
  const { mutate: userProgramRemoveSecondaryMutate } =
    api.userPrograms.removeSecondary.useMutation({
      onSuccess: () => {
        console.log('success')
        setIsOpen(false)
        toast.success('Removed')
        void ctx.blocks.getUserActiveProgram.invalidate()
        void ctx.blocks.getUserSecondaryProgram.invalidate()
        void ctx.blocks.getUserActiveProgramFull.invalidate()
        void ctx.blocks.getAllUserProgramsTitles.invalidate()
      },
      onError: (e) => {
        setIsOpen(false)
        console.log('error', e)
        toast.error('Error')
      },
    })

  const { mutate: userProgramCreateMutate } =
    api.userPrograms.create.useMutation({
      onSuccess: () => {
        toast.success('Saved')
        setIsOpen(false)
        void ctx.blocks.getUserActiveProgram.invalidate()
        void ctx.blocks.getUserActiveProgramFull.invalidate()
        void ctx.blocks.getAllUserProgramsTitles.invalidate()
      },
      onError: (e) => {
        console.log('error', e)
        toast.error('Error')
        setIsOpen(false)
      },
    })
  const { mutate: userProgramRemoveMutate } =
    api.userPrograms.remove.useMutation({
      onSuccess: () => {
        console.log('success')
        setIsOpen(false)
        toast.success('Removed')
        void ctx.blocks.getUserActiveProgram.invalidate()
        void ctx.blocks.getUserActiveProgramFull.invalidate()
        void ctx.blocks.getAllUserProgramsTitles.invalidate()
      },
      onError: (e) => {
        setIsOpen(false)
        console.log('error', e)
        toast.error('Error')
      },
    })

  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId })
  api.users.getAllUsersProfiles.useQuery()

  const { data: activeProgram } = api.blocks.getUserActiveProgram.useQuery({
    userId: userId,
  })

  const { data: secondaryProgram } =
    api.blocks.getUserSecondaryProgram.useQuery({
      userId: userId,
    })

  const onClearTemplate = (userId: string) => {
    console.log('userId', userId)
    setIsOpen(true)
    userProgramRemoveMutate({ userId: userId })
  }

  const onSetTemplate = (templateId: string, userId: string, name: string) => {
    if (!templateId) return
    setIsOpen(true)
    userProgramCreateMutate({
      userId: userId,
      templateId: templateId,
      programId: '',
      isProgramActive: true,
      name: name,
    })
  }

  const { data: userInfo } = api.settings.get.useQuery({
    userId: userId,
  })

  const { mutate: compPlanMutate } = api.plans.create.useMutation({
    onSuccess: (e) => {
      console.log('success', e)
      void ctx.plans.get.invalidate({ userId: userId })
    },
  })

  const { mutate: compPlanDelete } = api.plans.delete.useMutation({
    onSuccess: (e) => {
      console.log('success', e)
      void ctx.plans.get.invalidate({ userId: userId })
    },
  })

  const { data: rpeData } = api.rpe.getAll.useQuery(userId)

  const { mutate: rpeUpdate } = api.rpe.create.useMutation({
    onSuccess: () => {
      toast.success('Saved')
      void ctx.rpe.getAll.invalidate(userId)
      setIsRpeModalOpen(false)
    },
  })

  const onClearSecondaryTemplate = (userId: string) => {
    console.log('userId', userId)
    setIsOpen(true)
    userProgramRemoveSecondaryMutate({ userId: userId })
  }

  const onSetSecondaryTemplate = (
    templateId: string,
    userId: string,
    name: string,
  ) => {
    if (!templateId) return
    setIsOpen(true)
    userProgramCreateSecondaryMutate({
      userId: userId,
      templateId: templateId,
      programId: '',
      isProgramActive: true,
      name: name,
    })
  }

  const programLink = (
    (allUsers?.find(i => i.id === userId)?.firstName || '')
      + allUsers?.find(i => i.id === userId)?.lastName?.slice(0, 1) || '' ).toLowerCase()

  const [planName, setPlanName] = useState<string>('Powerlifting')

  if (!user?.isAdmin) return <div>Not Authorized</div>

  return (
    <>
      <LoadingWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <main className=' relative flex h-full min-w-[1500px] flex-col items-center justify-center gap-8 px-2 py-3 sm:px-6 md:mt-6 '>
        <UserSelect onSelectUser={setUserId} />
        <Tab.Group
          vertical
          defaultIndex={0}
        >
          <div className='flex w-full gap-4 lg:gap-16'>
            <Tab.List className='flex w-28 flex-col divide-y divide-yellow-500'>
              <TabWrapper title='Overview' />
              <TabWrapper title='Program' />
              <TabWrapper title='Program-N' />
              <TabWrapper title='History' />
              <TabWrapper title='One RM' />
              <TabWrapper title='RPE Chart' />
              <TabWrapper title='Competitions' />
              <TabWrapper title='Comp Plan' />
              <TabWrapper title='Open Powerlifting' />
              <TabWrapper title='Settings' />
            </Tab.List>
            <Tab.Panels className='w-full '>
              <Tab.Panel>
                <div className='flex flex-col gap-4'>
                  <h2 className='text-2xl font-medium'>Overview</h2>
                  <div className='flex gap-8 items-center'>
                    <div className='border rounded-lg border-gray-400 text-lg px-6 py-3 underline underline-offset-4 text-yellow-500'>
                      https://cepower.fit/p/{programLink}
                    </div>
                    <CopyIcon
                      className='h-6 w-6 cursor-pointer hover:text-yellow-400'
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://cepower.fit/p/${programLink}`,
                        )
                        toast.success('Copied')
                      }}
                    />
                  </div>
                  <div className='w-64'>
                    <CountDown userId={userId} />
                  </div>
                  {activeProgram ? (
                    <div className='flex gap-4'>
                      <div className='w-48'>Current Program:</div>
                      <div>{activeProgram.name}</div>
                    </div>
                  ) : null}
                  {secondaryProgram ? (
                    <div className='flex gap-4'>
                      <div className='w-48'>Next Program:</div>
                      <div>{secondaryProgram.name}</div>
                    </div>
                  ) : null}
                  <TrainerSelect userId={userId} />
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <TemplateSelect
                  onSetTemplate={onSetTemplate}
                  onClearTemplate={onClearTemplate}
                  userId={userId}
                  isCurrent={true}
                />
                <TemplateSelect
                  onSetTemplate={onSetSecondaryTemplate}
                  onClearTemplate={onClearSecondaryTemplate}
                  userId={userId}
                  isCurrent={false}
                />
                <ProgramView
                  userId={userId}
                  isAdmin={true}
                  programId={activeProgram?.id || ''}
                />
                <h2 className='my-6 text-3xl font-semibold'>Next Program2</h2>
                <ProgramView
                  userId={userId}
                  isAdmin={true}
                  programId={secondaryProgram?.id || ''}
                />
              </Tab.Panel>

              <Tab.Panel>
              </Tab.Panel>

              <Tab.Panel>
                History
                <ProgramHistory userId={userId} />
              </Tab.Panel>

              <Tab.Panel>
                <OneRMCard userId={userId} />
              </Tab.Panel>

              <Tab.Panel>
                RPE Chart
                <div className='flex gap-2 py-2'>
                  {[
                    '',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                  ].map((num) => (
                    <div
                      key={num}
                      className='flex w-24 justify-center text-3xl font-bold text-yellow-500'
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className='flex flex-col gap-2 text-xl'>
                  {rpeChart.map((rpe, idx) => (
                    <div
                      key={idx}
                      className='flex w-full items-center justify-between'
                    >
                      <div className='flex w-24 justify-center text-3xl font-bold text-yellow-500'>
                        {rpe?.[0]}
                      </div>
                      <div className='flex w-full gap-2'>
                        {rpe.map((percent, i) => (
                          <div key={percent}>
                            {i === 0 ? null : (
                              <div
                                onClick={() => {
                                  setRpeModalKey(`${idx}-${i}`)
                                  setRpeModalValue(
                                    rpeData &&
                                      rpeData.find(
                                        (r) => r.name === `${idx}-${i}`,
                                      )
                                      ? Number(
                                          rpeData?.find(
                                            (r) => r.name === `${idx}-${i}`,
                                          )?.value,
                                        ).toFixed(1)
                                      : percent.toFixed(1),
                                  )
                                  setIsRpeModalOpen(true)
                                }}
                                className='relative flex w-24 cursor-pointer flex-col items-center rounded-xl border border-gray-600 py-4 hover:bg-gray-900'
                              >
                                <div>
                                  {rpeData &&
                                  rpeData.find(
                                    (r) => r.name === `${idx}-${i}`,
                                  ) ? (
                                    <div className=''>
                                      {Number(
                                        rpeData?.find(
                                          (r) => r.name === `${idx}-${i}`,
                                        )?.value,
                                      ).toFixed(1)}
                                      %
                                      <span className='absolute right-1 top-1 text-3xl text-yellow-500'>
                                        *
                                      </span>
                                    </div>
                                  ) : (
                                    <div>{percent.toFixed(1)}%</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <ModalWrapper
                  isOpen={isRpeModalOpen}
                  setIsOpen={setIsRpeModalOpen}
                >
                  <Input
                    placeholder='...'
                    className='bg-gray-900 text-2xl'
                    value={rpeModalValue}
                    onChange={(e) => {
                      setRpeModalValue(e.target.value)
                    }}
                  />
                  <div className='mt-4 flex justify-center gap-2'>
                    <Button
                      className='h-fit w-28 bg-yellow-400 text-lg font-bold text-gray-900'
                      onClick={() => {
                        console.log('rpeModalKey', rpeModalKey)
                        console.log('rpeModalValue', rpeModalValue)
                        rpeUpdate({
                          userId: userId,
                          name: rpeModalKey,
                          value: Number(rpeModalValue),
                        })
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      className='h-fit w-28 bg-yellow-400 text-lg font-bold text-gray-900'
                      onClick={() => {
                        setIsRpeModalOpen(false)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </ModalWrapper>
              </Tab.Panel>

              <Tab.Panel>
                <CompDate userId={userId} />
              </Tab.Panel>

              <Tab.Panel>
                <div className='flex flex-col gap-4'>
                  <Input
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    placeholder='Plan Name'
                    className='w-64'
                  />
                  <Button
                    className='w-48 text-lg'
                    onClick={() => {
                      compPlanMutate({
                        userId: userId,
                        name: planName,
                        date: new Date().toISOString(),
                        squat: Number(userInfo?.squatOneRepMax) || 0,
                        bench: Number(userInfo?.benchOneRepMax) || 0,
                        deadlift: Number(userInfo?.deadliftOneRepMax) || 0,
                      })
                    }}
                  >
                    Generate Plan
                  </Button>
                  <Button
                    className='w-48 text-lg'
                    onClick={() => {
                      compPlanDelete({ userId: userId })
                    }}
                  >
                    Delete Plan
                  </Button>

                  <CompPlan
                    userId={userId}
                    isAdmin={true}
                  />
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <OpenPowerlifting userId={userId} />
              </Tab.Panel>

              <Tab.Panel>
                <Settings userId={userId} />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </main>
      <UserProgramCheck />
    </>
  )
}

export default Users

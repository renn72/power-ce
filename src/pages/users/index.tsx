import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'

import { Disclosure, Transition, Tab } from '@headlessui/react'

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
import { RefreshCcwIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CompAttempts from '~/components/compAttempts'
import Decimal from 'decimal.js'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
  const { data: addressData, isLoading: addressDataLoading } =
    api.compLift.getAddress.useQuery({
      userId: userId,
    })

  const { mutate: setOpenPowerliftingData } =
    api.compLift.setOpenPower.useMutation({
      onSuccess: (data) => {
        console.log(data)
        void ctx.compLift.getCompLifts.invalidate()
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
        <div className='text-xl font-semibold capitalize text-yellow-500'>
          Competitions
        </div>
        <RefreshCcwIcon
          className='h-6 w-6 cursor-pointer p-1 text-yellow-400 hover:animate-spin hover:text-yellow-500 '
          onClick={() => {
            setIsOpen(true)
            setOpenPowerliftingData({ userId: userId })
          }}
        />
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
        'py-4 hover:bg-gray-900',
        selected ? 'font-semibold text-white' : 'font-medium text-gray-500',
      )
    }
  >
    {title}
  </Tab>
)

const Users = () => {
  const { data: session } = useSession()
  const user = session?.user
  const [userId, setUserId] = useState<string>(() => user?.id || '')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const ctx = api.useContext()

  api.users.getAllUsers.useQuery()

  const { data: blocksData } = api.blocks.getAllBlockTitles.useQuery()

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

  const { data: activeProgram } = api.blocks.getUserActiveProgram.useQuery({
    userId: userId,
  })

  const { data: secondaryProgram } =
    api.blocks.getUserSecondaryProgram.useQuery({
      userId: userId,
    })

  const onSelectTemplate = (template: string, userId: string) => {
    console.log('template', template)
    console.log('userId', userId)
  }

  const onClearTemplate = (userId: string) => {
    console.log('userId', userId)
    setIsOpen(true)
    userProgramRemoveMutate({ userId: userId })
  }

  const onSetTemplate = (template: string, userId: string) => {
    const templateId = blocksData?.find((block) => block.name === template)?.id
    if (!templateId) return
    setIsOpen(true)
    userProgramCreateMutate({
      userId: userId,
      templateId: templateId,
      programId: '',
      isProgramActive: true,
    })
  }

  const { data: userInfo } = api.settings.get.useQuery({
    userId: userId,
  })

  const [sp11, setSp11] = useState<number>(Number(userInfo?.sp1_1) || 0)
  const [sp12, setSp12] = useState<number>(Number(userInfo?.sp1_2) || 0)
  const [sp13, setSp13] = useState<number>(Number(userInfo?.sp1_3) || 0)
  const [sp21, setSp21] = useState<number>(Number(userInfo?.sp2_1) || 0)
  const [sp22, setSp22] = useState<number>(Number(userInfo?.sp2_2) || 0)
  const [sp23, setSp23] = useState<number>(Number(userInfo?.sp2_3) || 0)
  const [sp31, setSp31] = useState<number>(Number(userInfo?.sp3_1) || 0)
  const [sp32, setSp32] = useState<number>(Number(userInfo?.sp3_2) || 0)
  const [sp33, setSp33] = useState<number>(Number(userInfo?.sp3_3) || 0)

  const [bp11, setBp11] = useState<number>(Number(userInfo?.bp1_1) || 0)
  const [bp12, setBp12] = useState<number>(Number(userInfo?.bp1_2) || 0)
  const [bp13, setBp13] = useState<number>(Number(userInfo?.bp1_3) || 0)
  const [bp21, setBp21] = useState<number>(Number(userInfo?.bp2_1) || 0)
  const [bp22, setBp22] = useState<number>(Number(userInfo?.bp2_2) || 0)
  const [bp23, setBp23] = useState<number>(Number(userInfo?.bp2_3) || 0)
  const [bp31, setBp31] = useState<number>(Number(userInfo?.bp3_1) || 0)
  const [bp32, setBp32] = useState<number>(Number(userInfo?.bp3_2) || 0)
  const [bp33, setBp33] = useState<number>(Number(userInfo?.bp3_3) || 0)

  const [dp11, setDp11] = useState<number>(Number(userInfo?.dp1_1) || 0)
  const [dp12, setDp12] = useState<number>(Number(userInfo?.dp1_2) || 0)
  const [dp13, setDp13] = useState<number>(Number(userInfo?.dp1_3) || 0)
  const [dp21, setDp21] = useState<number>(Number(userInfo?.dp2_1) || 0)
  const [dp22, setDp22] = useState<number>(Number(userInfo?.dp2_2) || 0)
  const [dp23, setDp23] = useState<number>(Number(userInfo?.dp2_3) || 0)
  const [dp31, setDp31] = useState<number>(Number(userInfo?.dp3_1) || 0)
  const [dp32, setDp32] = useState<number>(Number(userInfo?.dp3_2) || 0)
  const [dp33, setDp33] = useState<number>(Number(userInfo?.dp3_3) || 0)

  useEffect(() => {
    setSp11(Number(userInfo?.sp1_1) || 0)
    setSp12(Number(userInfo?.sp1_2) || 0)
    setSp13(Number(userInfo?.sp1_3) || 0)
    setSp21(Number(userInfo?.sp2_1) || 0)
    setSp22(Number(userInfo?.sp2_2) || 0)
    setSp23(Number(userInfo?.sp2_3) || 0)
    setSp31(Number(userInfo?.sp3_1) || 0)
    setSp32(Number(userInfo?.sp3_2) || 0)
    setSp33(Number(userInfo?.sp3_3) || 0)

    setBp11(Number(userInfo?.bp1_1) || 0)
    setBp12(Number(userInfo?.bp1_2) || 0)
    setBp13(Number(userInfo?.bp1_3) || 0)
    setBp21(Number(userInfo?.bp2_1) || 0)
    setBp22(Number(userInfo?.bp2_2) || 0)
    setBp23(Number(userInfo?.bp2_3) || 0)
    setBp31(Number(userInfo?.bp3_1) || 0)
    setBp32(Number(userInfo?.bp3_2) || 0)
    setBp33(Number(userInfo?.bp3_3) || 0)

    setDp11(Number(userInfo?.dp1_1) || 0)
    setDp12(Number(userInfo?.dp1_2) || 0)
    setDp13(Number(userInfo?.dp1_3) || 0)
    setDp21(Number(userInfo?.dp2_1) || 0)
    setDp22(Number(userInfo?.dp2_2) || 0)
    setDp23(Number(userInfo?.dp2_3) || 0)
    setDp31(Number(userInfo?.dp3_1) || 0)
    setDp32(Number(userInfo?.dp3_2) || 0)
    setDp33(Number(userInfo?.dp3_3) || 0)
  }, [userInfo])

  const { mutate: updateCompLifts } = api.settings.updateCompLift.useMutation({
    onSuccess: () => {
      toast.success('Saved')
      void ctx.settings.get.invalidate()
    },
  })

  const onSelectSecondaryTemplate = (template: string, userId: string) => {
    console.log('template', template)
    console.log('userId', userId)
  }

  const onClearSecondaryTemplate = (userId: string) => {
    console.log('userId', userId)
    setIsOpen(true)
    userProgramRemoveSecondaryMutate({ userId: userId })
  }

  const onSetSecondaryTemplate = (template: string, userId: string) => {
    const templateId = blocksData?.find((block) => block.name === template)?.id
    if (!templateId) return
    setIsOpen(true)
    userProgramCreateSecondaryMutate({
      userId: userId,
      templateId: templateId,
      programId: '',
      isProgramActive: true,
    })
  }

  if (!user?.isAdmin) return <div>Not Authorized</div>

  return (
    <>
      <LoadingWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <main className='flex h-full min-w-[1500px] flex-col items-center justify-center gap-8 px-2 py-3 sm:px-6 md:mt-6 '>
        <UserSelect onSelectUser={setUserId} />
        <Tab.Group
          vertical
          defaultIndex={0}
        >
          <div className='flex w-full gap-4 lg:gap-16'>
            <Tab.List className='flex w-36 flex-col divide-y divide-gray-600'>
              <TabWrapper title='Overview' />
              <TabWrapper title='Program' />
              <TabWrapper title='History' />
              <TabWrapper title='One RM' />
              <TabWrapper title='Competitions' />
              <TabWrapper title='Lifts Calc' />
              <TabWrapper title='Open Powerlifting' />
              <TabWrapper title='Settings' />
            </Tab.List>
            <Tab.Panels className='w-full '>
              <Tab.Panel>
                <div className='flex flex-col gap-4'>
                  <h2 className='text-2xl font-medium'>Overview</h2>
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
                  onSelectTemplate={onSelectTemplate}
                  onSetTemplate={onSetTemplate}
                  onClearTemplate={onClearTemplate}
                  userId={userId}
                  isCurrent={true}
                />
                <TemplateSelect
                  onSelectTemplate={onSelectSecondaryTemplate}
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
              </Tab.Panel>

              <Tab.Panel>
                History
                <ProgramHistory userId={userId} />
              </Tab.Panel>

              <Tab.Panel>
                <OneRMCard userId={userId} />
              </Tab.Panel>

              <Tab.Panel>
                <CompDate userId={userId} />
              </Tab.Panel>

              <Tab.Panel>
                <div className='flex gap-12'>
                  <div className='flex  flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Squat 1 Light</div>
                      <Input
                        className='w-24'
                        value={sp11.toFixed(2)}
                        onChange={(e) => {
                          setSp11(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'sp1_1',
                            value: sp11,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Squat 1 Target</div>
                      <Input
                        className='w-24'
                        value={sp12.toFixed(2)}
                        onChange={(e) => {
                          setSp12(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'sp1_2',
                            value: sp12,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Squat 1 Heavy</div>
                      <Input
                        className='w-24'
                        value={sp13.toFixed(2)}
                        onChange={(e) => {
                          setSp13(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'sp1_3',
                            value: sp13,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Squat 2 Light</div>
                      <Input
                        className='w-24'
                        value={sp21.toFixed(2)}
                        onChange={(e) => {
                          setSp21(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'sp2_1',
                            value: sp21,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Squat 2 Target</div>
                      <Input
                        className='w-24'
                        value={sp22.toFixed(2)}
                        onChange={(e) => {
                          setSp22(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'sp2_2',
                            value: sp22,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Squat 2 Heavy</div>
                      <Input
                        className='w-24'
                        value={sp23.toFixed(2)}
                        onChange={(e) => {
                          setSp23(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'sp2_3',
                            value: sp23,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Squat 3 Light</div>
                      <Input
                        className='w-24'
                        value={sp31.toFixed(2)}
                        onChange={(e) => {
                          setSp31(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'sp3_1',
                            value: sp31,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Squat 3 Target</div>
                      <Input
                        className='w-24'
                        value={sp32.toFixed(2)}
                        onChange={(e) => {
                          setSp32(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'sp3_2',
                            value: sp32,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Squat 3 Heavy</div>
                      <Input
                        className='w-24'
                        value={sp33.toFixed(2)}
                        onChange={(e) => {
                          setSp33(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'sp3_3',
                            value: sp33,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className='flex  flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Bench 1 Light</div>
                      <Input
                        className='w-24'
                        value={bp11.toFixed(2)}
                        onChange={(e) => {
                          setBp11(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'bp1_1',
                            value: bp11,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Bench 1 Target</div>
                      <Input
                        className='w-24'
                        value={bp12.toFixed(2)}
                        onChange={(e) => {
                          setBp12(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'bp1_2',
                            value: bp12,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Bench 1 Heavy</div>
                      <Input
                        className='w-24'
                        value={bp13.toFixed(2)}
                        onChange={(e) => {
                          setBp13(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'bp1_3',
                            value: bp13,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Bench 2 Light</div>
                      <Input
                        className='w-24'
                        value={bp21.toFixed(2)}
                        onChange={(e) => {
                          setBp21(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'bp2_1',
                            value: bp21,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Bench 2 Target</div>
                      <Input
                        className='w-24'
                        value={bp22.toFixed(2)}
                        onChange={(e) => {
                          setBp22(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'bp2_2',
                            value: bp22,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Bench 2 Heavy</div>
                      <Input
                        className='w-24'
                        value={bp23.toFixed(2)}
                        onChange={(e) => {
                          setBp23(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'bp2_3',
                            value: bp23,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Bench 3 Light</div>
                      <Input
                        className='w-24'
                        value={bp31.toFixed(2)}
                        onChange={(e) => {
                          setBp31(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'bp3_1',
                            value: bp31,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Bench 3 Target</div>
                      <Input
                        className='w-24'
                        value={bp32.toFixed(2)}
                        onChange={(e) => {
                          setBp32(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'bp3_2',
                            value: bp32,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Bench 3 Heavy</div>
                      <Input
                        className='w-24'
                        value={bp33.toFixed(2)}
                        onChange={(e) => {
                          setBp33(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'bp3_3',
                            value: bp33,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className='flex  flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Deadlift 1 Light</div>
                      <Input
                        className='w-24'
                        value={dp11.toFixed(2)}
                        onChange={(e) => {
                          setDp11(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            field: 'dp1_1',
                            value: dp11,
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Deadlift 1 Target</div>
                      <Input
                        className='w-24'
                        value={dp12.toFixed(2)}
                        onChange={(e) => {
                          setDp12(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            value: dp12,
                            field: 'dp1_2',
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Deadlift 1 Heavy</div>
                      <Input
                        className='w-24'
                        value={dp13.toFixed(2)}
                        onChange={(e) => {
                          setDp13(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            value: dp13,
                            field: 'dp1_3',
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Deadlift 2 Light</div>
                      <Input
                        className='w-24'
                        value={dp21.toFixed(2)}
                        onChange={(e) => {
                          setDp21(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            value: dp21,
                            field: 'dp2_1',
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Deadlift 2 Target</div>
                      <Input
                        className='w-24'
                        value={dp22.toFixed(2)}
                        onChange={(e) => {
                          setDp22(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            value: dp22,
                            field: 'dp2_2',
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Deadlift 2 Heavy</div>
                      <Input
                        className='w-24'
                        value={dp23.toFixed(2)}
                        onChange={(e) => {
                          setDp23(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            value: dp23,
                            field: 'dp2_3',
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Deadlift 3 Light</div>
                      <Input
                        className='w-24'
                        value={dp31.toFixed(2)}
                        onChange={(e) => {
                          setDp31(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            value: dp31,
                            field: 'dp3_1',
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Deadlift 3 Target</div>
                      <Input
                        className='w-24'
                        value={dp32.toFixed(2)}
                        onChange={(e) => {
                          setDp32(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            value: dp32,
                            field: 'dp3_2',
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-40 text-lg'>Deadlift 3 Heavy</div>
                      <Input
                        className='w-24'
                        value={dp33.toFixed(2)}
                        onChange={(e) => {
                          setDp33(Number(e.target.value))
                        }}
                      />
                      <Button
                        className=''
                        onClick={() =>
                          updateCompLifts({
                            userId: userId,
                            value: dp33,
                            field: 'dp3_3',
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
                <CompAttempts userId={userId} />
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
    </>
  )
}

export default Users

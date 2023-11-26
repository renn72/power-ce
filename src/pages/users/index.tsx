import React, { useState } from 'react'
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

  const { mutate: setOpenPowerliftingData } =
    api.compLift.setOpenPower.useMutation({
      onSuccess: (data) => {
        console.log(data)
        void ctx.compLift.getCompLifts.invalidate({ userId: userId })
        setIsOpen(false)
      },
    })

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

  const { data: blocksData, } =
    api.blocks.getAllBlockTitles.useQuery()

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

  if(!user.isAdmin) return <div>Not Authorized</div>

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
                      <div className='w-48' >Current Program:</div>
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

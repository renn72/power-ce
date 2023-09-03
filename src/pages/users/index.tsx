import React, { useState, } from 'react'
import { type NextPage, } from 'next'
import { useUser, } from '@clerk/nextjs'
import { toast, } from 'react-hot-toast'
import { api, } from '~/utils/api'

import {
  Disclosure, Transition,
} from '@headlessui/react'

import { ChevronUpIcon, } from '@heroicons/react/20/solid'
import TemplateSelect from './templateSelect'
import { LoadingPage, } from '~/components/loading'
import OneRMCard from '~/components/oneRMCard'
import { Button, } from '@/components/ui/button'

import ProgramView from './programView'
import CompDate from '~/components/compDate'
import UserSelect from './userSelect'

const UserDisclosure = ({
  userId, isOneRM,
}: { userId: string, isOneRM: boolean }) => (
  <Disclosure defaultOpen={false} >
    {({ open, }) => (
      <div className='flex flex-col md:gap-8'>
        <div className='flex flex-col sm:flex-row md:gap-6'>
          <Disclosure.Button className={`${open ? 'border-b border-yellow-500' : 'hover:border-white border-b border-black'} flex items-center gap-2 px-2 py-2 text-lg font-medium `}>
            <span>{isOneRM ? 'One Rep Maxes' : 'Program'}</span>
            <ChevronUpIcon
              className={`${open ? 'rotate-180 transform' : ''
                } h-8 w-8 text-gray-400`}
            />
          </Disclosure.Button>
          <div className='flex gap-2'>
          </div>
        </div>

        <Transition
          className='transition-all duration-300 ease-out'
          enterFrom='transform scale-70 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-70 opacity-0'
        >
          <Disclosure.Panel className=''>
            {
              isOneRM
                ? (
                  <OneRMCard userId={userId} />
                )
                : (
                  <ProgramView userId={userId} />
                )
            }
          </Disclosure.Panel>
        </Transition>
      </div>
    )}
  </Disclosure>
)
const UserPage = (
  {
    onSelectTemplate,
    onSetTemplate,
    onClearTemplate,
    userId,
    userFirstName,
    userLastName,
  }:
    {
      onSelectTemplate: (arg0: string, arg1: string) => void,
      onSetTemplate: (arg0: string, arg1: string) => void,
      onClearTemplate: (arg0: string,) => void,
      userId: string,
      userFirstName: string | null,
      userLastName: string | null
    }
) => {
  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId, })

  return (
    <div
      className='flex flex-col w-full gap-2 justify-start'
    >
      <TemplateSelect
        onSelectTemplate={onSelectTemplate}
        onSetTemplate={onSetTemplate}
        onClearTemplate={onClearTemplate}
        userId={userId}
        userFirstName={userFirstName}
        userLastName={userLastName}
      />
      <CompDate userId={userId} />
      <UserDisclosure userId={userId} isOneRM={true} />
      <UserDisclosure userId={userId} isOneRM={false} />
    </div>
  )
}

const Users: NextPage = () => {
  // Check for admin role
  const { user, } = useUser()
  const [
    userId,
    setUserId,
  ] = useState<string>(() => user?.id || '')
  if (!user) return <div>Login</div>

  const ctx = api.useContext()

  const { isLoading: userProgramsLoading, } = api.userPrograms.getAll.useQuery()

  const {
    data: allUsers, isLoading: usersLoading,
  } = api.users.getAllUsers.useQuery()
  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()
  const { data: programsData, } = api.blocks.getAllPrograms.useQuery()
  const { mutate: userProgramCreateMutate, } = api.userPrograms.create.useMutation({
    onSuccess: () => {
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllPrograms.invalidate()
      void ctx.userPrograms.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })
  const { mutate: userProgramRemoveMutate, } = api.userPrograms.remove.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success('Removed')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllPrograms.invalidate()
      void ctx.userPrograms.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const {
    data: primaryLifts, isLoading: primaryLiftsLoading,
  } = api.primaryLifts.getAll.useQuery()

  const { mutate: createUserCoreOneRM, } = api.oneRepMax.create.useMutation({
    onSettled: async () => {
      await ctx.oneRepMax.getUserCoreLifts.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const onSelectTemplate = (template: string, userId: string) => {
    console.log('template', template)
    console.log('userId', userId)
  }

  const onClearTemplate = (userId: string) => {
    console.log('userId', userId)
    userProgramRemoveMutate({ userId: userId, })
  }

  const onSetTemplate = (template: string, userId: string) => {
    const templateId = blocksData?.find((block) => block.name === template)?.id
    if (!templateId) return

    userProgramCreateMutate({
      userId: userId,
      templateId: templateId,
      programId: '',
      isProgramActive: true,
    })
  }

  const onUpdateOneRM = (userId: string, lift: string, weight: number) => {
    createUserCoreOneRM({
      userId: userId, lift: lift.toLowerCase(), weight: +weight,
    })
  }

  const onGenerate = () => {
    console.log('gen')
    allUsers?.forEach((user) => {
      primaryLifts?.forEach((lift) => {
        const weight = (Math.floor(Math.random() * 15) + 5) * 10
        onUpdateOneRM(user.id, lift.name, weight)
      })
    })
  }

  const getFirstName = () => {
    const res = allUsers?.find((u) => u.id == userId)?.firstName
    return res ? res : ''
  }
  const getLastName = () => {
    const res = allUsers?.find((u) => u.id == userId)?.lastName
    return res ? res : ''
  }

  if (usersLoading || userProgramsLoading || blocksLoading) return <div><LoadingPage /></div>

  return (
    <>
      <div className='h-full flex flex-col items-center'>
        <main >
          <div className=' max-w-[2000px] min-w-[95vw] 2xl:min-w-[80vw] md:mt-6 py-6 sm:px-2 flex flex-col gap-8 justify-center items-center'>
            <UserSelect onSelectUser={setUserId} />
            <UserPage
              key={userId}
              userId={userId}
              userFirstName={getFirstName()}
              userLastName={getLastName()}
              onSetTemplate={onSetTemplate}
              onClearTemplate={onClearTemplate}
              onSelectTemplate={onSelectTemplate}
            />
          </div>
        </main>
      </div>
    </>
  )
}

export default Users

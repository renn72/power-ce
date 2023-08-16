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

const Users: NextPage = () => {
  // Check for admin role
  const { user, } = useUser()
  if (!user) return <div>Login</div>
  if (user.organizationMemberships[0]?.role !== 'admin') return <div>Not auth</div>

  const ctx = api.useContext()

  const { isLoading: userProgramsLoading, } = api.userPrograms.getAll.useQuery()
  const {
    data: allUsers, isLoading: usersLoading,
  } = api.users.getAll.useQuery()
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
    allUsers?.admins?.forEach((user) => {
      primaryLifts?.forEach((lift) => {
        const weight = (Math.floor(Math.random() * 15) + 5) * 10
        onUpdateOneRM(user.id, lift.name, weight)
      })
    })
    allUsers?.users?.forEach((user) => {
      primaryLifts?.forEach((lift) => {
        const weight = (Math.floor(Math.random() * 15) + 5) * 10
        onUpdateOneRM(user.id, lift.name, weight)
      })
    })

  }

  if (usersLoading || userProgramsLoading || blocksLoading) return <div><LoadingPage /></div>

  return (
    <>
      <div className='h-full flex flex-col'>
        <main >
          <div className='mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 flex flex-col gap-8'>
            <div className='flex flex-col gap-4  m-2 p-4'>
              <div className='text-xl font-bold'>Trainers</div>
              <div className='flex flex-col gap-8'>
                {allUsers?.admins?.map((user) => (
                  <div
                    key={user.id}
                    className='flex flex-col gap-2'
                  >
                    <TemplateSelect
                      onSelectTemplate={onSelectTemplate}
                      onSetTemplate={onSetTemplate}
                      onClearTemplate={onClearTemplate}
                      userId={user.id}
                      userFirstName={user.firstName}
                      userLastName={user.lastName}
                    />
                    <Disclosure defaultOpen={false} >
                      {({ open, }) => (
                        <div className='flex flex-col gap-8 border border-gray-600 min-w-full p-2 rounded-xl'>
                          <div className='flex flex-col sm:flex-row justify-between items-center gap-6'>
                            <Disclosure.Button className='flex justify-between items-center gap-2 rounded-lg px-8 py-2 text-left text-base sm:text-lg hover:bg-yellow-400 hover:text-black'>
                              <span>One Rep Maxes</span>
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
                            <Disclosure.Panel>
                              <OneRMCard userId={user.id} />
                            </Disclosure.Panel>
                          </Transition>
                        </div>
                      )}
                    </Disclosure>
                    <Disclosure defaultOpen={false} >
                      {({ open, }) => (
                        <div className='flex flex-col gap-8 border border-gray-600 min-w-full p-2 rounded-xl'>
                          <div className='flex flex-col sm:flex-row justify-between items-center gap-6'>
                            <Disclosure.Button className='flex justify-between items-center gap-2 rounded-lg px-8 py-2 text-left text-base sm:text-lg hover:bg-yellow-400 hover:text-black'>
                              <span>Program</span>
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
                            <Disclosure.Panel>
                              <ProgramView userId={user.id} />
                            </Disclosure.Panel>
                          </Transition>
                        </div>
                      )}
                    </Disclosure>

                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-4 m-2 mt-8 p-4'>
              <div className='text-xl font-bold text-gray-200'>Users</div>
              <div className='flex flex-col gap-4'>
                {allUsers?.users?.map((user) => (
                  <div
                    key={user.id}
                    className='flex flex-col gap-2'
                  >
                    <TemplateSelect
                      onSelectTemplate={onSelectTemplate}
                      onSetTemplate={onSetTemplate}
                      onClearTemplate={onClearTemplate}
                      userId={user.id}
                      userFirstName={user.firstName}
                      userLastName={user.lastName}
                    />
                    <Disclosure defaultOpen={false} >
                      {({ open, }) => (
                        <div className='flex flex-col gap-8 border border-gray-600 min-w-full p-2 rounded-xl'>
                          <div className='flex flex-col sm:flex-row justify-between items-center gap-6'>
                            <Disclosure.Button className='flex justify-between items-center gap-2 rounded-lg px-8 py-2 text-left text-base sm:text-lg hover:bg-yellow-400 hover:text-black'>
                              <span>One Rep Maxes</span>
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
                            <Disclosure.Panel>
                              <OneRMCard userId={user.id} />
                            </Disclosure.Panel>
                          </Transition>
                        </div>
                      )}
                    </Disclosure>
                    <Disclosure defaultOpen={false} >
                      {({ open, }) => (
                        <div className='flex flex-col gap-8 border border-gray-600 min-w-full p-2 rounded-xl'>
                          <div className='flex flex-col sm:flex-row justify-between items-center gap-6'>
                            <Disclosure.Button className='flex justify-between items-center gap-2 rounded-lg px-8 py-2 text-left text-base sm:text-lg hover:bg-yellow-400 hover:text-black'>
                              <span>Program</span>
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
                            <Disclosure.Panel>
                              <ProgramView userId={user.id} />
                            </Disclosure.Panel>
                          </Transition>
                        </div>
                      )}
                    </Disclosure>

                  </div>
                ))}
              </div>
            </div>
            <Button 
              className='w-24' 
              onClick={onGenerate}>
              Generate
            </Button>
          </div>
        </main>
      </div>
    </>
  )
}

export default Users

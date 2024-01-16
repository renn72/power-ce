import { useState, Fragment } from 'react'

import type { PrismaDay as Day, PrismaBlock as Block } from '~/store/types'

import { toast } from 'react-hot-toast'

import { api } from '~/utils/api'

import { Dialog, Transition } from '@headlessui/react'
import { LoadingPage } from '~/components/loading'

import { PlaySquare } from 'lucide-react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const Warmup = ({ day, program }: { day: Day; program: Block }) => {
  const [warmupDayId, setWarmupDayId] = useState('')
  const [isOpenWarmup, setIsOpenWarmup] = useState(false)
  const ctx = api.useUtils()
  const { data: allWarmups, isLoading: warmupsLoading } =
    api.warmups.getAll.useQuery()
  const { mutate: updateWarmupTemplateId } =
    api.days.updateWarmupTemplateId.useMutation({
      onSuccess: () => {
        toast.success('Warmup updated')
        void ctx.blocks.get.invalidate()
        setIsOpenWarmup(false)
      },
    })

  if (warmupsLoading) return <LoadingPage />

  return (
    <>
      <div
        className='cursor-pointer'
        onClick={(e) => {
          e.stopPropagation()
          setIsOpenWarmup(true)
          setWarmupDayId(day.id)
        }}
      >
        {day.warmupTemplateId === '' || day.warmupTemplateId === null ? (
          <div>
            <h2>Warm Up</h2>
            <div className='text-sm text-gray-600'>none</div>
          </div>
        ) : (
          <div className='flex flex-col gap-2 text-base'>
            <h2>Warm Up</h2>
            <div className='px-4'>
              {
                allWarmups?.find((warmup) => warmup.id === day.warmupTemplateId)
                  ?.name
              }
              <div className='flex flex-col gap-1'>
                {allWarmups &&
                  allWarmups
                    ?.find((warmup) => warmup.id === day.warmupTemplateId)
                    ?.warmups?.map((warmup) => (
                      <div
                        key={warmup.id}
                        className='flex items-center gap-1'
                      >
                        <div
                          className='w-6'
                          onClick={(e) => e.stopPropagation()}
                        >
                          {warmup.link && (
                            <a
                              target='_blank'
                              rel='noreferrer'
                              className=''
                              href={warmup.link}
                            >
                              <PlaySquare className='h-4 w-4 text-yellow-500' />
                            </a>
                          )}
                        </div>
                        <div className='ml-2 text-sm capitalize text-gray-600'>
                          {warmup.name}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Transition
        appear
        show={isOpenWarmup}
        as={Fragment}
      >
        <div>
          <Dialog
            as='div'
            className='relative z-10 text-gray-200'
            onClose={() => setIsOpenWarmup(false)}
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
              <div className='fixed inset-0 bg-black bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
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
                  <Dialog.Panel className='w-80 max-w-xl transform overflow-visible rounded-2xl border border-gray-800 bg-black p-6 text-left align-middle text-lg transition-all'>
                    <div className='flex justify-between'>
                      <div className='mb-8 text-xl font-semibold'>Warm Ups</div>
                      <XMarkIcon
                        className='h-6 w-6 cursor-pointer text-gray-400 hover:text-white'
                        onClick={() => setIsOpenWarmup(false)}
                      />
                    </div>
                    <div className='flex w-fit flex-col gap-2 font-semibold text-gray-400'>
                      {allWarmups?.map((warmup) => (
                        <div
                          key={warmup.id}
                          className={`cursor-pointer rounded-lg border border-gray-700 px-6 py-3 hover:border-gray-400 hover:text-gray-200 ${
                            program?.week.some((w) =>
                              w.day.some(
                                (d) =>
                                  d.warmupTemplateId === warmup.id &&
                                  d.id === warmupDayId,
                              ),
                            )
                              ? 'bg-yellow-500 text-black hover:text-black'
                              : ''
                          }`}
                          onClick={() => {
                            updateWarmupTemplateId({
                              id: warmupDayId,
                              warmupTemplateId: warmup.id,
                            })
                          }}
                        >
                          <h2 className='capitalize'>{warmup.name}</h2>
                        </div>
                      ))}
                      <div
                        className={`cursor-pointer rounded-lg border border-gray-700 px-6 py-3 hover:border-gray-400 hover:text-gray-200`}
                        onClick={() => {
                          updateWarmupTemplateId({
                            id: warmupDayId,
                            warmupTemplateId: '',
                          })
                        }}
                      >
                        <h2 className='capitalize'>Clear</h2>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </div>
      </Transition>
    </>
  )
}

export default Warmup

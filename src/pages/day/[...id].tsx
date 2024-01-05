import { useState, Fragment } from 'react'
import { Prisma } from '@prisma/client'
import { api } from '~/utils/api'

import { useSession } from 'next-auth/react'

import { Transition, RadioGroup, Dialog } from '@headlessui/react'
import { HomeIcon, PlaySquare } from 'lucide-react'

import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'

import ExerciseModal from './exerciseModal'

const dayWithExercise = Prisma.validator<Prisma.DayArgs>()({
  include: {
    exercise: {
      include: {
        set: true,
        ss: true,
      },
    },
  },
})

type Day = Prisma.DayGetPayload<typeof dayWithExercise>

const Day = () => {
  const { data: session } = useSession()
  const userId = session?.user.id || ''

  const ctx = api.useContext()
  const router = useRouter()
  const [programId, dayId] = (router.query.id as string[]) || ['', '']
  const [isOpen, setIsOpen] = useState(false)
  const [exerciseToDelete, setExerciseToDelete] = useState<string>('')
  const utils = api.useContext()

  const { data: program, isLoading: programLoading } = api.blocks.get.useQuery({
    id: programId || '',
  })

  const { data: allWarmups, isLoading: allWarmupsLoading } =
    api.warmups.getAll.useQuery()

  const day = program?.week
    .map((week) => week.day)
    .flat()
    .find((day) => day.id === dayId)

  const warmup = allWarmups?.find((w) => w.id === day?.warmupTemplateId)

  const { mutate: updateDayEnergy } = api.programs.updateDayEnergy.useMutation({
    onSuccess: () => {
      void ctx.blocks.get.invalidate()
    },
    onError: (e) => {
      console.log(e)
    },
  })
  const { mutate: deleteExercise } = api.programs.deleteExercise.useMutation({
    onMutate: async (exerciseToDelete) => {
      if (!programId) return
      console.log('id', exerciseToDelete)
      await utils.blocks.get.cancel({ id: programId })
      const previousProgram = utils.blocks.get.getData({ id: programId })

      if (!previousProgram) return

      utils.blocks.get.setData(
        { id: programId },
        {
          ...previousProgram,
          week: previousProgram?.week.map((week) => {
            return {
              ...week,
              day: week.day.map((day) => {
                return {
                  ...day,
                  exercise: day.exercise.filter(
                    (exercise) => exercise.id !== exerciseToDelete.id,
                  ),
                }
              }),
            }
          }),
        },
      )
      return { previousProgram }
    },
    onSuccess: () => {
      void ctx.blocks.get.invalidate()
    },
    onError: (e) => {
      console.log(e)
    },
  })

  const { mutate: updateDayComplete } = api.programs.completeDay.useMutation({
    onMutate: async (newDay) => {
      console.log('id', newDay)
      if (!programId) return
      await utils.blocks.get.cancel({ id: programId })
      const previousProgram = utils.blocks.get.getData({ id: programId })
      if (!previousProgram) return

      utils.blocks.get.setData(
        { id: programId },
        {
          ...previousProgram,
          week: previousProgram?.week.map((week) => {
            return {
              ...week,
              day: week.day.map((day) => {
                if (day.id === newDay.id) {
                  return {
                    ...day,
                    isComplete: newDay.isComplete,
                  }
                }
                return day
              }),
            }
          }),
        },
      )
      return { previousProgram }
    },
    onError: (err, _newExercise, context) => {
      console.log('err', err)
      if (!programId) return
      utils.blocks.get.setData({ id: programId }, context?.previousProgram)
    },
  })

  const [selectedEngery, setSelectedEngery] = useState(day?.energyRating || 'A')
  const onSetEnergy = (e: string) => {
    setSelectedEngery(e)
    if (!day) return
    updateDayEnergy({
      id: day.id,
      energyRating: e,
    })
  }

  if (programLoading || allWarmupsLoading) return <div>Loading...</div>
  if (!day || !program) return <div>Day not found</div>

  return (
    <>
      <div className='max-w-lg'>
        {day.isRestDay ? (
          <div>Rest Day</div>
        ) : (
          <div className='flex flex-col gap-6 px-1'>
            <h2
              className={`text-xl font-bold ${
                day.isComplete ? 'text-green-500' : ''
              }`}
            ></h2>
            {day?.isComplete ? (
              <div
                onClick={() => {
                  // updateDayComplete({ id: day.id, isComplete: false, programId: programId  })
                }}
                className={`flex items-center justify-center gap-2 text-xl font-bold text-yellow-500`}
              >
                Completed
              </div>
            ) : (
              <div className='mx-12 flex items-center justify-between'>
                <Button
                  onClick={() => {
                    updateDayComplete({
                      id: day.id,
                      isComplete: true,
                      programId: program.id,
                    })
                  }}
                  className='w-32'
                >
                  Complete
                </Button>
                <HomeIcon
                  className='h-6 w-6 text-gray-200'
                  onClick={() => {
                    void router.push(`/`)
                  }}
                />
              </div>
            )}
            <RadioGroup
              value={selectedEngery}
              onChange={onSetEnergy}
              className='w-full'
            >
              <div
                className={`flex w-full items-center justify-around gap-2 text-xl`}
              >
                <RadioGroup.Label className='tracking-tighter'>
                  Energy Level
                </RadioGroup.Label>
                {['A', 'B', 'C', 'D'].map((energy) => (
                  <RadioGroup.Option
                    key={energy}
                    value={energy}
                    className={({ active, checked }) => `${active ? '' : ''}
                              ${
                                checked
                                  ? 'bg-yellow-500 font-extrabold text-black'
                                  : 'bg-gray-900 text-gray-700'
                              }
                                  relative flex h-8 w-8 cursor-pointer rounded-lg shadow-md focus:outline-none`}
                  >
                    {({ checked }) => (
                      <>
                        <div className='flex w-full items-center justify-center'>
                          <div className='flex items-center'>
                            <div className=''>
                              <RadioGroup.Label
                                as='p'
                                className={`${
                                  checked ? 'text-black' : 'text-gray-400'
                                }`}
                              >
                                {energy}
                              </RadioGroup.Label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            {day.warmupTemplateId == '' &&
            day.warmupTemplateId == null ? null : (
              <div className='flex w-full flex-col items-center justify-center px-4 py-1'>
                <h2 className='ml-1 text-xl font-bold capitalize text-yellow-500'>
                  Warmup
                </h2>
                <div className='mx-4 flex w-full flex-col items-center justify-center'>
                  {warmup?.warmups.map((w) => (
                    <div
                      key={w.id}
                      className='relative grid w-full grid-cols-2 justify-items-center'
                    >
                      <div className='text-lg font-medium capitalize tracking-tight'>
                        {w.name}
                      </div>
                      <div className='text-base text-gray-400'>{w?.notes}</div>
                      <div className='absolute -right-4 top-1/2 -translate-y-1/2'>
                        {w.link && (
                          <a
                            href={w.link}
                            rel='noreferrer'
                            target='_blank'
                          >
                            <PlaySquare
                              size={30}
                              fill='#EAB308'
                              color='black'
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className='flex w-full flex-col gap-0 divide-y divide-dashed divide-gray-600 pb-16 md:p-2'>
              {day?.exercise?.map((exercise, idx) => (
                <div
                  key={exercise.id}
                  className=''
                >
                  <ExerciseModal
                    programId={program.id}
                    exercise={exercise}
                    idx={idx}
                    selectedEnergy={selectedEngery}
                    day={day}
                    userId={userId}
                    setIsOpen={setIsOpen}
                    setExerciseToDelete={setExerciseToDelete}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='z-10'
          onClose={() => setIsOpen(false)}
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
            <div className='fixed inset-0 bg-gray-900/70' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-1 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='transform overflow-hidden rounded-md bg-black p-8 text-left align-middle text-gray-200 transition-all md:max-h-[600px] md:p-4'>
                  <Dialog.Title
                    as='h3'
                    className='flex items-center justify-center text-base text-xl font-medium leading-6'
                  >
                    delete?
                  </Dialog.Title>
                  <div className='mt-2 flex justify-between gap-6'>
                    <Button
                      variant='secondary'
                      size='md'
                      onClick={() => {
                        setIsOpen(false)
                        setExerciseToDelete('')
                        deleteExercise({ id: exerciseToDelete })
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      variant='secondary'
                      size='md'
                      onClick={() => {
                        setExerciseToDelete('')
                        setIsOpen(false)
                      }}
                    >
                      No
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Day

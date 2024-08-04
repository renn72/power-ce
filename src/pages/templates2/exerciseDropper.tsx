import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'

import { api } from '~/utils/api'
import { cn } from '@/lib/utils'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import ExerciseView from '~/components/exerciseView'
import { SearchIcon, X } from 'lucide-react'

import { useAtomValue } from 'jotai'
import { isProgramAtom } from './form'

const ExerciseDropper = () => {
  const [isOpen, setIsOpen] = useState('0')
  const { data: session } = useSession()
  const [search, setSearch] = useState('')
  const user = session?.user
  const userId = user?.id || ''
  const ctx = api.useUtils()

  const isProgram = useAtomValue(isProgramAtom)

  const { data: exerciseTemplateaQuery } =
    api.templateBuilder.getAllYourExerciseTemplates.useQuery({
      userId: userId,
    })

  const exerciseTemplates = exerciseTemplateaQuery?.filter((t) => {
    return t?.name?.toLowerCase().includes(search.toLowerCase())
  })

  const { mutate: deleteExerciseTemplate } = api.exercise.delete.useMutation({
    onSuccess: () => {
      void ctx.templateBuilder.getAllYourExerciseTemplates.refetch()
      void ctx.templateBuilder.getAllTemplateTitles.refetch()
    },
  })

  console.log('isOpen', isOpen)
  return (
    <div className=''>
      <Accordion
        type='single'
        orientation='vertical'
        collapsible
        defaultValue={'0'}
        className='mr-1 flex h-full flex-col items-center border-0'
        onValueChange={setIsOpen}
      >
        <AccordionItem
          className='border-0'
          value={`0`}
        >
          <AccordionTrigger
            className={cn('flex flex-col py-0')}
          >
            <div
              className={cn(
                'tracking-tigher flex w-full rounded-lg bg-gray-900 p-1 text-lg font-bold leading-snug',
                isOpen === '0'
                  ? 'h-12 flex-row items-center justify-center gap-4'
                  : 'flex-col',
              )}
            >
              <div>Excercise</div>
              <div>Templates</div>
            </div>
          </AccordionTrigger>
          <AccordionContent
            forceMount={true}
            className='w-min rounded-md bg-gray-900 px-2 py-2'
          >
            <div className='mb-4 flex items-center gap-2'>
              <Input
                placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full bg-gray-900'
              />
              <SearchIcon
                size={24}
                className='cursor-pointer text-gray-400 hover:text-gray-200'
                onClick={() => {
                  setSearch('')
                }}
              />
            </div>
            <ScrollArea className='h-[calc(100vh-200px)] w-full'>
              <Droppable
                droppableId={`templates`}
                renderClone={(provided, snapshot, rubric) => {
                  return (
                    <div
                      className={cn(
                        snapshot.isClone ? 'bg-gray-600' : '',
                        snapshot.isDragging ? 'bg-gray-700' : '',
                        'rounded-md bg-gray-700',
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ExerciseView
                        // @ts-ignore
                        exercise={exerciseTemplates?.[rubric.source.index]}
                        exerciseIdx={0}
                        isAdmin={true}
                      />
                    </div>
                  )
                }}
              >
                {(provided, _snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='flex flex-col gap-2'
                  >
                    {exerciseTemplates?.map((t, i) => (
                      <Draggable
                        key={t.id}
                        draggableId={t.id}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={cn(
                              snapshot.isClone ? 'bg-gray-600' : '',
                              snapshot.isDragging ? 'bg-gray-700' : '',
                              'relative rounded-md bg-gray-700 p-2 hover:bg-gray-700',
                            )}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <X
                              size={20}
                              className='absolute right-2 top-1 cursor-pointer text-gray-400 hover:text-gray-200'
                              onClick={() =>
                                deleteExerciseTemplate({
                                  id: t.id,
                                })
                              }
                            />
                            <ExerciseView
                              exercise={t}
                              exerciseIdx={i}
                              isAdmin={true}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default ExerciseDropper

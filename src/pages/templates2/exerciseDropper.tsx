import React, { useState, } from 'react'
import { useSession } from 'next-auth/react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import { ScrollArea } from '@/components/ui/scroll-area'

import { api } from '~/utils/api'
import { cn } from '@/lib/utils'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import ExerciseView from '~/components/exerciseView'

const ExerciseDropper = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const user = session?.user
  const userId = user?.id || ''
  const { data: exerciseTemplates } = api.templateBuilder.getAllYourExerciseTemplates.useQuery({
    userId: userId,
  })
  return (
    <div className=''>
      <Accordion
        type='single'
        orientation='vertical'
        collapsible
        defaultValue={'0'}
        className='mr-1 flex h-full flex-col items-center border-0'
      >
        <AccordionItem
          className='border-0'
          value={`0`}
        >
          <AccordionTrigger className='flex flex-col pb-0 mt-10'>
            <div className='tracking-tigher flex w-full flex-col rounded-lg bg-gray-900 p-1 text-lg leading-snug font-bold'>
              <div>Excercise</div>
              <div>Templates</div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='w-80 rounded-md bg-gray-900 px-4 py-6'>
            <ScrollArea>
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
                              'rounded-md bg-gray-700 p-2 hover:bg-gray-700 ',
                            )}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
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

import { useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { useFormContext } from 'react-hook-form'

import ExerciseView from '~/components/exerciseView'
import FormExerciseDialog from './formExerciseDialog'

import { type PrismaExercise as Exercise } from '~/store/types'
import { type PrismaBlock } from '~/store/types'

const FormExercise = ({
    exerciseIdx,
    dayIdx,
    weekIdx,
    onRemoveExercise,
}: {
    exercise: Exercise
    exerciseIdx: number
    dayIdx: number
    weekIdx: number
    onRemoveExercise: (args0: number) => void
}) => {
    const formMethods = useFormContext<PrismaBlock>()
    const { watch } = formMethods
    const [isOpen, setIsOpen] = useState(false)
    const exercise = watch(
        `week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}`,
    )
    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger className='w-full'>
                <ExerciseView
                    exercise={exercise}
                    exerciseIdx={exerciseIdx}
                    isAdmin={true}
                />
            </DialogTrigger>
            <DialogContent className='max-w-5xl'>
                <FormExerciseDialog
                    exerciseIdx={exerciseIdx}
                    dayIdx={dayIdx}
                    weekIdx={weekIdx}
                    onRemoveExercise={onRemoveExercise}
                    setIsOpen={setIsOpen}
                />
            </DialogContent>
        </Dialog>
    )
}

export default FormExercise

import { useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { useFormContext } from 'react-hook-form'

import ExerciseView from '~/components/exerciseView'
import FormExerciseDialog from './formExerciseDialog'

import { type PrismaExercise as Exercise } from '~/store/types'
import { type PrismaBlock } from '~/store/types'
import { FilePen, FileMinus2 } from 'lucide-react'

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
            <div className=''>
                <ExerciseView
                    exercise={exercise}
                    exerciseIdx={exerciseIdx}
                    isAdmin={true}
                />
                <div className='flex justify-start gap-4 px-4 py-1'>
                    <DialogTrigger asChild>
                        <FilePen
                            size={24}
                            className='cursor-pointer hover:text-yellow-400'
                        />
                    </DialogTrigger>
                    <FileMinus2
                        size={24}
                        className='cursor-pointer hover:text-red-400'
                        onClick={() => {
                            onRemoveExercise(exerciseIdx)
                        }}
                    />
                </div>
            </div>
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

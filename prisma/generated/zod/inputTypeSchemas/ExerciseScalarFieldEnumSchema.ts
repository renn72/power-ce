import { z } from 'zod';

export const ExerciseScalarFieldEnumSchema = z.enum(['id','createdAt','name','lift','sets','reps','userId','trainerId','isTemplate','repUnit','weightType','onerm','onermTop','weightTop','weightBottom','targetRpe','targetRpeHigh','restTime','restUnit','setWieght','setTopWeight','isEstimatedOnerm','estimatedOnermIndex','tempoDown','tempoPause','tempoUp','actualSets','actualReps','isComplete','rpe','weight','dayId','isSS','notes','htmlLink','flield1','flield2','flield3','flield4','flield5']);

export default ExerciseScalarFieldEnumSchema;

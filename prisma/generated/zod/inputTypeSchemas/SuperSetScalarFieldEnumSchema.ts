import { z } from 'zod';

export const SuperSetScalarFieldEnumSchema = z.enum(['id','createdAt','name','lift','sets','reps','userId','trainerId','isTemplate','repUnit','weightType','onerm','onermTop','weightTop','weightBottom','targetRpe','targetRpeHigh','restTime','restUnit','setWieght','setTopWeight','isEstimatedOnerm','estimatedOnermIndex','actualSets','actualReps','isComplete','rpe','weight','exerciseId','notes','htmlLink','flield1','flield2','flield3','flield4','flield5']);

export default SuperSetScalarFieldEnumSchema;

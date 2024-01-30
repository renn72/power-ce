import { z } from 'zod';

export const SetScalarFieldEnumSchema = z.enum(['id','createdAt','rep','rpe','weight','isComplete','name','lift','userId','trainerId','actualReps','estiamtedOnerm','exerciseId','flield1','flield2','flield3','flield4','flield5']);

export default SetScalarFieldEnumSchema;

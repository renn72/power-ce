import { z } from 'zod';

export const LiftScalarFieldEnumSchema = z.enum(['id','createdAt','createdAtUser','userId','trainerId','liftId','isDeleted','weight','reps','liftName','notes','flield1','flield2','flield3']);

export default LiftScalarFieldEnumSchema;

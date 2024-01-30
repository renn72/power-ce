import { z } from 'zod';

export const GoalScalarFieldEnumSchema = z.enum(['id','createdAt','userId','goal','date','isComplete','isDeleted','flield1','flield2','flield3']);

export default GoalScalarFieldEnumSchema;

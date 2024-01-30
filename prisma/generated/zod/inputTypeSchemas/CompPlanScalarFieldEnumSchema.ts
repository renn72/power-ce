import { z } from 'zod';

export const CompPlanScalarFieldEnumSchema = z.enum(['id','createdAt','userId','name','date','isDeleted']);

export default CompPlanScalarFieldEnumSchema;

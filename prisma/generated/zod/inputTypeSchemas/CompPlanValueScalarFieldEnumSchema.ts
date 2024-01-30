import { z } from 'zod';

export const CompPlanValueScalarFieldEnumSchema = z.enum(['id','createdAt','CompPlanId','name','value','notes','time','isGoodLift','isComplete']);

export default CompPlanValueScalarFieldEnumSchema;

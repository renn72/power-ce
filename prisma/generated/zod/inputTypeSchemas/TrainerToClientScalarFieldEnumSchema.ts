import { z } from 'zod';

export const TrainerToClientScalarFieldEnumSchema = z.enum(['id','createdAt','trainerId','clientId','isDeleted','flield1','flield2','flield3']);

export default TrainerToClientScalarFieldEnumSchema;

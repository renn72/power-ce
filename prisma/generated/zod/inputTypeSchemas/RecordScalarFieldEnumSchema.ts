import { z } from 'zod';

export const RecordScalarFieldEnumSchema = z.enum(['id','createdAt','date','lift','wc','gender','name','weight','userId','isDeleted']);

export default RecordScalarFieldEnumSchema;

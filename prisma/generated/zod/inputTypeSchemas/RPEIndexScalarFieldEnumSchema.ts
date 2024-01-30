import { z } from 'zod';

export const RPEIndexScalarFieldEnumSchema = z.enum(['id','createdAt','userId','name','value','isDeleted']);

export default RPEIndexScalarFieldEnumSchema;

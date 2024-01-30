import { z } from 'zod';

export const LiftsScalarFieldEnumSchema = z.enum(['id','createdAt','userId','name','isDeleted','flield1','flield2','flield3']);

export default LiftsScalarFieldEnumSchema;

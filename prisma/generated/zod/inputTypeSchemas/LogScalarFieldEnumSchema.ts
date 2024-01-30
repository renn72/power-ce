import { z } from 'zod';

export const LogScalarFieldEnumSchema = z.enum(['id','createdAt','userId','action','location','url','response','request','flield1','flield2']);

export default LogScalarFieldEnumSchema;

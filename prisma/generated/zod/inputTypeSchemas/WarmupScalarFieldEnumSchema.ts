import { z } from 'zod';

export const WarmupScalarFieldEnumSchema = z.enum(['id','createdAt','notes','name','link','warmupTemplateId','isDeleted','flield1','flield2','flield3']);

export default WarmupScalarFieldEnumSchema;

import { z } from 'zod';

export const WarmupTemplateScalarFieldEnumSchema = z.enum(['id','createdAt','creatorId','name','isDeleted','flield1','flield2','flield3']);

export default WarmupTemplateScalarFieldEnumSchema;

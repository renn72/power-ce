import { z } from 'zod';

export const BlockScalarFieldEnumSchema = z.enum(['id','createdAt','creatorId','isGlobal','name','isProgram','isDeleted','userId','trainerId','userIdOfProgram','isProgramActive','isComplete','isSecondary','flield1','flield2','flield3','flield4','flield5']);

export default BlockScalarFieldEnumSchema;

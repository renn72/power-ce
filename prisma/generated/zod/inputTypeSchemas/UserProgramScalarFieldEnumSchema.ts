import { z } from 'zod';

export const UserProgramScalarFieldEnumSchema = z.enum(['id','userId','trainerId','templateId','programId','isProgramActive','isDeleted','createdAt']);

export default UserProgramScalarFieldEnumSchema;

import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TrainerToClientWhereInputSchema } from '../inputTypeSchemas/TrainerToClientWhereInputSchema'
import { TrainerToClientOrderByWithRelationInputSchema } from '../inputTypeSchemas/TrainerToClientOrderByWithRelationInputSchema'
import { TrainerToClientWhereUniqueInputSchema } from '../inputTypeSchemas/TrainerToClientWhereUniqueInputSchema'
import { TrainerToClientScalarFieldEnumSchema } from '../inputTypeSchemas/TrainerToClientScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TrainerToClientSelectSchema: z.ZodType<Prisma.TrainerToClientSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  trainerId: z.boolean().optional(),
  clientId: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
}).strict()

export const TrainerToClientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TrainerToClientFindFirstOrThrowArgs> = z.object({
  select: TrainerToClientSelectSchema.optional(),
  where: TrainerToClientWhereInputSchema.optional(),
  orderBy: z.union([ TrainerToClientOrderByWithRelationInputSchema.array(),TrainerToClientOrderByWithRelationInputSchema ]).optional(),
  cursor: TrainerToClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TrainerToClientScalarFieldEnumSchema,TrainerToClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default TrainerToClientFindFirstOrThrowArgsSchema;

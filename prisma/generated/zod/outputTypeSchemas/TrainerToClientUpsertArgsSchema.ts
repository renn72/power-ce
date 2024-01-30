import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TrainerToClientWhereUniqueInputSchema } from '../inputTypeSchemas/TrainerToClientWhereUniqueInputSchema'
import { TrainerToClientCreateInputSchema } from '../inputTypeSchemas/TrainerToClientCreateInputSchema'
import { TrainerToClientUncheckedCreateInputSchema } from '../inputTypeSchemas/TrainerToClientUncheckedCreateInputSchema'
import { TrainerToClientUpdateInputSchema } from '../inputTypeSchemas/TrainerToClientUpdateInputSchema'
import { TrainerToClientUncheckedUpdateInputSchema } from '../inputTypeSchemas/TrainerToClientUncheckedUpdateInputSchema'
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

export const TrainerToClientUpsertArgsSchema: z.ZodType<Prisma.TrainerToClientUpsertArgs> = z.object({
  select: TrainerToClientSelectSchema.optional(),
  where: TrainerToClientWhereUniqueInputSchema,
  create: z.union([ TrainerToClientCreateInputSchema,TrainerToClientUncheckedCreateInputSchema ]),
  update: z.union([ TrainerToClientUpdateInputSchema,TrainerToClientUncheckedUpdateInputSchema ]),
}).strict() ;

export default TrainerToClientUpsertArgsSchema;

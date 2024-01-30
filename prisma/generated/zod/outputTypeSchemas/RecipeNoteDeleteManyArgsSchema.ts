import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeNoteWhereInputSchema } from '../inputTypeSchemas/RecipeNoteWhereInputSchema'

export const RecipeNoteDeleteManyArgsSchema: z.ZodType<Prisma.RecipeNoteDeleteManyArgs> = z.object({
  where: RecipeNoteWhereInputSchema.optional(),
}).strict() ;

export default RecipeNoteDeleteManyArgsSchema;

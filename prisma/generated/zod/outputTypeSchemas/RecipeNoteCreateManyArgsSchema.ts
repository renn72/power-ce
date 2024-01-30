import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeNoteCreateManyInputSchema } from '../inputTypeSchemas/RecipeNoteCreateManyInputSchema'

export const RecipeNoteCreateManyArgsSchema: z.ZodType<Prisma.RecipeNoteCreateManyArgs> = z.object({
  data: z.union([ RecipeNoteCreateManyInputSchema,RecipeNoteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default RecipeNoteCreateManyArgsSchema;

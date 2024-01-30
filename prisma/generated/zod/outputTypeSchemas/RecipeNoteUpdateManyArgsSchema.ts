import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeNoteUpdateManyMutationInputSchema } from '../inputTypeSchemas/RecipeNoteUpdateManyMutationInputSchema'
import { RecipeNoteUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/RecipeNoteUncheckedUpdateManyInputSchema'
import { RecipeNoteWhereInputSchema } from '../inputTypeSchemas/RecipeNoteWhereInputSchema'

export const RecipeNoteUpdateManyArgsSchema: z.ZodType<Prisma.RecipeNoteUpdateManyArgs> = z.object({
  data: z.union([ RecipeNoteUpdateManyMutationInputSchema,RecipeNoteUncheckedUpdateManyInputSchema ]),
  where: RecipeNoteWhereInputSchema.optional(),
}).strict() ;

export default RecipeNoteUpdateManyArgsSchema;

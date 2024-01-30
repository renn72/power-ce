import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateManyInputSchema } from '../inputTypeSchemas/RecipeCreateManyInputSchema'

export const RecipeCreateManyArgsSchema: z.ZodType<Prisma.RecipeCreateManyArgs> = z.object({
  data: z.union([ RecipeCreateManyInputSchema,RecipeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default RecipeCreateManyArgsSchema;

import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientCreateManyInputSchema } from '../inputTypeSchemas/IngredientCreateManyInputSchema'

export const IngredientCreateManyArgsSchema: z.ZodType<Prisma.IngredientCreateManyArgs> = z.object({
  data: z.union([ IngredientCreateManyInputSchema,IngredientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default IngredientCreateManyArgsSchema;

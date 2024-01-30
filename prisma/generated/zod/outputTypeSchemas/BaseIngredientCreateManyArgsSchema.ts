import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BaseIngredientCreateManyInputSchema } from '../inputTypeSchemas/BaseIngredientCreateManyInputSchema'

export const BaseIngredientCreateManyArgsSchema: z.ZodType<Prisma.BaseIngredientCreateManyArgs> = z.object({
  data: z.union([ BaseIngredientCreateManyInputSchema,BaseIngredientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default BaseIngredientCreateManyArgsSchema;

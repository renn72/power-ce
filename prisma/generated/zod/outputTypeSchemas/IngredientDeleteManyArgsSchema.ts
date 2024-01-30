import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientWhereInputSchema } from '../inputTypeSchemas/IngredientWhereInputSchema'

export const IngredientDeleteManyArgsSchema: z.ZodType<Prisma.IngredientDeleteManyArgs> = z.object({
  where: IngredientWhereInputSchema.optional(),
}).strict() ;

export default IngredientDeleteManyArgsSchema;

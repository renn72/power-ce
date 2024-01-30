import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BaseIngredientWhereInputSchema } from '../inputTypeSchemas/BaseIngredientWhereInputSchema'

export const BaseIngredientDeleteManyArgsSchema: z.ZodType<Prisma.BaseIngredientDeleteManyArgs> = z.object({
  where: BaseIngredientWhereInputSchema.optional(),
}).strict() ;

export default BaseIngredientDeleteManyArgsSchema;

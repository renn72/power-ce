import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BaseIngredientUpdateManyMutationInputSchema } from '../inputTypeSchemas/BaseIngredientUpdateManyMutationInputSchema'
import { BaseIngredientUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/BaseIngredientUncheckedUpdateManyInputSchema'
import { BaseIngredientWhereInputSchema } from '../inputTypeSchemas/BaseIngredientWhereInputSchema'

export const BaseIngredientUpdateManyArgsSchema: z.ZodType<Prisma.BaseIngredientUpdateManyArgs> = z.object({
  data: z.union([ BaseIngredientUpdateManyMutationInputSchema,BaseIngredientUncheckedUpdateManyInputSchema ]),
  where: BaseIngredientWhereInputSchema.optional(),
}).strict() ;

export default BaseIngredientUpdateManyArgsSchema;

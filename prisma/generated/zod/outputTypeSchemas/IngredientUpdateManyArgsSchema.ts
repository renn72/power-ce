import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientUpdateManyMutationInputSchema } from '../inputTypeSchemas/IngredientUpdateManyMutationInputSchema'
import { IngredientUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/IngredientUncheckedUpdateManyInputSchema'
import { IngredientWhereInputSchema } from '../inputTypeSchemas/IngredientWhereInputSchema'

export const IngredientUpdateManyArgsSchema: z.ZodType<Prisma.IngredientUpdateManyArgs> = z.object({
  data: z.union([ IngredientUpdateManyMutationInputSchema,IngredientUncheckedUpdateManyInputSchema ]),
  where: IngredientWhereInputSchema.optional(),
}).strict() ;

export default IngredientUpdateManyArgsSchema;

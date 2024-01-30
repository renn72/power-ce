import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BaseIngredientWhereInputSchema } from './BaseIngredientWhereInputSchema';
import { BaseIngredientUpdateWithoutIngredientInputSchema } from './BaseIngredientUpdateWithoutIngredientInputSchema';
import { BaseIngredientUncheckedUpdateWithoutIngredientInputSchema } from './BaseIngredientUncheckedUpdateWithoutIngredientInputSchema';

export const BaseIngredientUpdateToOneWithWhereWithoutIngredientInputSchema: z.ZodType<Prisma.BaseIngredientUpdateToOneWithWhereWithoutIngredientInput> = z.object({
  where: z.lazy(() => BaseIngredientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BaseIngredientUpdateWithoutIngredientInputSchema),z.lazy(() => BaseIngredientUncheckedUpdateWithoutIngredientInputSchema) ]),
}).strict();

export default BaseIngredientUpdateToOneWithWhereWithoutIngredientInputSchema;

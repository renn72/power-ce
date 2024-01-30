import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BaseIngredientUpdateWithoutIngredientInputSchema } from './BaseIngredientUpdateWithoutIngredientInputSchema';
import { BaseIngredientUncheckedUpdateWithoutIngredientInputSchema } from './BaseIngredientUncheckedUpdateWithoutIngredientInputSchema';
import { BaseIngredientCreateWithoutIngredientInputSchema } from './BaseIngredientCreateWithoutIngredientInputSchema';
import { BaseIngredientUncheckedCreateWithoutIngredientInputSchema } from './BaseIngredientUncheckedCreateWithoutIngredientInputSchema';
import { BaseIngredientWhereInputSchema } from './BaseIngredientWhereInputSchema';

export const BaseIngredientUpsertWithoutIngredientInputSchema: z.ZodType<Prisma.BaseIngredientUpsertWithoutIngredientInput> = z.object({
  update: z.union([ z.lazy(() => BaseIngredientUpdateWithoutIngredientInputSchema),z.lazy(() => BaseIngredientUncheckedUpdateWithoutIngredientInputSchema) ]),
  create: z.union([ z.lazy(() => BaseIngredientCreateWithoutIngredientInputSchema),z.lazy(() => BaseIngredientUncheckedCreateWithoutIngredientInputSchema) ]),
  where: z.lazy(() => BaseIngredientWhereInputSchema).optional()
}).strict();

export default BaseIngredientUpsertWithoutIngredientInputSchema;

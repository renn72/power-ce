import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BaseIngredientWhereUniqueInputSchema } from './BaseIngredientWhereUniqueInputSchema';
import { BaseIngredientCreateWithoutIngredientInputSchema } from './BaseIngredientCreateWithoutIngredientInputSchema';
import { BaseIngredientUncheckedCreateWithoutIngredientInputSchema } from './BaseIngredientUncheckedCreateWithoutIngredientInputSchema';

export const BaseIngredientCreateOrConnectWithoutIngredientInputSchema: z.ZodType<Prisma.BaseIngredientCreateOrConnectWithoutIngredientInput> = z.object({
  where: z.lazy(() => BaseIngredientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BaseIngredientCreateWithoutIngredientInputSchema),z.lazy(() => BaseIngredientUncheckedCreateWithoutIngredientInputSchema) ]),
}).strict();

export default BaseIngredientCreateOrConnectWithoutIngredientInputSchema;

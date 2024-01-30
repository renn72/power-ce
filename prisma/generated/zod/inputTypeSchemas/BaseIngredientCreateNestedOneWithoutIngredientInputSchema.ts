import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BaseIngredientCreateWithoutIngredientInputSchema } from './BaseIngredientCreateWithoutIngredientInputSchema';
import { BaseIngredientUncheckedCreateWithoutIngredientInputSchema } from './BaseIngredientUncheckedCreateWithoutIngredientInputSchema';
import { BaseIngredientCreateOrConnectWithoutIngredientInputSchema } from './BaseIngredientCreateOrConnectWithoutIngredientInputSchema';
import { BaseIngredientWhereUniqueInputSchema } from './BaseIngredientWhereUniqueInputSchema';

export const BaseIngredientCreateNestedOneWithoutIngredientInputSchema: z.ZodType<Prisma.BaseIngredientCreateNestedOneWithoutIngredientInput> = z.object({
  create: z.union([ z.lazy(() => BaseIngredientCreateWithoutIngredientInputSchema),z.lazy(() => BaseIngredientUncheckedCreateWithoutIngredientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BaseIngredientCreateOrConnectWithoutIngredientInputSchema).optional(),
  connect: z.lazy(() => BaseIngredientWhereUniqueInputSchema).optional()
}).strict();

export default BaseIngredientCreateNestedOneWithoutIngredientInputSchema;

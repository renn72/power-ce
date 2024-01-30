import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { BaseIngredientCreateWithoutIngredientInputSchema } from './BaseIngredientCreateWithoutIngredientInputSchema';
import { BaseIngredientUncheckedCreateWithoutIngredientInputSchema } from './BaseIngredientUncheckedCreateWithoutIngredientInputSchema';
import { BaseIngredientCreateOrConnectWithoutIngredientInputSchema } from './BaseIngredientCreateOrConnectWithoutIngredientInputSchema';
import { BaseIngredientUpsertWithoutIngredientInputSchema } from './BaseIngredientUpsertWithoutIngredientInputSchema';
import { BaseIngredientWhereUniqueInputSchema } from './BaseIngredientWhereUniqueInputSchema';
import { BaseIngredientUpdateToOneWithWhereWithoutIngredientInputSchema } from './BaseIngredientUpdateToOneWithWhereWithoutIngredientInputSchema';
import { BaseIngredientUpdateWithoutIngredientInputSchema } from './BaseIngredientUpdateWithoutIngredientInputSchema';
import { BaseIngredientUncheckedUpdateWithoutIngredientInputSchema } from './BaseIngredientUncheckedUpdateWithoutIngredientInputSchema';

export const BaseIngredientUpdateOneRequiredWithoutIngredientNestedInputSchema: z.ZodType<Prisma.BaseIngredientUpdateOneRequiredWithoutIngredientNestedInput> = z.object({
  create: z.union([ z.lazy(() => BaseIngredientCreateWithoutIngredientInputSchema),z.lazy(() => BaseIngredientUncheckedCreateWithoutIngredientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BaseIngredientCreateOrConnectWithoutIngredientInputSchema).optional(),
  upsert: z.lazy(() => BaseIngredientUpsertWithoutIngredientInputSchema).optional(),
  connect: z.lazy(() => BaseIngredientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BaseIngredientUpdateToOneWithWhereWithoutIngredientInputSchema),z.lazy(() => BaseIngredientUpdateWithoutIngredientInputSchema),z.lazy(() => BaseIngredientUncheckedUpdateWithoutIngredientInputSchema) ]).optional(),
}).strict();

export default BaseIngredientUpdateOneRequiredWithoutIngredientNestedInputSchema;

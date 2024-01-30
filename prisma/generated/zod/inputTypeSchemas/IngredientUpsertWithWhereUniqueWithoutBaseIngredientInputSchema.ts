import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientWhereUniqueInputSchema } from './IngredientWhereUniqueInputSchema';
import { IngredientUpdateWithoutBaseIngredientInputSchema } from './IngredientUpdateWithoutBaseIngredientInputSchema';
import { IngredientUncheckedUpdateWithoutBaseIngredientInputSchema } from './IngredientUncheckedUpdateWithoutBaseIngredientInputSchema';
import { IngredientCreateWithoutBaseIngredientInputSchema } from './IngredientCreateWithoutBaseIngredientInputSchema';
import { IngredientUncheckedCreateWithoutBaseIngredientInputSchema } from './IngredientUncheckedCreateWithoutBaseIngredientInputSchema';

export const IngredientUpsertWithWhereUniqueWithoutBaseIngredientInputSchema: z.ZodType<Prisma.IngredientUpsertWithWhereUniqueWithoutBaseIngredientInput> = z.object({
  where: z.lazy(() => IngredientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IngredientUpdateWithoutBaseIngredientInputSchema),z.lazy(() => IngredientUncheckedUpdateWithoutBaseIngredientInputSchema) ]),
  create: z.union([ z.lazy(() => IngredientCreateWithoutBaseIngredientInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutBaseIngredientInputSchema) ]),
}).strict();

export default IngredientUpsertWithWhereUniqueWithoutBaseIngredientInputSchema;

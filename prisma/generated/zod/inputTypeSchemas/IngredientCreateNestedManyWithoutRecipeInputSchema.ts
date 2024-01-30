import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientCreateWithoutRecipeInputSchema } from './IngredientCreateWithoutRecipeInputSchema';
import { IngredientUncheckedCreateWithoutRecipeInputSchema } from './IngredientUncheckedCreateWithoutRecipeInputSchema';
import { IngredientCreateOrConnectWithoutRecipeInputSchema } from './IngredientCreateOrConnectWithoutRecipeInputSchema';
import { IngredientCreateManyRecipeInputEnvelopeSchema } from './IngredientCreateManyRecipeInputEnvelopeSchema';
import { IngredientWhereUniqueInputSchema } from './IngredientWhereUniqueInputSchema';

export const IngredientCreateNestedManyWithoutRecipeInputSchema: z.ZodType<Prisma.IngredientCreateNestedManyWithoutRecipeInput> = z.object({
  create: z.union([ z.lazy(() => IngredientCreateWithoutRecipeInputSchema),z.lazy(() => IngredientCreateWithoutRecipeInputSchema).array(),z.lazy(() => IngredientUncheckedCreateWithoutRecipeInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutRecipeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IngredientCreateOrConnectWithoutRecipeInputSchema),z.lazy(() => IngredientCreateOrConnectWithoutRecipeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IngredientCreateManyRecipeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default IngredientCreateNestedManyWithoutRecipeInputSchema;

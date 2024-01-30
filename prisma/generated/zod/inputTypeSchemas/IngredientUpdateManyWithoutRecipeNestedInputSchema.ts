import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientCreateWithoutRecipeInputSchema } from './IngredientCreateWithoutRecipeInputSchema';
import { IngredientUncheckedCreateWithoutRecipeInputSchema } from './IngredientUncheckedCreateWithoutRecipeInputSchema';
import { IngredientCreateOrConnectWithoutRecipeInputSchema } from './IngredientCreateOrConnectWithoutRecipeInputSchema';
import { IngredientUpsertWithWhereUniqueWithoutRecipeInputSchema } from './IngredientUpsertWithWhereUniqueWithoutRecipeInputSchema';
import { IngredientCreateManyRecipeInputEnvelopeSchema } from './IngredientCreateManyRecipeInputEnvelopeSchema';
import { IngredientWhereUniqueInputSchema } from './IngredientWhereUniqueInputSchema';
import { IngredientUpdateWithWhereUniqueWithoutRecipeInputSchema } from './IngredientUpdateWithWhereUniqueWithoutRecipeInputSchema';
import { IngredientUpdateManyWithWhereWithoutRecipeInputSchema } from './IngredientUpdateManyWithWhereWithoutRecipeInputSchema';
import { IngredientScalarWhereInputSchema } from './IngredientScalarWhereInputSchema';

export const IngredientUpdateManyWithoutRecipeNestedInputSchema: z.ZodType<Prisma.IngredientUpdateManyWithoutRecipeNestedInput> = z.object({
  create: z.union([ z.lazy(() => IngredientCreateWithoutRecipeInputSchema),z.lazy(() => IngredientCreateWithoutRecipeInputSchema).array(),z.lazy(() => IngredientUncheckedCreateWithoutRecipeInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutRecipeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IngredientCreateOrConnectWithoutRecipeInputSchema),z.lazy(() => IngredientCreateOrConnectWithoutRecipeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IngredientUpsertWithWhereUniqueWithoutRecipeInputSchema),z.lazy(() => IngredientUpsertWithWhereUniqueWithoutRecipeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IngredientCreateManyRecipeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IngredientUpdateWithWhereUniqueWithoutRecipeInputSchema),z.lazy(() => IngredientUpdateWithWhereUniqueWithoutRecipeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IngredientUpdateManyWithWhereWithoutRecipeInputSchema),z.lazy(() => IngredientUpdateManyWithWhereWithoutRecipeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IngredientScalarWhereInputSchema),z.lazy(() => IngredientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default IngredientUpdateManyWithoutRecipeNestedInputSchema;

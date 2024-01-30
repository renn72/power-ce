import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientCreateWithoutBaseIngredientInputSchema } from './IngredientCreateWithoutBaseIngredientInputSchema';
import { IngredientUncheckedCreateWithoutBaseIngredientInputSchema } from './IngredientUncheckedCreateWithoutBaseIngredientInputSchema';
import { IngredientCreateOrConnectWithoutBaseIngredientInputSchema } from './IngredientCreateOrConnectWithoutBaseIngredientInputSchema';
import { IngredientUpsertWithWhereUniqueWithoutBaseIngredientInputSchema } from './IngredientUpsertWithWhereUniqueWithoutBaseIngredientInputSchema';
import { IngredientCreateManyBaseIngredientInputEnvelopeSchema } from './IngredientCreateManyBaseIngredientInputEnvelopeSchema';
import { IngredientWhereUniqueInputSchema } from './IngredientWhereUniqueInputSchema';
import { IngredientUpdateWithWhereUniqueWithoutBaseIngredientInputSchema } from './IngredientUpdateWithWhereUniqueWithoutBaseIngredientInputSchema';
import { IngredientUpdateManyWithWhereWithoutBaseIngredientInputSchema } from './IngredientUpdateManyWithWhereWithoutBaseIngredientInputSchema';
import { IngredientScalarWhereInputSchema } from './IngredientScalarWhereInputSchema';

export const IngredientUncheckedUpdateManyWithoutBaseIngredientNestedInputSchema: z.ZodType<Prisma.IngredientUncheckedUpdateManyWithoutBaseIngredientNestedInput> = z.object({
  create: z.union([ z.lazy(() => IngredientCreateWithoutBaseIngredientInputSchema),z.lazy(() => IngredientCreateWithoutBaseIngredientInputSchema).array(),z.lazy(() => IngredientUncheckedCreateWithoutBaseIngredientInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutBaseIngredientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IngredientCreateOrConnectWithoutBaseIngredientInputSchema),z.lazy(() => IngredientCreateOrConnectWithoutBaseIngredientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IngredientUpsertWithWhereUniqueWithoutBaseIngredientInputSchema),z.lazy(() => IngredientUpsertWithWhereUniqueWithoutBaseIngredientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IngredientCreateManyBaseIngredientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IngredientUpdateWithWhereUniqueWithoutBaseIngredientInputSchema),z.lazy(() => IngredientUpdateWithWhereUniqueWithoutBaseIngredientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IngredientUpdateManyWithWhereWithoutBaseIngredientInputSchema),z.lazy(() => IngredientUpdateManyWithWhereWithoutBaseIngredientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IngredientScalarWhereInputSchema),z.lazy(() => IngredientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default IngredientUncheckedUpdateManyWithoutBaseIngredientNestedInputSchema;

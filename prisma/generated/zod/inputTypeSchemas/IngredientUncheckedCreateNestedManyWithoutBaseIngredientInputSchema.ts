import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { IngredientCreateWithoutBaseIngredientInputSchema } from './IngredientCreateWithoutBaseIngredientInputSchema';
import { IngredientUncheckedCreateWithoutBaseIngredientInputSchema } from './IngredientUncheckedCreateWithoutBaseIngredientInputSchema';
import { IngredientCreateOrConnectWithoutBaseIngredientInputSchema } from './IngredientCreateOrConnectWithoutBaseIngredientInputSchema';
import { IngredientCreateManyBaseIngredientInputEnvelopeSchema } from './IngredientCreateManyBaseIngredientInputEnvelopeSchema';
import { IngredientWhereUniqueInputSchema } from './IngredientWhereUniqueInputSchema';

export const IngredientUncheckedCreateNestedManyWithoutBaseIngredientInputSchema: z.ZodType<Prisma.IngredientUncheckedCreateNestedManyWithoutBaseIngredientInput> = z.object({
  create: z.union([ z.lazy(() => IngredientCreateWithoutBaseIngredientInputSchema),z.lazy(() => IngredientCreateWithoutBaseIngredientInputSchema).array(),z.lazy(() => IngredientUncheckedCreateWithoutBaseIngredientInputSchema),z.lazy(() => IngredientUncheckedCreateWithoutBaseIngredientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IngredientCreateOrConnectWithoutBaseIngredientInputSchema),z.lazy(() => IngredientCreateOrConnectWithoutBaseIngredientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IngredientCreateManyBaseIngredientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IngredientWhereUniqueInputSchema),z.lazy(() => IngredientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default IngredientUncheckedCreateNestedManyWithoutBaseIngredientInputSchema;

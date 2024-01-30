import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseCreateWithoutSsInputSchema } from './ExerciseCreateWithoutSsInputSchema';
import { ExerciseUncheckedCreateWithoutSsInputSchema } from './ExerciseUncheckedCreateWithoutSsInputSchema';
import { ExerciseCreateOrConnectWithoutSsInputSchema } from './ExerciseCreateOrConnectWithoutSsInputSchema';
import { ExerciseUpsertWithoutSsInputSchema } from './ExerciseUpsertWithoutSsInputSchema';
import { ExerciseWhereInputSchema } from './ExerciseWhereInputSchema';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';
import { ExerciseUpdateToOneWithWhereWithoutSsInputSchema } from './ExerciseUpdateToOneWithWhereWithoutSsInputSchema';
import { ExerciseUpdateWithoutSsInputSchema } from './ExerciseUpdateWithoutSsInputSchema';
import { ExerciseUncheckedUpdateWithoutSsInputSchema } from './ExerciseUncheckedUpdateWithoutSsInputSchema';

export const ExerciseUpdateOneWithoutSsNestedInputSchema: z.ZodType<Prisma.ExerciseUpdateOneWithoutSsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutSsInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutSsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExerciseCreateOrConnectWithoutSsInputSchema).optional(),
  upsert: z.lazy(() => ExerciseUpsertWithoutSsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ExerciseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ExerciseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ExerciseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExerciseUpdateToOneWithWhereWithoutSsInputSchema),z.lazy(() => ExerciseUpdateWithoutSsInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutSsInputSchema) ]).optional(),
}).strict();

export default ExerciseUpdateOneWithoutSsNestedInputSchema;

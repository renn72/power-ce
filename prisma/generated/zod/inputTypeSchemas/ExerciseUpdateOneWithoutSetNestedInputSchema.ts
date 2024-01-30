import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseCreateWithoutSetInputSchema } from './ExerciseCreateWithoutSetInputSchema';
import { ExerciseUncheckedCreateWithoutSetInputSchema } from './ExerciseUncheckedCreateWithoutSetInputSchema';
import { ExerciseCreateOrConnectWithoutSetInputSchema } from './ExerciseCreateOrConnectWithoutSetInputSchema';
import { ExerciseUpsertWithoutSetInputSchema } from './ExerciseUpsertWithoutSetInputSchema';
import { ExerciseWhereInputSchema } from './ExerciseWhereInputSchema';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';
import { ExerciseUpdateToOneWithWhereWithoutSetInputSchema } from './ExerciseUpdateToOneWithWhereWithoutSetInputSchema';
import { ExerciseUpdateWithoutSetInputSchema } from './ExerciseUpdateWithoutSetInputSchema';
import { ExerciseUncheckedUpdateWithoutSetInputSchema } from './ExerciseUncheckedUpdateWithoutSetInputSchema';

export const ExerciseUpdateOneWithoutSetNestedInputSchema: z.ZodType<Prisma.ExerciseUpdateOneWithoutSetNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutSetInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutSetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExerciseCreateOrConnectWithoutSetInputSchema).optional(),
  upsert: z.lazy(() => ExerciseUpsertWithoutSetInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ExerciseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ExerciseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ExerciseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExerciseUpdateToOneWithWhereWithoutSetInputSchema),z.lazy(() => ExerciseUpdateWithoutSetInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutSetInputSchema) ]).optional(),
}).strict();

export default ExerciseUpdateOneWithoutSetNestedInputSchema;

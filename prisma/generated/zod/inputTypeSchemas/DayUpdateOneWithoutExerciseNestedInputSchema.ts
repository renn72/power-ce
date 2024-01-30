import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DayCreateWithoutExerciseInputSchema } from './DayCreateWithoutExerciseInputSchema';
import { DayUncheckedCreateWithoutExerciseInputSchema } from './DayUncheckedCreateWithoutExerciseInputSchema';
import { DayCreateOrConnectWithoutExerciseInputSchema } from './DayCreateOrConnectWithoutExerciseInputSchema';
import { DayUpsertWithoutExerciseInputSchema } from './DayUpsertWithoutExerciseInputSchema';
import { DayWhereInputSchema } from './DayWhereInputSchema';
import { DayWhereUniqueInputSchema } from './DayWhereUniqueInputSchema';
import { DayUpdateToOneWithWhereWithoutExerciseInputSchema } from './DayUpdateToOneWithWhereWithoutExerciseInputSchema';
import { DayUpdateWithoutExerciseInputSchema } from './DayUpdateWithoutExerciseInputSchema';
import { DayUncheckedUpdateWithoutExerciseInputSchema } from './DayUncheckedUpdateWithoutExerciseInputSchema';

export const DayUpdateOneWithoutExerciseNestedInputSchema: z.ZodType<Prisma.DayUpdateOneWithoutExerciseNestedInput> = z.object({
  create: z.union([ z.lazy(() => DayCreateWithoutExerciseInputSchema),z.lazy(() => DayUncheckedCreateWithoutExerciseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DayCreateOrConnectWithoutExerciseInputSchema).optional(),
  upsert: z.lazy(() => DayUpsertWithoutExerciseInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DayWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DayWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DayWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DayUpdateToOneWithWhereWithoutExerciseInputSchema),z.lazy(() => DayUpdateWithoutExerciseInputSchema),z.lazy(() => DayUncheckedUpdateWithoutExerciseInputSchema) ]).optional(),
}).strict();

export default DayUpdateOneWithoutExerciseNestedInputSchema;

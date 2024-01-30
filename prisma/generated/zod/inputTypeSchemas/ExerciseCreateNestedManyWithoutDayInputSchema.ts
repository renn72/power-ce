import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ExerciseCreateWithoutDayInputSchema } from './ExerciseCreateWithoutDayInputSchema';
import { ExerciseUncheckedCreateWithoutDayInputSchema } from './ExerciseUncheckedCreateWithoutDayInputSchema';
import { ExerciseCreateOrConnectWithoutDayInputSchema } from './ExerciseCreateOrConnectWithoutDayInputSchema';
import { ExerciseCreateManyDayInputEnvelopeSchema } from './ExerciseCreateManyDayInputEnvelopeSchema';
import { ExerciseWhereUniqueInputSchema } from './ExerciseWhereUniqueInputSchema';

export const ExerciseCreateNestedManyWithoutDayInputSchema: z.ZodType<Prisma.ExerciseCreateNestedManyWithoutDayInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutDayInputSchema),z.lazy(() => ExerciseCreateWithoutDayInputSchema).array(),z.lazy(() => ExerciseUncheckedCreateWithoutDayInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExerciseCreateOrConnectWithoutDayInputSchema),z.lazy(() => ExerciseCreateOrConnectWithoutDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExerciseCreateManyDayInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ExerciseCreateNestedManyWithoutDayInputSchema;

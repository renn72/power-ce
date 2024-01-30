import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekCreateWithoutBlockInputSchema } from './WeekCreateWithoutBlockInputSchema';
import { WeekUncheckedCreateWithoutBlockInputSchema } from './WeekUncheckedCreateWithoutBlockInputSchema';
import { WeekCreateOrConnectWithoutBlockInputSchema } from './WeekCreateOrConnectWithoutBlockInputSchema';
import { WeekUpsertWithWhereUniqueWithoutBlockInputSchema } from './WeekUpsertWithWhereUniqueWithoutBlockInputSchema';
import { WeekCreateManyBlockInputEnvelopeSchema } from './WeekCreateManyBlockInputEnvelopeSchema';
import { WeekWhereUniqueInputSchema } from './WeekWhereUniqueInputSchema';
import { WeekUpdateWithWhereUniqueWithoutBlockInputSchema } from './WeekUpdateWithWhereUniqueWithoutBlockInputSchema';
import { WeekUpdateManyWithWhereWithoutBlockInputSchema } from './WeekUpdateManyWithWhereWithoutBlockInputSchema';
import { WeekScalarWhereInputSchema } from './WeekScalarWhereInputSchema';

export const WeekUncheckedUpdateManyWithoutBlockNestedInputSchema: z.ZodType<Prisma.WeekUncheckedUpdateManyWithoutBlockNestedInput> = z.object({
  create: z.union([ z.lazy(() => WeekCreateWithoutBlockInputSchema),z.lazy(() => WeekCreateWithoutBlockInputSchema).array(),z.lazy(() => WeekUncheckedCreateWithoutBlockInputSchema),z.lazy(() => WeekUncheckedCreateWithoutBlockInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WeekCreateOrConnectWithoutBlockInputSchema),z.lazy(() => WeekCreateOrConnectWithoutBlockInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WeekUpsertWithWhereUniqueWithoutBlockInputSchema),z.lazy(() => WeekUpsertWithWhereUniqueWithoutBlockInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WeekCreateManyBlockInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WeekWhereUniqueInputSchema),z.lazy(() => WeekWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WeekWhereUniqueInputSchema),z.lazy(() => WeekWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WeekWhereUniqueInputSchema),z.lazy(() => WeekWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WeekWhereUniqueInputSchema),z.lazy(() => WeekWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WeekUpdateWithWhereUniqueWithoutBlockInputSchema),z.lazy(() => WeekUpdateWithWhereUniqueWithoutBlockInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WeekUpdateManyWithWhereWithoutBlockInputSchema),z.lazy(() => WeekUpdateManyWithWhereWithoutBlockInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WeekScalarWhereInputSchema),z.lazy(() => WeekScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default WeekUncheckedUpdateManyWithoutBlockNestedInputSchema;

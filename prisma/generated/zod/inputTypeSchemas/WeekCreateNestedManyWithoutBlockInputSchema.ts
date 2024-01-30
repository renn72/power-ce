import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekCreateWithoutBlockInputSchema } from './WeekCreateWithoutBlockInputSchema';
import { WeekUncheckedCreateWithoutBlockInputSchema } from './WeekUncheckedCreateWithoutBlockInputSchema';
import { WeekCreateOrConnectWithoutBlockInputSchema } from './WeekCreateOrConnectWithoutBlockInputSchema';
import { WeekCreateManyBlockInputEnvelopeSchema } from './WeekCreateManyBlockInputEnvelopeSchema';
import { WeekWhereUniqueInputSchema } from './WeekWhereUniqueInputSchema';

export const WeekCreateNestedManyWithoutBlockInputSchema: z.ZodType<Prisma.WeekCreateNestedManyWithoutBlockInput> = z.object({
  create: z.union([ z.lazy(() => WeekCreateWithoutBlockInputSchema),z.lazy(() => WeekCreateWithoutBlockInputSchema).array(),z.lazy(() => WeekUncheckedCreateWithoutBlockInputSchema),z.lazy(() => WeekUncheckedCreateWithoutBlockInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WeekCreateOrConnectWithoutBlockInputSchema),z.lazy(() => WeekCreateOrConnectWithoutBlockInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WeekCreateManyBlockInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WeekWhereUniqueInputSchema),z.lazy(() => WeekWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default WeekCreateNestedManyWithoutBlockInputSchema;

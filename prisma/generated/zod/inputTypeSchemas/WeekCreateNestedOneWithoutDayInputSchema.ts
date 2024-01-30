import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekCreateWithoutDayInputSchema } from './WeekCreateWithoutDayInputSchema';
import { WeekUncheckedCreateWithoutDayInputSchema } from './WeekUncheckedCreateWithoutDayInputSchema';
import { WeekCreateOrConnectWithoutDayInputSchema } from './WeekCreateOrConnectWithoutDayInputSchema';
import { WeekWhereUniqueInputSchema } from './WeekWhereUniqueInputSchema';

export const WeekCreateNestedOneWithoutDayInputSchema: z.ZodType<Prisma.WeekCreateNestedOneWithoutDayInput> = z.object({
  create: z.union([ z.lazy(() => WeekCreateWithoutDayInputSchema),z.lazy(() => WeekUncheckedCreateWithoutDayInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WeekCreateOrConnectWithoutDayInputSchema).optional(),
  connect: z.lazy(() => WeekWhereUniqueInputSchema).optional()
}).strict();

export default WeekCreateNestedOneWithoutDayInputSchema;

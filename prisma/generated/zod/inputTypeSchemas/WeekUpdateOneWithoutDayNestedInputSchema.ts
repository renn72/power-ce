import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekCreateWithoutDayInputSchema } from './WeekCreateWithoutDayInputSchema';
import { WeekUncheckedCreateWithoutDayInputSchema } from './WeekUncheckedCreateWithoutDayInputSchema';
import { WeekCreateOrConnectWithoutDayInputSchema } from './WeekCreateOrConnectWithoutDayInputSchema';
import { WeekUpsertWithoutDayInputSchema } from './WeekUpsertWithoutDayInputSchema';
import { WeekWhereInputSchema } from './WeekWhereInputSchema';
import { WeekWhereUniqueInputSchema } from './WeekWhereUniqueInputSchema';
import { WeekUpdateToOneWithWhereWithoutDayInputSchema } from './WeekUpdateToOneWithWhereWithoutDayInputSchema';
import { WeekUpdateWithoutDayInputSchema } from './WeekUpdateWithoutDayInputSchema';
import { WeekUncheckedUpdateWithoutDayInputSchema } from './WeekUncheckedUpdateWithoutDayInputSchema';

export const WeekUpdateOneWithoutDayNestedInputSchema: z.ZodType<Prisma.WeekUpdateOneWithoutDayNestedInput> = z.object({
  create: z.union([ z.lazy(() => WeekCreateWithoutDayInputSchema),z.lazy(() => WeekUncheckedCreateWithoutDayInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WeekCreateOrConnectWithoutDayInputSchema).optional(),
  upsert: z.lazy(() => WeekUpsertWithoutDayInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WeekWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WeekWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WeekWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WeekUpdateToOneWithWhereWithoutDayInputSchema),z.lazy(() => WeekUpdateWithoutDayInputSchema),z.lazy(() => WeekUncheckedUpdateWithoutDayInputSchema) ]).optional(),
}).strict();

export default WeekUpdateOneWithoutDayNestedInputSchema;

import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekWhereUniqueInputSchema } from './WeekWhereUniqueInputSchema';
import { WeekUpdateWithoutBlockInputSchema } from './WeekUpdateWithoutBlockInputSchema';
import { WeekUncheckedUpdateWithoutBlockInputSchema } from './WeekUncheckedUpdateWithoutBlockInputSchema';
import { WeekCreateWithoutBlockInputSchema } from './WeekCreateWithoutBlockInputSchema';
import { WeekUncheckedCreateWithoutBlockInputSchema } from './WeekUncheckedCreateWithoutBlockInputSchema';

export const WeekUpsertWithWhereUniqueWithoutBlockInputSchema: z.ZodType<Prisma.WeekUpsertWithWhereUniqueWithoutBlockInput> = z.object({
  where: z.lazy(() => WeekWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WeekUpdateWithoutBlockInputSchema),z.lazy(() => WeekUncheckedUpdateWithoutBlockInputSchema) ]),
  create: z.union([ z.lazy(() => WeekCreateWithoutBlockInputSchema),z.lazy(() => WeekUncheckedCreateWithoutBlockInputSchema) ]),
}).strict();

export default WeekUpsertWithWhereUniqueWithoutBlockInputSchema;

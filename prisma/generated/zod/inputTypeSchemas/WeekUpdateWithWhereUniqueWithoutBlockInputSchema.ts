import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekWhereUniqueInputSchema } from './WeekWhereUniqueInputSchema';
import { WeekUpdateWithoutBlockInputSchema } from './WeekUpdateWithoutBlockInputSchema';
import { WeekUncheckedUpdateWithoutBlockInputSchema } from './WeekUncheckedUpdateWithoutBlockInputSchema';

export const WeekUpdateWithWhereUniqueWithoutBlockInputSchema: z.ZodType<Prisma.WeekUpdateWithWhereUniqueWithoutBlockInput> = z.object({
  where: z.lazy(() => WeekWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WeekUpdateWithoutBlockInputSchema),z.lazy(() => WeekUncheckedUpdateWithoutBlockInputSchema) ]),
}).strict();

export default WeekUpdateWithWhereUniqueWithoutBlockInputSchema;

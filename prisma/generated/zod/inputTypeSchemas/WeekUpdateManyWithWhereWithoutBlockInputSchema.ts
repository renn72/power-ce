import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WeekScalarWhereInputSchema } from './WeekScalarWhereInputSchema';
import { WeekUpdateManyMutationInputSchema } from './WeekUpdateManyMutationInputSchema';
import { WeekUncheckedUpdateManyWithoutBlockInputSchema } from './WeekUncheckedUpdateManyWithoutBlockInputSchema';

export const WeekUpdateManyWithWhereWithoutBlockInputSchema: z.ZodType<Prisma.WeekUpdateManyWithWhereWithoutBlockInput> = z.object({
  where: z.lazy(() => WeekScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WeekUpdateManyMutationInputSchema),z.lazy(() => WeekUncheckedUpdateManyWithoutBlockInputSchema) ]),
}).strict();

export default WeekUpdateManyWithWhereWithoutBlockInputSchema;

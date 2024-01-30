import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BaseIngredientCountOutputTypeSelectSchema } from './BaseIngredientCountOutputTypeSelectSchema';

export const BaseIngredientCountOutputTypeArgsSchema: z.ZodType<Prisma.BaseIngredientCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BaseIngredientCountOutputTypeSelectSchema).nullish(),
}).strict();

export default BaseIngredientCountOutputTypeSelectSchema;

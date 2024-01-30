import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const BaseIngredientCountOutputTypeSelectSchema: z.ZodType<Prisma.BaseIngredientCountOutputTypeSelect> = z.object({
  ingredient: z.boolean().optional(),
}).strict();

export default BaseIngredientCountOutputTypeSelectSchema;

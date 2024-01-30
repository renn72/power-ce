import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BaseIngredientSelectSchema } from '../inputTypeSchemas/BaseIngredientSelectSchema';
import { BaseIngredientIncludeSchema } from '../inputTypeSchemas/BaseIngredientIncludeSchema';

export const BaseIngredientArgsSchema: z.ZodType<Prisma.BaseIngredientDefaultArgs> = z.object({
  select: z.lazy(() => BaseIngredientSelectSchema).optional(),
  include: z.lazy(() => BaseIngredientIncludeSchema).optional(),
}).strict();

export default BaseIngredientArgsSchema;

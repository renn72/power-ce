import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientSelectSchema } from '../inputTypeSchemas/IngredientSelectSchema';
import { IngredientIncludeSchema } from '../inputTypeSchemas/IngredientIncludeSchema';

export const IngredientArgsSchema: z.ZodType<Prisma.IngredientDefaultArgs> = z.object({
  select: z.lazy(() => IngredientSelectSchema).optional(),
  include: z.lazy(() => IngredientIncludeSchema).optional(),
}).strict();

export default IngredientArgsSchema;

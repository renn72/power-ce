import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientFindManyArgsSchema } from "../outputTypeSchemas/IngredientFindManyArgsSchema"
import { BaseIngredientCountOutputTypeArgsSchema } from "../outputTypeSchemas/BaseIngredientCountOutputTypeArgsSchema"

export const BaseIngredientIncludeSchema: z.ZodType<Prisma.BaseIngredientInclude> = z.object({
  ingredient: z.union([z.boolean(),z.lazy(() => IngredientFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BaseIngredientCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default BaseIngredientIncludeSchema;

import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BaseIngredientArgsSchema } from "../outputTypeSchemas/BaseIngredientArgsSchema"
import { RecipeArgsSchema } from "../outputTypeSchemas/RecipeArgsSchema"

export const IngredientIncludeSchema: z.ZodType<Prisma.IngredientInclude> = z.object({
  baseIngredient: z.union([z.boolean(),z.lazy(() => BaseIngredientArgsSchema)]).optional(),
  recipe: z.union([z.boolean(),z.lazy(() => RecipeArgsSchema)]).optional(),
}).strict()

export default IngredientIncludeSchema;

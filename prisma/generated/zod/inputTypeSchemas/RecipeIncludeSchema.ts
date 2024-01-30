import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientFindManyArgsSchema } from "../outputTypeSchemas/IngredientFindManyArgsSchema"
import { RecipeNoteFindManyArgsSchema } from "../outputTypeSchemas/RecipeNoteFindManyArgsSchema"
import { RecipeCountOutputTypeArgsSchema } from "../outputTypeSchemas/RecipeCountOutputTypeArgsSchema"

export const RecipeIncludeSchema: z.ZodType<Prisma.RecipeInclude> = z.object({
  ingredients: z.union([z.boolean(),z.lazy(() => IngredientFindManyArgsSchema)]).optional(),
  notes: z.union([z.boolean(),z.lazy(() => RecipeNoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RecipeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default RecipeIncludeSchema;

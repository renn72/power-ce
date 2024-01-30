import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientIncludeSchema } from '../inputTypeSchemas/IngredientIncludeSchema'
import { IngredientCreateInputSchema } from '../inputTypeSchemas/IngredientCreateInputSchema'
import { IngredientUncheckedCreateInputSchema } from '../inputTypeSchemas/IngredientUncheckedCreateInputSchema'
import { BaseIngredientArgsSchema } from "../outputTypeSchemas/BaseIngredientArgsSchema"
import { RecipeArgsSchema } from "../outputTypeSchemas/RecipeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const IngredientSelectSchema: z.ZodType<Prisma.IngredientSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  baseIngredientId: z.boolean().optional(),
  recipeId: z.boolean().optional(),
  size: z.boolean().optional(),
  unit: z.boolean().optional(),
  isScalable: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  baseIngredient: z.union([z.boolean(),z.lazy(() => BaseIngredientArgsSchema)]).optional(),
  recipe: z.union([z.boolean(),z.lazy(() => RecipeArgsSchema)]).optional(),
}).strict()

export const IngredientCreateArgsSchema: z.ZodType<Prisma.IngredientCreateArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  data: z.union([ IngredientCreateInputSchema,IngredientUncheckedCreateInputSchema ]),
}).strict() ;

export default IngredientCreateArgsSchema;

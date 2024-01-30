import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientIncludeSchema } from '../inputTypeSchemas/IngredientIncludeSchema'
import { IngredientWhereUniqueInputSchema } from '../inputTypeSchemas/IngredientWhereUniqueInputSchema'
import { IngredientCreateInputSchema } from '../inputTypeSchemas/IngredientCreateInputSchema'
import { IngredientUncheckedCreateInputSchema } from '../inputTypeSchemas/IngredientUncheckedCreateInputSchema'
import { IngredientUpdateInputSchema } from '../inputTypeSchemas/IngredientUpdateInputSchema'
import { IngredientUncheckedUpdateInputSchema } from '../inputTypeSchemas/IngredientUncheckedUpdateInputSchema'
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

export const IngredientUpsertArgsSchema: z.ZodType<Prisma.IngredientUpsertArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  where: IngredientWhereUniqueInputSchema,
  create: z.union([ IngredientCreateInputSchema,IngredientUncheckedCreateInputSchema ]),
  update: z.union([ IngredientUpdateInputSchema,IngredientUncheckedUpdateInputSchema ]),
}).strict() ;

export default IngredientUpsertArgsSchema;

import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIncludeSchema } from '../inputTypeSchemas/RecipeIncludeSchema'
import { RecipeCreateInputSchema } from '../inputTypeSchemas/RecipeCreateInputSchema'
import { RecipeUncheckedCreateInputSchema } from '../inputTypeSchemas/RecipeUncheckedCreateInputSchema'
import { IngredientFindManyArgsSchema } from "../outputTypeSchemas/IngredientFindManyArgsSchema"
import { RecipeNoteFindManyArgsSchema } from "../outputTypeSchemas/RecipeNoteFindManyArgsSchema"
import { RecipeCountOutputTypeArgsSchema } from "../outputTypeSchemas/RecipeCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecipeSelectSchema: z.ZodType<Prisma.RecipeSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  name: z.boolean().optional(),
  calories: z.boolean().optional(),
  fat: z.boolean().optional(),
  carbs: z.boolean().optional(),
  protein: z.boolean().optional(),
  isGluetenFree: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  isScalable: z.boolean().optional(),
  size: z.boolean().optional(),
  unit: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  ingredients: z.union([z.boolean(),z.lazy(() => IngredientFindManyArgsSchema)]).optional(),
  notes: z.union([z.boolean(),z.lazy(() => RecipeNoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RecipeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RecipeCreateArgsSchema: z.ZodType<Prisma.RecipeCreateArgs> = z.object({
  select: RecipeSelectSchema.optional(),
  include: RecipeIncludeSchema.optional(),
  data: z.union([ RecipeCreateInputSchema,RecipeUncheckedCreateInputSchema ]),
}).strict() ;

export default RecipeCreateArgsSchema;

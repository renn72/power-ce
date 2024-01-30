import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeIncludeSchema } from '../inputTypeSchemas/RecipeIncludeSchema'
import { RecipeWhereInputSchema } from '../inputTypeSchemas/RecipeWhereInputSchema'
import { RecipeOrderByWithRelationInputSchema } from '../inputTypeSchemas/RecipeOrderByWithRelationInputSchema'
import { RecipeWhereUniqueInputSchema } from '../inputTypeSchemas/RecipeWhereUniqueInputSchema'
import { RecipeScalarFieldEnumSchema } from '../inputTypeSchemas/RecipeScalarFieldEnumSchema'
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

export const RecipeFindFirstArgsSchema: z.ZodType<Prisma.RecipeFindFirstArgs> = z.object({
  select: RecipeSelectSchema.optional(),
  include: RecipeIncludeSchema.optional(),
  where: RecipeWhereInputSchema.optional(),
  orderBy: z.union([ RecipeOrderByWithRelationInputSchema.array(),RecipeOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipeScalarFieldEnumSchema,RecipeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default RecipeFindFirstArgsSchema;

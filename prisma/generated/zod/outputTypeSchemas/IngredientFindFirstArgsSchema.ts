import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientIncludeSchema } from '../inputTypeSchemas/IngredientIncludeSchema'
import { IngredientWhereInputSchema } from '../inputTypeSchemas/IngredientWhereInputSchema'
import { IngredientOrderByWithRelationInputSchema } from '../inputTypeSchemas/IngredientOrderByWithRelationInputSchema'
import { IngredientWhereUniqueInputSchema } from '../inputTypeSchemas/IngredientWhereUniqueInputSchema'
import { IngredientScalarFieldEnumSchema } from '../inputTypeSchemas/IngredientScalarFieldEnumSchema'
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

export const IngredientFindFirstArgsSchema: z.ZodType<Prisma.IngredientFindFirstArgs> = z.object({
  select: IngredientSelectSchema.optional(),
  include: IngredientIncludeSchema.optional(),
  where: IngredientWhereInputSchema.optional(),
  orderBy: z.union([ IngredientOrderByWithRelationInputSchema.array(),IngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: IngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IngredientScalarFieldEnumSchema,IngredientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default IngredientFindFirstArgsSchema;

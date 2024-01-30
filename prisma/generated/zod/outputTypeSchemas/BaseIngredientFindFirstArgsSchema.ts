import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BaseIngredientIncludeSchema } from '../inputTypeSchemas/BaseIngredientIncludeSchema'
import { BaseIngredientWhereInputSchema } from '../inputTypeSchemas/BaseIngredientWhereInputSchema'
import { BaseIngredientOrderByWithRelationInputSchema } from '../inputTypeSchemas/BaseIngredientOrderByWithRelationInputSchema'
import { BaseIngredientWhereUniqueInputSchema } from '../inputTypeSchemas/BaseIngredientWhereUniqueInputSchema'
import { BaseIngredientScalarFieldEnumSchema } from '../inputTypeSchemas/BaseIngredientScalarFieldEnumSchema'
import { IngredientFindManyArgsSchema } from "../outputTypeSchemas/IngredientFindManyArgsSchema"
import { BaseIngredientCountOutputTypeArgsSchema } from "../outputTypeSchemas/BaseIngredientCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BaseIngredientSelectSchema: z.ZodType<Prisma.BaseIngredientSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  name: z.boolean().optional(),
  calories: z.boolean().optional(),
  fat: z.boolean().optional(),
  carbs: z.boolean().optional(),
  protein: z.boolean().optional(),
  size: z.boolean().optional(),
  unit: z.boolean().optional(),
  isScalable: z.boolean().optional(),
  isGluetenFree: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  ingredient: z.union([z.boolean(),z.lazy(() => IngredientFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BaseIngredientCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BaseIngredientFindFirstArgsSchema: z.ZodType<Prisma.BaseIngredientFindFirstArgs> = z.object({
  select: BaseIngredientSelectSchema.optional(),
  include: BaseIngredientIncludeSchema.optional(),
  where: BaseIngredientWhereInputSchema.optional(),
  orderBy: z.union([ BaseIngredientOrderByWithRelationInputSchema.array(),BaseIngredientOrderByWithRelationInputSchema ]).optional(),
  cursor: BaseIngredientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BaseIngredientScalarFieldEnumSchema,BaseIngredientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default BaseIngredientFindFirstArgsSchema;

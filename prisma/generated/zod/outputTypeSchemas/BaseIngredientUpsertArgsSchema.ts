import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BaseIngredientIncludeSchema } from '../inputTypeSchemas/BaseIngredientIncludeSchema'
import { BaseIngredientWhereUniqueInputSchema } from '../inputTypeSchemas/BaseIngredientWhereUniqueInputSchema'
import { BaseIngredientCreateInputSchema } from '../inputTypeSchemas/BaseIngredientCreateInputSchema'
import { BaseIngredientUncheckedCreateInputSchema } from '../inputTypeSchemas/BaseIngredientUncheckedCreateInputSchema'
import { BaseIngredientUpdateInputSchema } from '../inputTypeSchemas/BaseIngredientUpdateInputSchema'
import { BaseIngredientUncheckedUpdateInputSchema } from '../inputTypeSchemas/BaseIngredientUncheckedUpdateInputSchema'
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

export const BaseIngredientUpsertArgsSchema: z.ZodType<Prisma.BaseIngredientUpsertArgs> = z.object({
  select: BaseIngredientSelectSchema.optional(),
  include: BaseIngredientIncludeSchema.optional(),
  where: BaseIngredientWhereUniqueInputSchema,
  create: z.union([ BaseIngredientCreateInputSchema,BaseIngredientUncheckedCreateInputSchema ]),
  update: z.union([ BaseIngredientUpdateInputSchema,BaseIngredientUncheckedUpdateInputSchema ]),
}).strict() ;

export default BaseIngredientUpsertArgsSchema;

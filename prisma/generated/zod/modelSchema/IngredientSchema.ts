import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// INGREDIENT SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const IngredientSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  baseIngredientId: z.string(),
  recipeId: z.string(),
  size: z.instanceof(Prisma.Decimal, { message: "Field 'size' must be a Decimal. Location: ['Models', 'Ingredient']"}),
  unit: z.string(),
  isScalable: z.boolean(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type Ingredient = z.infer<typeof IngredientSchema>

/////////////////////////////////////////
// INGREDIENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const IngredientOptionalDefaultsSchema = IngredientSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isScalable: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
}))

export type IngredientOptionalDefaults = z.infer<typeof IngredientOptionalDefaultsSchema>

export default IngredientSchema;

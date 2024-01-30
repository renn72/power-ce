import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// BASE INGREDIENT SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const BaseIngredientSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  name: z.string(),
  calories: z.instanceof(Prisma.Decimal, { message: "Field 'calories' must be a Decimal. Location: ['Models', 'BaseIngredient']"}),
  fat: z.instanceof(Prisma.Decimal, { message: "Field 'fat' must be a Decimal. Location: ['Models', 'BaseIngredient']"}),
  carbs: z.instanceof(Prisma.Decimal, { message: "Field 'carbs' must be a Decimal. Location: ['Models', 'BaseIngredient']"}),
  protein: z.instanceof(Prisma.Decimal, { message: "Field 'protein' must be a Decimal. Location: ['Models', 'BaseIngredient']"}),
  size: z.instanceof(Prisma.Decimal, { message: "Field 'size' must be a Decimal. Location: ['Models', 'BaseIngredient']"}),
  unit: z.string(),
  isScalable: z.boolean(),
  isGluetenFree: z.boolean(),
  isVegan: z.boolean(),
  isVegetarian: z.boolean(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type BaseIngredient = z.infer<typeof BaseIngredientSchema>

/////////////////////////////////////////
// BASE INGREDIENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const BaseIngredientOptionalDefaultsSchema = BaseIngredientSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isScalable: z.boolean().optional(),
  isGluetenFree: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
}))

export type BaseIngredientOptionalDefaults = z.infer<typeof BaseIngredientOptionalDefaultsSchema>

export default BaseIngredientSchema;

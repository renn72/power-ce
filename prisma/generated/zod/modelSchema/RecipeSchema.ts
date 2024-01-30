import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// RECIPE SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const RecipeSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  name: z.string(),
  calories: z.instanceof(Prisma.Decimal, { message: "Field 'calories' must be a Decimal. Location: ['Models', 'Recipe']"}),
  fat: z.instanceof(Prisma.Decimal, { message: "Field 'fat' must be a Decimal. Location: ['Models', 'Recipe']"}),
  carbs: z.instanceof(Prisma.Decimal, { message: "Field 'carbs' must be a Decimal. Location: ['Models', 'Recipe']"}),
  protein: z.instanceof(Prisma.Decimal, { message: "Field 'protein' must be a Decimal. Location: ['Models', 'Recipe']"}),
  isGluetenFree: z.boolean(),
  isVegan: z.boolean(),
  isVegetarian: z.boolean(),
  isScalable: z.boolean(),
  size: z.instanceof(Prisma.Decimal, { message: "Field 'size' must be a Decimal. Location: ['Models', 'Recipe']"}),
  unit: z.string(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type Recipe = z.infer<typeof RecipeSchema>

/////////////////////////////////////////
// RECIPE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const RecipeOptionalDefaultsSchema = RecipeSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isGluetenFree: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  isScalable: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
}))

export type RecipeOptionalDefaults = z.infer<typeof RecipeOptionalDefaultsSchema>

export default RecipeSchema;

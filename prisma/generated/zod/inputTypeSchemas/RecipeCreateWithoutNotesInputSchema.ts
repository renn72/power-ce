import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { IngredientCreateNestedManyWithoutRecipeInputSchema } from './IngredientCreateNestedManyWithoutRecipeInputSchema';

export const RecipeCreateWithoutNotesInputSchema: z.ZodType<Prisma.RecipeCreateWithoutNotesInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  name: z.string(),
  calories: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  fat: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  carbs: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  protein: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  isGluetenFree: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
  isScalable: z.boolean().optional(),
  size: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  unit: z.string(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  ingredients: z.lazy(() => IngredientCreateNestedManyWithoutRecipeInputSchema).optional()
}).strict();

export default RecipeCreateWithoutNotesInputSchema;

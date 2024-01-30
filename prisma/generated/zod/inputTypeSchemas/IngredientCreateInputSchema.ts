import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { BaseIngredientCreateNestedOneWithoutIngredientInputSchema } from './BaseIngredientCreateNestedOneWithoutIngredientInputSchema';
import { RecipeCreateNestedOneWithoutIngredientsInputSchema } from './RecipeCreateNestedOneWithoutIngredientsInputSchema';

export const IngredientCreateInputSchema: z.ZodType<Prisma.IngredientCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  size: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  unit: z.string(),
  isScalable: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable(),
  flield3: z.string().optional().nullable(),
  baseIngredient: z.lazy(() => BaseIngredientCreateNestedOneWithoutIngredientInputSchema),
  recipe: z.lazy(() => RecipeCreateNestedOneWithoutIngredientsInputSchema)
}).strict();

export default IngredientCreateInputSchema;

import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { IngredientWhereInputSchema } from './IngredientWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DecimalFilterSchema } from './DecimalFilterSchema';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BaseIngredientRelationFilterSchema } from './BaseIngredientRelationFilterSchema';
import { BaseIngredientWhereInputSchema } from './BaseIngredientWhereInputSchema';
import { RecipeRelationFilterSchema } from './RecipeRelationFilterSchema';
import { RecipeWhereInputSchema } from './RecipeWhereInputSchema';

export const IngredientWhereUniqueInputSchema: z.ZodType<Prisma.IngredientWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => IngredientWhereInputSchema),z.lazy(() => IngredientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IngredientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IngredientWhereInputSchema),z.lazy(() => IngredientWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  baseIngredientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isScalable: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  baseIngredient: z.union([ z.lazy(() => BaseIngredientRelationFilterSchema),z.lazy(() => BaseIngredientWhereInputSchema) ]).optional(),
  recipe: z.union([ z.lazy(() => RecipeRelationFilterSchema),z.lazy(() => RecipeWhereInputSchema) ]).optional(),
}).strict());

export default IngredientWhereUniqueInputSchema;

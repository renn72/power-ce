import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { RecipeWhereInputSchema } from './RecipeWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DecimalFilterSchema } from './DecimalFilterSchema';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { IngredientListRelationFilterSchema } from './IngredientListRelationFilterSchema';
import { RecipeNoteListRelationFilterSchema } from './RecipeNoteListRelationFilterSchema';

export const RecipeWhereUniqueInputSchema: z.ZodType<Prisma.RecipeWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => RecipeWhereInputSchema),z.lazy(() => RecipeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecipeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecipeWhereInputSchema),z.lazy(() => RecipeWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  calories: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  fat: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  carbs: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  protein: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  isGluetenFree: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isVegan: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isVegetarian: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isScalable: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  size: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ingredients: z.lazy(() => IngredientListRelationFilterSchema).optional(),
  notes: z.lazy(() => RecipeNoteListRelationFilterSchema).optional()
}).strict());

export default RecipeWhereUniqueInputSchema;

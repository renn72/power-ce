import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { DecimalWithAggregatesFilterSchema } from './DecimalWithAggregatesFilterSchema';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJsLikeSchema } from './DecimalJsLikeSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const IngredientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IngredientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IngredientScalarWhereWithAggregatesInputSchema),z.lazy(() => IngredientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IngredientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IngredientScalarWhereWithAggregatesInputSchema),z.lazy(() => IngredientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  baseIngredientId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  recipeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  unit: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isScalable: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isDeleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  flield1: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  flield2: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  flield3: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default IngredientScalarWhereWithAggregatesInputSchema;

import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const LogCreateInputSchema: z.ZodType<Prisma.LogCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  action: z.string(),
  location: z.string(),
  url: z.string().optional().nullable(),
  response: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  request: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  flield1: z.string().optional().nullable(),
  flield2: z.string().optional().nullable()
}).strict();

export default LogCreateInputSchema;

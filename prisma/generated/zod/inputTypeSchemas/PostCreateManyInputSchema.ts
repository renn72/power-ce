import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional()
}).strict();

export default PostCreateManyInputSchema;

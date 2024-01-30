import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional()
}).strict();

export default PostCreateInputSchema;

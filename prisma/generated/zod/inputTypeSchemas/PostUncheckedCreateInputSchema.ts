import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional()
}).strict();

export default PostUncheckedCreateInputSchema;

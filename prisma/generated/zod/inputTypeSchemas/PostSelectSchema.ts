import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  published: z.boolean().optional(),
}).strict()

export default PostSelectSchema;

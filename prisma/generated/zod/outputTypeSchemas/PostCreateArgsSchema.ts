import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateInputSchema } from '../inputTypeSchemas/PostCreateInputSchema'
import { PostUncheckedCreateInputSchema } from '../inputTypeSchemas/PostUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  published: z.boolean().optional(),
}).strict()

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict() ;

export default PostCreateArgsSchema;

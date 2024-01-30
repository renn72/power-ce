import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostUpdateInputSchema } from '../inputTypeSchemas/PostUpdateInputSchema'
import { PostUncheckedUpdateInputSchema } from '../inputTypeSchemas/PostUncheckedUpdateInputSchema'
import { PostWhereUniqueInputSchema } from '../inputTypeSchemas/PostWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  published: z.boolean().optional(),
}).strict()

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  data: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export default PostUpdateArgsSchema;

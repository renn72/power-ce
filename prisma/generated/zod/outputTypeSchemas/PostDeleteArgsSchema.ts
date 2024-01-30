import { z } from 'zod';
import type { Prisma } from '@prisma/client';
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

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export default PostDeleteArgsSchema;

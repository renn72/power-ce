import { z } from 'zod';

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const PostSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// POST OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const PostOptionalDefaultsSchema = PostSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  published: z.boolean().optional(),
}))

export type PostOptionalDefaults = z.infer<typeof PostOptionalDefaultsSchema>

export default PostSchema;

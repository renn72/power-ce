import { z } from 'zod';

/////////////////////////////////////////
// RECIPE NOTE SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const RecipeNoteSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  recipeId: z.string(),
  note: z.string(),
})

export type RecipeNote = z.infer<typeof RecipeNoteSchema>

/////////////////////////////////////////
// RECIPE NOTE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const RecipeNoteOptionalDefaultsSchema = RecipeNoteSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type RecipeNoteOptionalDefaults = z.infer<typeof RecipeNoteOptionalDefaultsSchema>

export default RecipeNoteSchema;

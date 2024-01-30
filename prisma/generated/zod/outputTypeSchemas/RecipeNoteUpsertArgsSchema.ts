import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeNoteIncludeSchema } from '../inputTypeSchemas/RecipeNoteIncludeSchema'
import { RecipeNoteWhereUniqueInputSchema } from '../inputTypeSchemas/RecipeNoteWhereUniqueInputSchema'
import { RecipeNoteCreateInputSchema } from '../inputTypeSchemas/RecipeNoteCreateInputSchema'
import { RecipeNoteUncheckedCreateInputSchema } from '../inputTypeSchemas/RecipeNoteUncheckedCreateInputSchema'
import { RecipeNoteUpdateInputSchema } from '../inputTypeSchemas/RecipeNoteUpdateInputSchema'
import { RecipeNoteUncheckedUpdateInputSchema } from '../inputTypeSchemas/RecipeNoteUncheckedUpdateInputSchema'
import { RecipeArgsSchema } from "../outputTypeSchemas/RecipeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecipeNoteSelectSchema: z.ZodType<Prisma.RecipeNoteSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  recipeId: z.boolean().optional(),
  note: z.boolean().optional(),
  recipe: z.union([z.boolean(),z.lazy(() => RecipeArgsSchema)]).optional(),
}).strict()

export const RecipeNoteUpsertArgsSchema: z.ZodType<Prisma.RecipeNoteUpsertArgs> = z.object({
  select: RecipeNoteSelectSchema.optional(),
  include: RecipeNoteIncludeSchema.optional(),
  where: RecipeNoteWhereUniqueInputSchema,
  create: z.union([ RecipeNoteCreateInputSchema,RecipeNoteUncheckedCreateInputSchema ]),
  update: z.union([ RecipeNoteUpdateInputSchema,RecipeNoteUncheckedUpdateInputSchema ]),
}).strict() ;

export default RecipeNoteUpsertArgsSchema;

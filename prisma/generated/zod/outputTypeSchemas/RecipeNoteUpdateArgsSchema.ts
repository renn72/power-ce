import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeNoteIncludeSchema } from '../inputTypeSchemas/RecipeNoteIncludeSchema'
import { RecipeNoteUpdateInputSchema } from '../inputTypeSchemas/RecipeNoteUpdateInputSchema'
import { RecipeNoteUncheckedUpdateInputSchema } from '../inputTypeSchemas/RecipeNoteUncheckedUpdateInputSchema'
import { RecipeNoteWhereUniqueInputSchema } from '../inputTypeSchemas/RecipeNoteWhereUniqueInputSchema'
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

export const RecipeNoteUpdateArgsSchema: z.ZodType<Prisma.RecipeNoteUpdateArgs> = z.object({
  select: RecipeNoteSelectSchema.optional(),
  include: RecipeNoteIncludeSchema.optional(),
  data: z.union([ RecipeNoteUpdateInputSchema,RecipeNoteUncheckedUpdateInputSchema ]),
  where: RecipeNoteWhereUniqueInputSchema,
}).strict() ;

export default RecipeNoteUpdateArgsSchema;

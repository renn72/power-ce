import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeNoteIncludeSchema } from '../inputTypeSchemas/RecipeNoteIncludeSchema'
import { RecipeNoteWhereInputSchema } from '../inputTypeSchemas/RecipeNoteWhereInputSchema'
import { RecipeNoteOrderByWithRelationInputSchema } from '../inputTypeSchemas/RecipeNoteOrderByWithRelationInputSchema'
import { RecipeNoteWhereUniqueInputSchema } from '../inputTypeSchemas/RecipeNoteWhereUniqueInputSchema'
import { RecipeNoteScalarFieldEnumSchema } from '../inputTypeSchemas/RecipeNoteScalarFieldEnumSchema'
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

export const RecipeNoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RecipeNoteFindFirstOrThrowArgs> = z.object({
  select: RecipeNoteSelectSchema.optional(),
  include: RecipeNoteIncludeSchema.optional(),
  where: RecipeNoteWhereInputSchema.optional(),
  orderBy: z.union([ RecipeNoteOrderByWithRelationInputSchema.array(),RecipeNoteOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeNoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecipeNoteScalarFieldEnumSchema,RecipeNoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default RecipeNoteFindFirstOrThrowArgsSchema;

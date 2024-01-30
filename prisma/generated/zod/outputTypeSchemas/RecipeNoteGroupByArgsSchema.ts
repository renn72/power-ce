import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeNoteWhereInputSchema } from '../inputTypeSchemas/RecipeNoteWhereInputSchema'
import { RecipeNoteOrderByWithAggregationInputSchema } from '../inputTypeSchemas/RecipeNoteOrderByWithAggregationInputSchema'
import { RecipeNoteScalarFieldEnumSchema } from '../inputTypeSchemas/RecipeNoteScalarFieldEnumSchema'
import { RecipeNoteScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/RecipeNoteScalarWhereWithAggregatesInputSchema'

export const RecipeNoteGroupByArgsSchema: z.ZodType<Prisma.RecipeNoteGroupByArgs> = z.object({
  where: RecipeNoteWhereInputSchema.optional(),
  orderBy: z.union([ RecipeNoteOrderByWithAggregationInputSchema.array(),RecipeNoteOrderByWithAggregationInputSchema ]).optional(),
  by: RecipeNoteScalarFieldEnumSchema.array(),
  having: RecipeNoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default RecipeNoteGroupByArgsSchema;

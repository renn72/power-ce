import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeNoteWhereInputSchema } from '../inputTypeSchemas/RecipeNoteWhereInputSchema'
import { RecipeNoteOrderByWithRelationInputSchema } from '../inputTypeSchemas/RecipeNoteOrderByWithRelationInputSchema'
import { RecipeNoteWhereUniqueInputSchema } from '../inputTypeSchemas/RecipeNoteWhereUniqueInputSchema'

export const RecipeNoteAggregateArgsSchema: z.ZodType<Prisma.RecipeNoteAggregateArgs> = z.object({
  where: RecipeNoteWhereInputSchema.optional(),
  orderBy: z.union([ RecipeNoteOrderByWithRelationInputSchema.array(),RecipeNoteOrderByWithRelationInputSchema ]).optional(),
  cursor: RecipeNoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default RecipeNoteAggregateArgsSchema;

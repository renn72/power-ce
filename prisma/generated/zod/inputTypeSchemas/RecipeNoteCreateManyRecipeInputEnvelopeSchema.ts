import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeNoteCreateManyRecipeInputSchema } from './RecipeNoteCreateManyRecipeInputSchema';

export const RecipeNoteCreateManyRecipeInputEnvelopeSchema: z.ZodType<Prisma.RecipeNoteCreateManyRecipeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RecipeNoteCreateManyRecipeInputSchema),z.lazy(() => RecipeNoteCreateManyRecipeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default RecipeNoteCreateManyRecipeInputEnvelopeSchema;

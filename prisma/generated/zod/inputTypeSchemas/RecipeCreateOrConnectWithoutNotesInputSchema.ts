import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeWhereUniqueInputSchema } from './RecipeWhereUniqueInputSchema';
import { RecipeCreateWithoutNotesInputSchema } from './RecipeCreateWithoutNotesInputSchema';
import { RecipeUncheckedCreateWithoutNotesInputSchema } from './RecipeUncheckedCreateWithoutNotesInputSchema';

export const RecipeCreateOrConnectWithoutNotesInputSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutNotesInput> = z.object({
  where: z.lazy(() => RecipeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecipeCreateWithoutNotesInputSchema),z.lazy(() => RecipeUncheckedCreateWithoutNotesInputSchema) ]),
}).strict();

export default RecipeCreateOrConnectWithoutNotesInputSchema;

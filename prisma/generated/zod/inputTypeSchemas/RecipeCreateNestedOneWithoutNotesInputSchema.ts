import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeCreateWithoutNotesInputSchema } from './RecipeCreateWithoutNotesInputSchema';
import { RecipeUncheckedCreateWithoutNotesInputSchema } from './RecipeUncheckedCreateWithoutNotesInputSchema';
import { RecipeCreateOrConnectWithoutNotesInputSchema } from './RecipeCreateOrConnectWithoutNotesInputSchema';
import { RecipeWhereUniqueInputSchema } from './RecipeWhereUniqueInputSchema';

export const RecipeCreateNestedOneWithoutNotesInputSchema: z.ZodType<Prisma.RecipeCreateNestedOneWithoutNotesInput> = z.object({
  create: z.union([ z.lazy(() => RecipeCreateWithoutNotesInputSchema),z.lazy(() => RecipeUncheckedCreateWithoutNotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RecipeCreateOrConnectWithoutNotesInputSchema).optional(),
  connect: z.lazy(() => RecipeWhereUniqueInputSchema).optional()
}).strict();

export default RecipeCreateNestedOneWithoutNotesInputSchema;

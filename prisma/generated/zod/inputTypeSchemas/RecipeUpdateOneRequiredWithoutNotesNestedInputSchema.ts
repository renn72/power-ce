import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeCreateWithoutNotesInputSchema } from './RecipeCreateWithoutNotesInputSchema';
import { RecipeUncheckedCreateWithoutNotesInputSchema } from './RecipeUncheckedCreateWithoutNotesInputSchema';
import { RecipeCreateOrConnectWithoutNotesInputSchema } from './RecipeCreateOrConnectWithoutNotesInputSchema';
import { RecipeUpsertWithoutNotesInputSchema } from './RecipeUpsertWithoutNotesInputSchema';
import { RecipeWhereUniqueInputSchema } from './RecipeWhereUniqueInputSchema';
import { RecipeUpdateToOneWithWhereWithoutNotesInputSchema } from './RecipeUpdateToOneWithWhereWithoutNotesInputSchema';
import { RecipeUpdateWithoutNotesInputSchema } from './RecipeUpdateWithoutNotesInputSchema';
import { RecipeUncheckedUpdateWithoutNotesInputSchema } from './RecipeUncheckedUpdateWithoutNotesInputSchema';

export const RecipeUpdateOneRequiredWithoutNotesNestedInputSchema: z.ZodType<Prisma.RecipeUpdateOneRequiredWithoutNotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeCreateWithoutNotesInputSchema),z.lazy(() => RecipeUncheckedCreateWithoutNotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RecipeCreateOrConnectWithoutNotesInputSchema).optional(),
  upsert: z.lazy(() => RecipeUpsertWithoutNotesInputSchema).optional(),
  connect: z.lazy(() => RecipeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RecipeUpdateToOneWithWhereWithoutNotesInputSchema),z.lazy(() => RecipeUpdateWithoutNotesInputSchema),z.lazy(() => RecipeUncheckedUpdateWithoutNotesInputSchema) ]).optional(),
}).strict();

export default RecipeUpdateOneRequiredWithoutNotesNestedInputSchema;

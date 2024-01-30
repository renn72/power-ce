import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeNoteCreateWithoutRecipeInputSchema } from './RecipeNoteCreateWithoutRecipeInputSchema';
import { RecipeNoteUncheckedCreateWithoutRecipeInputSchema } from './RecipeNoteUncheckedCreateWithoutRecipeInputSchema';
import { RecipeNoteCreateOrConnectWithoutRecipeInputSchema } from './RecipeNoteCreateOrConnectWithoutRecipeInputSchema';
import { RecipeNoteCreateManyRecipeInputEnvelopeSchema } from './RecipeNoteCreateManyRecipeInputEnvelopeSchema';
import { RecipeNoteWhereUniqueInputSchema } from './RecipeNoteWhereUniqueInputSchema';

export const RecipeNoteCreateNestedManyWithoutRecipeInputSchema: z.ZodType<Prisma.RecipeNoteCreateNestedManyWithoutRecipeInput> = z.object({
  create: z.union([ z.lazy(() => RecipeNoteCreateWithoutRecipeInputSchema),z.lazy(() => RecipeNoteCreateWithoutRecipeInputSchema).array(),z.lazy(() => RecipeNoteUncheckedCreateWithoutRecipeInputSchema),z.lazy(() => RecipeNoteUncheckedCreateWithoutRecipeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeNoteCreateOrConnectWithoutRecipeInputSchema),z.lazy(() => RecipeNoteCreateOrConnectWithoutRecipeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeNoteCreateManyRecipeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecipeNoteWhereUniqueInputSchema),z.lazy(() => RecipeNoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default RecipeNoteCreateNestedManyWithoutRecipeInputSchema;

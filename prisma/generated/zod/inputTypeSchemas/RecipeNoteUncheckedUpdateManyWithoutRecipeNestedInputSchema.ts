import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecipeNoteCreateWithoutRecipeInputSchema } from './RecipeNoteCreateWithoutRecipeInputSchema';
import { RecipeNoteUncheckedCreateWithoutRecipeInputSchema } from './RecipeNoteUncheckedCreateWithoutRecipeInputSchema';
import { RecipeNoteCreateOrConnectWithoutRecipeInputSchema } from './RecipeNoteCreateOrConnectWithoutRecipeInputSchema';
import { RecipeNoteUpsertWithWhereUniqueWithoutRecipeInputSchema } from './RecipeNoteUpsertWithWhereUniqueWithoutRecipeInputSchema';
import { RecipeNoteCreateManyRecipeInputEnvelopeSchema } from './RecipeNoteCreateManyRecipeInputEnvelopeSchema';
import { RecipeNoteWhereUniqueInputSchema } from './RecipeNoteWhereUniqueInputSchema';
import { RecipeNoteUpdateWithWhereUniqueWithoutRecipeInputSchema } from './RecipeNoteUpdateWithWhereUniqueWithoutRecipeInputSchema';
import { RecipeNoteUpdateManyWithWhereWithoutRecipeInputSchema } from './RecipeNoteUpdateManyWithWhereWithoutRecipeInputSchema';
import { RecipeNoteScalarWhereInputSchema } from './RecipeNoteScalarWhereInputSchema';

export const RecipeNoteUncheckedUpdateManyWithoutRecipeNestedInputSchema: z.ZodType<Prisma.RecipeNoteUncheckedUpdateManyWithoutRecipeNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecipeNoteCreateWithoutRecipeInputSchema),z.lazy(() => RecipeNoteCreateWithoutRecipeInputSchema).array(),z.lazy(() => RecipeNoteUncheckedCreateWithoutRecipeInputSchema),z.lazy(() => RecipeNoteUncheckedCreateWithoutRecipeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecipeNoteCreateOrConnectWithoutRecipeInputSchema),z.lazy(() => RecipeNoteCreateOrConnectWithoutRecipeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecipeNoteUpsertWithWhereUniqueWithoutRecipeInputSchema),z.lazy(() => RecipeNoteUpsertWithWhereUniqueWithoutRecipeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecipeNoteCreateManyRecipeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecipeNoteWhereUniqueInputSchema),z.lazy(() => RecipeNoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecipeNoteWhereUniqueInputSchema),z.lazy(() => RecipeNoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecipeNoteWhereUniqueInputSchema),z.lazy(() => RecipeNoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecipeNoteWhereUniqueInputSchema),z.lazy(() => RecipeNoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecipeNoteUpdateWithWhereUniqueWithoutRecipeInputSchema),z.lazy(() => RecipeNoteUpdateWithWhereUniqueWithoutRecipeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecipeNoteUpdateManyWithWhereWithoutRecipeInputSchema),z.lazy(() => RecipeNoteUpdateManyWithWhereWithoutRecipeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecipeNoteScalarWhereInputSchema),z.lazy(() => RecipeNoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default RecipeNoteUncheckedUpdateManyWithoutRecipeNestedInputSchema;

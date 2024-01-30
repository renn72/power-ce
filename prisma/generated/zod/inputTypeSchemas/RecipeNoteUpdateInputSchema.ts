import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { RecipeUpdateOneRequiredWithoutNotesNestedInputSchema } from './RecipeUpdateOneRequiredWithoutNotesNestedInputSchema';

export const RecipeNoteUpdateInputSchema: z.ZodType<Prisma.RecipeNoteUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recipe: z.lazy(() => RecipeUpdateOneRequiredWithoutNotesNestedInputSchema).optional()
}).strict();

export default RecipeNoteUpdateInputSchema;

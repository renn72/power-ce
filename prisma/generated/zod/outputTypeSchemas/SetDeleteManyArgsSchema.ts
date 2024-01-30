import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SetWhereInputSchema } from '../inputTypeSchemas/SetWhereInputSchema'

export const SetDeleteManyArgsSchema: z.ZodType<Prisma.SetDeleteManyArgs> = z.object({
  where: SetWhereInputSchema.optional(),
}).strict() ;

export default SetDeleteManyArgsSchema;

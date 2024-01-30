import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupCreateManyInputSchema } from '../inputTypeSchemas/WarmupCreateManyInputSchema'

export const WarmupCreateManyArgsSchema: z.ZodType<Prisma.WarmupCreateManyArgs> = z.object({
  data: z.union([ WarmupCreateManyInputSchema,WarmupCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default WarmupCreateManyArgsSchema;

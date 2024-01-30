import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateCreateManyInputSchema } from '../inputTypeSchemas/WarmupTemplateCreateManyInputSchema'

export const WarmupTemplateCreateManyArgsSchema: z.ZodType<Prisma.WarmupTemplateCreateManyArgs> = z.object({
  data: z.union([ WarmupTemplateCreateManyInputSchema,WarmupTemplateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default WarmupTemplateCreateManyArgsSchema;

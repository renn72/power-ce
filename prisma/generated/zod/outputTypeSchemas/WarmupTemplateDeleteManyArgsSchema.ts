import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupTemplateWhereInputSchema } from '../inputTypeSchemas/WarmupTemplateWhereInputSchema'

export const WarmupTemplateDeleteManyArgsSchema: z.ZodType<Prisma.WarmupTemplateDeleteManyArgs> = z.object({
  where: WarmupTemplateWhereInputSchema.optional(),
}).strict() ;

export default WarmupTemplateDeleteManyArgsSchema;

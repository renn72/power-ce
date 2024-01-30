import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WarmupWhereInputSchema } from '../inputTypeSchemas/WarmupWhereInputSchema'

export const WarmupDeleteManyArgsSchema: z.ZodType<Prisma.WarmupDeleteManyArgs> = z.object({
  where: WarmupWhereInputSchema.optional(),
}).strict() ;

export default WarmupDeleteManyArgsSchema;

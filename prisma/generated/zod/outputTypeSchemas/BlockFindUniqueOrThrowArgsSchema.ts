import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BlockIncludeSchema } from '../inputTypeSchemas/BlockIncludeSchema'
import { BlockWhereUniqueInputSchema } from '../inputTypeSchemas/BlockWhereUniqueInputSchema'
import { WeekFindManyArgsSchema } from "../outputTypeSchemas/WeekFindManyArgsSchema"
import { BlockCountOutputTypeArgsSchema } from "../outputTypeSchemas/BlockCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BlockSelectSchema: z.ZodType<Prisma.BlockSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  creatorId: z.boolean().optional(),
  isGlobal: z.boolean().optional(),
  name: z.boolean().optional(),
  isProgram: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  userId: z.boolean().optional(),
  trainerId: z.boolean().optional(),
  userIdOfProgram: z.boolean().optional(),
  isProgramActive: z.boolean().optional(),
  isComplete: z.boolean().optional(),
  isSecondary: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
  week: z.union([z.boolean(),z.lazy(() => WeekFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BlockCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BlockFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BlockFindUniqueOrThrowArgs> = z.object({
  select: BlockSelectSchema.optional(),
  include: BlockIncludeSchema.optional(),
  where: BlockWhereUniqueInputSchema,
}).strict() ;

export default BlockFindUniqueOrThrowArgsSchema;

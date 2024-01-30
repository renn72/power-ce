import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserIncludeSchema } from '../inputTypeSchemas/UserIncludeSchema'
import { UserCreateInputSchema } from '../inputTypeSchemas/UserCreateInputSchema'
import { UserUncheckedCreateInputSchema } from '../inputTypeSchemas/UserUncheckedCreateInputSchema'
import { AccountFindManyArgsSchema } from "../outputTypeSchemas/AccountFindManyArgsSchema"
import { SessionFindManyArgsSchema } from "../outputTypeSchemas/SessionFindManyArgsSchema"
import { UserProfileFindManyArgsSchema } from "../outputTypeSchemas/UserProfileFindManyArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  name: z.boolean().optional(),
  isDiet: z.boolean().optional(),
  isDietTrainer: z.boolean().optional(),
  isPower: z.boolean().optional(),
  isTrainer: z.boolean().optional(),
  isClient: z.boolean().optional(),
  isRecordEditor: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  isSuper: z.boolean().optional(),
  isCreator: z.boolean().optional(),
  isRoot: z.boolean().optional(),
  isHiit: z.boolean().optional(),
  isHiitTrainer: z.boolean().optional(),
  isPowerTrainer: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
  flield6: z.boolean().optional(),
  flield7: z.boolean().optional(),
  flield8: z.boolean().optional(),
  flield9: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  userProfiles: z.union([z.boolean(),z.lazy(() => UserProfileFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export default UserCreateArgsSchema;

import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// USER PROFILE SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const UserProfileSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  DOB: z.coerce.date().nullish(),
  gender: z.string().nullish(),
  height: z.instanceof(Prisma.Decimal, { message: "Field 'height' must be a Decimal. Location: ['Models', 'UserProfile']"}).nullish(),
  weight: z.instanceof(Prisma.Decimal, { message: "Field 'weight' must be a Decimal. Location: ['Models', 'UserProfile']"}).nullish(),
  targetWeight: z.instanceof(Prisma.Decimal, { message: "Field 'targetWeight' must be a Decimal. Location: ['Models', 'UserProfile']"}).nullish(),
  weightGoal: z.string().nullish(),
  activityLevelTraining: z.string().nullish(),
  activityLevelRest: z.string().nullish(),
  squatOneRepMax: z.instanceof(Prisma.Decimal, { message: "Field 'squatOneRepMax' must be a Decimal. Location: ['Models', 'UserProfile']"}).nullish(),
  benchOneRepMax: z.instanceof(Prisma.Decimal, { message: "Field 'benchOneRepMax' must be a Decimal. Location: ['Models', 'UserProfile']"}).nullish(),
  deadliftOneRepMax: z.instanceof(Prisma.Decimal, { message: "Field 'deadliftOneRepMax' must be a Decimal. Location: ['Models', 'UserProfile']"}).nullish(),
  programInterval: z.string().nullish(),
  isChecked: z.boolean(),
  sp1_1: z.instanceof(Prisma.Decimal, { message: "Field 'sp1_1' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  sp1_2: z.instanceof(Prisma.Decimal, { message: "Field 'sp1_2' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  sp1_3: z.instanceof(Prisma.Decimal, { message: "Field 'sp1_3' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  sp2_1: z.instanceof(Prisma.Decimal, { message: "Field 'sp2_1' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  sp2_2: z.instanceof(Prisma.Decimal, { message: "Field 'sp2_2' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  sp2_3: z.instanceof(Prisma.Decimal, { message: "Field 'sp2_3' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  sp3_1: z.instanceof(Prisma.Decimal, { message: "Field 'sp3_1' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  sp3_2: z.instanceof(Prisma.Decimal, { message: "Field 'sp3_2' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  sp3_3: z.instanceof(Prisma.Decimal, { message: "Field 'sp3_3' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  bp1_1: z.instanceof(Prisma.Decimal, { message: "Field 'bp1_1' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  bp1_2: z.instanceof(Prisma.Decimal, { message: "Field 'bp1_2' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  bp1_3: z.instanceof(Prisma.Decimal, { message: "Field 'bp1_3' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  bp2_1: z.instanceof(Prisma.Decimal, { message: "Field 'bp2_1' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  bp2_2: z.instanceof(Prisma.Decimal, { message: "Field 'bp2_2' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  bp2_3: z.instanceof(Prisma.Decimal, { message: "Field 'bp2_3' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  bp3_1: z.instanceof(Prisma.Decimal, { message: "Field 'bp3_1' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  bp3_2: z.instanceof(Prisma.Decimal, { message: "Field 'bp3_2' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  bp3_3: z.instanceof(Prisma.Decimal, { message: "Field 'bp3_3' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  dp1_1: z.instanceof(Prisma.Decimal, { message: "Field 'dp1_1' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  dp1_2: z.instanceof(Prisma.Decimal, { message: "Field 'dp1_2' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  dp1_3: z.instanceof(Prisma.Decimal, { message: "Field 'dp1_3' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  dp2_1: z.instanceof(Prisma.Decimal, { message: "Field 'dp2_1' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  dp2_2: z.instanceof(Prisma.Decimal, { message: "Field 'dp2_2' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  dp2_3: z.instanceof(Prisma.Decimal, { message: "Field 'dp2_3' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  dp3_1: z.instanceof(Prisma.Decimal, { message: "Field 'dp3_1' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  dp3_2: z.instanceof(Prisma.Decimal, { message: "Field 'dp3_2' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  dp3_3: z.instanceof(Prisma.Decimal, { message: "Field 'dp3_3' must be a Decimal. Location: ['Models', 'UserProfile']"}),
  fatAdjustment: z.instanceof(Prisma.Decimal, { message: "Field 'fatAdjustment' must be a Decimal. Location: ['Models', 'UserProfile']"}).nullish(),
  carbAdjustment: z.instanceof(Prisma.Decimal, { message: "Field 'carbAdjustment' must be a Decimal. Location: ['Models', 'UserProfile']"}).nullish(),
  proteinAdjustment: z.instanceof(Prisma.Decimal, { message: "Field 'proteinAdjustment' must be a Decimal. Location: ['Models', 'UserProfile']"}).nullish(),
  isDeleted: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

/////////////////////////////////////////
// USER PROFILE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserProfileOptionalDefaultsSchema = UserProfileSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isChecked: z.boolean().optional(),
  sp1_1: z.instanceof(Prisma.Decimal, { message: "Field 'sp1_1' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  sp1_2: z.instanceof(Prisma.Decimal, { message: "Field 'sp1_2' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  sp1_3: z.instanceof(Prisma.Decimal, { message: "Field 'sp1_3' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  sp2_1: z.instanceof(Prisma.Decimal, { message: "Field 'sp2_1' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  sp2_2: z.instanceof(Prisma.Decimal, { message: "Field 'sp2_2' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  sp2_3: z.instanceof(Prisma.Decimal, { message: "Field 'sp2_3' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  sp3_1: z.instanceof(Prisma.Decimal, { message: "Field 'sp3_1' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  sp3_2: z.instanceof(Prisma.Decimal, { message: "Field 'sp3_2' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  sp3_3: z.instanceof(Prisma.Decimal, { message: "Field 'sp3_3' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  bp1_1: z.instanceof(Prisma.Decimal, { message: "Field 'bp1_1' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  bp1_2: z.instanceof(Prisma.Decimal, { message: "Field 'bp1_2' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  bp1_3: z.instanceof(Prisma.Decimal, { message: "Field 'bp1_3' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  bp2_1: z.instanceof(Prisma.Decimal, { message: "Field 'bp2_1' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  bp2_2: z.instanceof(Prisma.Decimal, { message: "Field 'bp2_2' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  bp2_3: z.instanceof(Prisma.Decimal, { message: "Field 'bp2_3' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  bp3_1: z.instanceof(Prisma.Decimal, { message: "Field 'bp3_1' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  bp3_2: z.instanceof(Prisma.Decimal, { message: "Field 'bp3_2' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  bp3_3: z.instanceof(Prisma.Decimal, { message: "Field 'bp3_3' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  dp1_1: z.instanceof(Prisma.Decimal, { message: "Field 'dp1_1' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  dp1_2: z.instanceof(Prisma.Decimal, { message: "Field 'dp1_2' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  dp1_3: z.instanceof(Prisma.Decimal, { message: "Field 'dp1_3' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  dp2_1: z.instanceof(Prisma.Decimal, { message: "Field 'dp2_1' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  dp2_2: z.instanceof(Prisma.Decimal, { message: "Field 'dp2_2' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  dp2_3: z.instanceof(Prisma.Decimal, { message: "Field 'dp2_3' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  dp3_1: z.instanceof(Prisma.Decimal, { message: "Field 'dp3_1' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  dp3_2: z.instanceof(Prisma.Decimal, { message: "Field 'dp3_2' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  dp3_3: z.instanceof(Prisma.Decimal, { message: "Field 'dp3_3' must be a Decimal. Location: ['Models', 'UserProfile']"}).optional(),
  isDeleted: z.boolean().optional(),
}))

export type UserProfileOptionalDefaults = z.infer<typeof UserProfileOptionalDefaultsSchema>

export default UserProfileSchema;

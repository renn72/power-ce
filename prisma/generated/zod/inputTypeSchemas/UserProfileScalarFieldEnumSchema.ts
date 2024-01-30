import { z } from 'zod';

export const UserProfileScalarFieldEnumSchema = z.enum(['id','createdAt','userId','DOB','gender','height','weight','targetWeight','weightGoal','activityLevelTraining','activityLevelRest','squatOneRepMax','benchOneRepMax','deadliftOneRepMax','programInterval','isChecked','sp1_1','sp1_2','sp1_3','sp2_1','sp2_2','sp2_3','sp3_1','sp3_2','sp3_3','bp1_1','bp1_2','bp1_3','bp2_1','bp2_2','bp2_3','bp3_1','bp3_2','bp3_3','dp1_1','dp1_2','dp1_3','dp2_1','dp2_2','dp2_3','dp3_1','dp3_2','dp3_3','fatAdjustment','carbAdjustment','proteinAdjustment','isDeleted','flield1','flield2','flield3']);

export default UserProfileScalarFieldEnumSchema;

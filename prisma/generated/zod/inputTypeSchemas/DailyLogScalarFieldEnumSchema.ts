import { z } from 'zod';

export const DailyLogScalarFieldEnumSchema = z.enum(['id','createdAt','userId','weight','fat','carbs','protein','calories','steps','motivation','notes','sleepHrs','sleepQuality','recovery','stress','energy','restingHeartRate','vo2Max','isDeleted','flield1','flield2','flield3']);

export default DailyLogScalarFieldEnumSchema;

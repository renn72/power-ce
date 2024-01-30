import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','firstName','lastName','email','emailVerified','image','name','isDiet','isDietTrainer','isPower','isTrainer','isClient','isRecordEditor','isAdmin','isSuper','isCreator','isRoot','isHiit','isHiitTrainer','isPowerTrainer','flield1','flield2','flield3','flield4','flield5','flield6','flield7','flield8','flield9']);

export default UserScalarFieldEnumSchema;

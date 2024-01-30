import { z } from 'zod';

export const RecipeNoteScalarFieldEnumSchema = z.enum(['id','createdAt','recipeId','note']);

export default RecipeNoteScalarFieldEnumSchema;

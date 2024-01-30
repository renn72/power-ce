import { z } from 'zod'

export const ssSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(0).max(280).optional().nullable(),
  lift: z.string().min(0).max(55).optional().nullable(),
  sets: z.number().min(0).max(55).optional().nullable(),
  reps: z.number().min(0).max(99999).optional().nullable(),
  onerm: z.number().min(0).max(99999).optional().nullable(),
  onermTop: z.number().min(0).max(99999).optional().nullable(),
  weightTop: z.number().min(0).max(99999).optional().nullable(),
  weightBottom: z.number().min(0).max(99999).optional().nullable(),
  targetRpe: z.number().min(0).max(100).optional().nullable(),
  notes: z.string().min(0).max(280).optional().nullable(),
  htmlLink: z.string().min(0).max(280).optional().nullable(),
  weightType: z.string().min(0).max(280).optional().nullable(),
  repUnit: z.string().min(0).max(55).optional().nullable(),
})

export const exerciseSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(0).max(280).optional().nullable(),
  lift: z.string().min(0).max(55).optional().nullable(),
  sets: z.number().min(0).max(55).optional().nullable(),
  reps: z.number().min(0).max(99999).optional().nullable(),
  onerm: z.number().min(0).max(99999).optional().nullable(),
  onermTop: z.number().min(0).max(99999).optional().nullable(),
  weightTop: z.number().min(0).max(99999).optional().nullable(),
  weightBottom: z.number().min(0).max(99999).optional().nullable(),
  targetRpe: z.number().min(0).max(100).optional().nullable(),
  targetRpeHigh: z.number().min(0).max(100).optional().nullable(),
  notes: z.string().min(0).max(280).optional().nullable(),
  isEstimatedOnerm: z.boolean().optional().nullable(),
  estimatedOnermIndex: z.number().min(0).max(100).optional().nullable(),
  weightType: z.string().min(0).max(280).optional().nullable(),
  repUnit: z.string().min(0).max(55).optional().nullable(),
  htmlLink: z.string().min(0).max(280).optional().nullable(),
  isSS: z.boolean().optional().nullable(),
  ss: z.array(ssSchema).optional().nullable(),
  tempoDown: z.number().min(0).max(99999).optional().nullable(),
  tempoPause: z.number().min(0).max(99999).optional().nullable(),
  tempoUp: z.number().min(0).max(99999).optional().nullable(),
  restTime: z.number().min(0).max(99999).optional().nullable(),
  restUnit: z.string().min(0).max(55).optional().nullable(),
  isTemplate: z.boolean().optional().nullable(),
  trainerId: z.string().optional().nullable(),
})
export const daySchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(0).max(280).optional().nullable(),
  isRestDay: z.boolean(),
  warmupTemplateId: z.string(),
  exercise: z.array(exerciseSchema),
  isTemplate: z.boolean().optional().nullable(),
})
export const weekSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(0).max(280).optional().nullable(),
  isTemplate: z.boolean().optional().nullable(),
  day: z.array(daySchema),
})
export const blockSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(1).max(280),
  isProgram: z.boolean(),
  week: z.array(weekSchema),
})

import { z } from 'zod'

import { createTRPCRouter, privateProcedure } from '~/server/api/trpc'

const table = [
  [20, 7.5, 12.5, 15, 17.5, 17.5],
  [22, 10, 12.5, 15, 17.5, 20],
  [31, 12.5, 17.5, 22.5, 25, 27.5],
  [34, 12.5, 20, 22.5, 27.5, 30],
  [36, 15, 20, 25, 30, 32.5],
  [38, 15, 22.5, 27.5, 30, 35],
  [40, 15, 22.5, 27.5, 32.5, 37.5],
  [43, 17.5, 25, 30, 35, 40],
  [45, 17.5, 25, 30, 37.5, 40],
  [47, 17.5, 27.5, 32.5, 37.5, 42.5],
  [49, 20, 27.5, 35, 40, 45],
  [52, 20, 30, 35, 42.5, 47.5],
  [54, 22.5, 30, 37.5, 42.5, 50],
  [56, 22.5, 32.5, 37.5, 45, 52.5],
  [58, 22.5, 32.5, 40, 47.5, 52.5],
  [61, 25, 35, 42.5, 50, 55],
  [63, 25, 37.5, 42.5, 50, 57.5],
  [65, 25, 37.5, 45, 52.5, 60],
  [68, 27.5, 40, 47.5, 55, 60],
  [70, 27.5, 40, 47.5, 57.5, 62.5],
  [72, 27.5, 40, 50, 60, 65],
  [74, 30, 42.5, 50, 60, 67.5],
  [77, 30, 42.5, 52.5, 60, 70],
  [79, 32.5, 45, 55, 62.5, 72.5],
  [81, 32.5, 47.5, 55, 65, 72.5],
  [83, 32.5, 47.5, 57.5, 67.5, 75],
  [86, 35, 50, 60, 67.5, 77.5],
  [88, 35, 50, 60, 70, 80],
  [90, 37.5, 52.5, 60, 72.5, 82.5],
  [92, 37.5, 52.5, 62.5, 75, 85],
  [95, 37.5, 55, 65, 77.5, 85],
  [97, 37.5, 57.5, 65, 77.5, 87.5],
  [99, 37.5, 57.5, 67.5, 80, 90],
  [102, 40, 60, 70, 82.5, 92.5],
  [104, 40, 60, 70, 85, 92.5],
  [106, 40, 60, 72.5, 85, 95],
  [108, 42.5, 60, 75, 85, 97.5],
  [111, 42.5, 62.5, 75, 87.5, 100],
  [113, 45, 65, 77.5, 90, 102.5],
  [115, 42.5, 60, 80, 92.5, 107.5],
  [117, 45, 60, 82.5, 95, 110],
  [120, 45, 62.5, 85, 97.5, 110],
  [122, 47.5, 62.5, 85, 100, 112.5],
  [124, 47.5, 65, 85, 102.5, 115],
  [127, 47.5, 65, 87.5, 102.5, 117.5],
  [129, 50, 67.5, 87.5, 105, 120],
  [131, 50, 67.5, 90, 107.5, 122.5],
  [133, 50, 70, 92.5, 110, 125],
  [136, 52.5, 70, 92.5, 110, 127.5],
  [138, 52.5, 72.5, 95, 110, 130],
  [140, 55, 72.5, 97.5, 112.5, 132.5],
  [142, 55, 75, 97.5, 115, 135],
  [145, 55, 75, 100, 117.5, 135],
  [147, 57.5, 77.5, 102.5, 120, 135],
  [149, 57.5, 77.5, 105, 120, 137.5],
  [151, 57.5, 80, 105, 122.5, 140],
  [154, 60, 80, 107.5, 125, 142.5],
  [156, 60, 82.5, 110, 127.5, 145],
  [158, 52.5, 80, 105, 117.5, 132.5, 145],
  [161, 52.5, 82.5, 105, 120, 135, 147.5],
  [163, 55, 82.5, 107.5, 120, 135, 150],
  [165, 55, 85, 107.5, 122.5, 137.5, 152.5],
  [167, 55, 85, 110, 125, 137.5, 155],
  [170, 57.5, 85, 110, 127.5, 140, 157.5],
  [172, 57.5, 85, 110, 127.5, 142.5, 160],
  [174, 57.5, 87.5, 112.5, 130, 145, 160],
  [176, 60, 87.5, 115, 132.5, 147.5, 160],
  [179, 60, 90, 115, 132.5, 150, 162.5],
  [181, 60, 90, 117.5, 135, 150, 165],
  [183, 60, 92.5, 120, 135, 152.5, 167.5],
  [185, 60, 92.5, 120, 137.5, 155, 170],
  [188, 60, 95, 122.5, 137.5, 157.5, 172.5],
  [190, 62.5, 95, 125, 140, 160, 175],
  [192, 62.5, 97.5, 125, 142.5, 160, 177.5],
  [195, 62.5, 97.5, 127.5, 145, 160, 180],
  [197, 65, 100, 130, 145, 162.5, 182.5],
  [199, 65, 100, 130, 147.5, 165, 182.5],
  [201, 65, 102.5, 132.5, 150, 167.5, 182.5],
  [204, 67.5, 102.5, 135, 152.5, 170, 185],
  [206, 60, 92.5, 125, 150, 172.5, 187.5],
  [208, 60, 92.5, 125, 150, 172.5, 190],
  [210, 60, 95, 127.5, 152.5, 175, 192.5],
  [213, 60, 95, 127.5, 155, 177.5, 195],
  [215, 62.5, 97.5, 130, 155, 180, 197.5],
  [217, 62.5, 97.5, 132.5, 157.5, 182.5, 200],
  [219, 62.5, 100, 132.5, 160, 182.5, 202.5],
  [222, 62.5, 100, 135, 160, 182.5, 205],
  [224, 65, 102.5, 135, 160, 185, 207.5],
  [226, 65, 102.5, 135, 162.5, 187.5, 207.5],
  [229, 65, 102.5, 137.5, 165, 190, 207.5],
  [231, 67.5, 105, 137.5, 165, 192.5, 210],
  [233, 67.5, 105, 140, 167.5, 192.5, 212.5],
  [235, 67.5, 107.5, 140, 170, 195, 215],
  [238, 67.5, 107.5, 142.5, 172.5, 197.5, 217.5],
  [240, 70, 110, 145, 172.5, 200, 220],
  [242, 70, 110, 145, 175, 202.5, 222.5],
  [244, 70, 110, 147.5, 177.5, 205, 225],
  [247, 72.5, 110, 147.5, 177.5, 205, 227.5],
  [249, 72.5, 112.5, 150, 180, 207.5, 230],
  [251, 60, 112.5, 145, 177.5, 200, 220, 232.5],
  [254, 60, 112.5, 147.5, 177.5, 200, 220, 235],
  [256, 60, 115, 150, 180, 202.5, 222.5, 237.5],
  [258, 60, 115, 150, 182.5, 205, 225, 240],
  [260, 62.5, 117.5, 152.5, 182.5, 207.5, 227.5, 242.5],
  [263, 62.5, 117.5, 152.5, 182.5, 207.5, 230, 245],
  [265, 62.5, 120, 155, 185, 207.5, 232.5, 247.5],
  [267, 62.5, 120, 155, 187.5, 210, 232.5, 250],
  [269, 65, 122.5, 157.5, 187.5, 212.5, 235, 252.5],
  [272, 65, 122.5, 160, 190, 215, 235, 255],
  [274, 65, 122.5, 160, 192.5, 217.5, 237.5, 257.5],
  [276, 65, 125, 160, 192.5, 217.5, 240, 257.5],
  [278, 67.5, 125, 160, 195, 220, 242.5, 257.5],
  [281, 67.5, 127.5, 162.5, 197.5, 222.5, 245, 260],
  [283, 67.5, 127.5, 165, 200, 225, 247.5, 262.5],
  [285, 67.5, 130, 165, 200, 227.5, 250, 265],
  [288, 67.5, 130, 167.5, 202.5, 227.5, 250, 267.5],
  [290, 70, 132.5, 167.5, 205, 230, 252.5, 270],
  [292, 70, 132.5, 170, 205, 232.5, 255, 272.5],
  [294, 70, 135, 170, 207.5, 232.5, 257.5, 275],
  [297, 65, 97.5, 132.5, 160, 192.5, 227.5, 257.5, 277.5],
  [299, 65, 100, 132.5, 160, 195, 227.5, 260, 280],
  [301, 65, 100, 135, 162.5, 195, 230, 262.5, 280],
  [303, 65, 100, 135, 162.5, 197.5, 232.5, 265, 282.5],
  [306, 67.5, 102.5, 135, 165, 200, 232.5, 265, 285],
  [308, 67.5, 102.5, 135, 165, 200, 232.5, 267.5, 287.5],
  [310, 67.5, 102.5, 135, 167.5, 202.5, 235, 270, 290],
  [312, 67.5, 105, 137.5, 170, 205, 237.5, 272.5, 292.5],
  [315, 70, 105, 137.5, 170, 205, 240, 275, 295],
  [317, 70, 105, 140, 172.5, 207.5, 240, 277.5, 297.5],
  [319, 70, 107.5, 140, 172.5, 207.5, 242.5, 280, 300],
  [322, 70, 107.5, 140, 175, 207.5, 245, 280, 300],
  [324, 70, 107.5, 142.5, 175, 210, 247.5, 280, 302.5],
  [326, 72.5, 110, 142.5, 177.5, 212.5, 247.5, 282.5, 305],
  [328, 72.5, 110, 145, 177.5, 212.5, 250, 285, 305],
  [331, 72.5, 110, 145, 180, 215, 252.5, 287.5, 307.5],
  [333, 72.5, 110, 147.5, 180, 217.5, 255, 290, 310],
  [335, 75, 110, 147.5, 182.5, 217.5, 255, 292.5, 312.5],
  [337, 75, 110, 150, 182.5, 220, 257.5, 295, 315],
  [340, 75, 112.5, 150, 182.5, 222.5, 257.5, 297.5, 317.5],
  [342, 60, 102.5, 135, 175, 220, 255, 295, 317.5],
  [344, 60, 105, 137.5, 177.5, 220, 255, 297.5, 320],
  [346, 62.5, 105, 137.5, 177.5, 222.5, 257.5, 300, 322.5],
  [349, 62.5, 105, 140, 180, 225, 257.5, 300, 322.5],
  [351, 62.5, 107.5, 140, 180, 225, 260, 302.5, 325],
  [353, 62.5, 107.5, 140, 182.5, 227.5, 260, 305, 327.5],
  [356, 62.5, 107.5, 142.5, 182.5, 227.5, 262.5, 305, 330],
  [358, 62.5, 107.5, 142.5, 182.5, 230, 265, 307.5, 330],
  [360, 65, 110, 145, 182.5, 232.5, 267.5, 310, 332.5],
  [362, 65, 110, 145, 185, 232.5, 267.5, 312.5, 335],
  [365, 65, 110, 145, 185, 232.5, 270, 312.5, 337.5],
  [367, 65, 110, 147.5, 187.5, 235, 272.5, 315, 340],
  [369, 65, 110, 147.5, 187.5, 235, 275, 317.5, 342.5],
  [371, 67.5, 110, 150, 190, 237.5, 275, 320, 345],
  [374, 67.5, 112.5, 150, 190, 240, 277.5, 322.5, 347.5],
  [376, 67.5, 112.5, 150, 192.5, 240, 280, 325, 350],
  [378, 67.5, 112.5, 152.5, 192.5, 242.5, 280, 327.5, 350],
  [381, 67.5, 112.5, 152.5, 195, 245, 280, 327.5, 352.5],
  [383, 67.5, 115, 155, 195, 245, 282.5, 330, 355],
  [385, 70, 115, 155, 197.5, 247.5, 285, 330, 355],
]

const roundLift = (lift: number, percent: number) => {
  return Math.round((lift * percent) / 2.5) * 2.5
}
const lifts = (weight: number) => {
  return [
    roundLift(weight, 0.9) === roundLift(weight, 0.91) ? roundLift(weight, 0.9) - 2.5 : roundLift(weight, 0.9),
    roundLift(weight, 0.91),
    roundLift(weight, 0.92) === roundLift(weight, 0.91) ? roundLift(weight, 0.92) + 2.5 : roundLift(weight, 0.92),
    roundLift(weight, 0.95) === roundLift(weight, 0.96) ? roundLift(weight, 0.95) - 2.5 : roundLift(weight, 0.95),
    roundLift(weight, 0.96),
    roundLift(weight, 0.97) === roundLift(weight, 0.96) ? roundLift(weight, 0.97) + 2.5 : roundLift(weight, 0.97),
    roundLift(weight, 0.99) === roundLift(weight, 1) ? roundLift(weight, 0.99) - 2.5 : roundLift(weight, 0.99),
    roundLift(weight, 1),
    roundLift(weight, 1.02) === roundLift(weight, 1) ? roundLift(weight, 1.02) + 2.5 : roundLift(weight, 1.02),
  ]
}
const warmup = (opener: number, lift : string) => {
  const tableTarget = table.reduce((acc, curr, idx, array) => {
    if (array[idx + 1]) {
      if (curr[0] && opener >= curr?.[0] && opener < array[idx + 1]?.[0]) {
        acc = curr
      }
    }
    return acc
  }, table[table.length - 1])

  const reps: string[] = []
  const times: string[] = []

  const time = lift === 's' ? '09' : lift === 'b' ? '12' : '14'

  tableTarget?.slice(1).forEach((_, idx) => {
    const round = idx + 1

    if (round === 1) {
      opener < 91 ? reps.push('5-7') : reps.push('8-10')
      times.push(time + '00')
    }
    if (round === 2) {
      times.push(time + '05')
      if (opener < 91) {
        reps.push('3-5')
        return
      }
      if (opener < 182) {
        reps.push('4-7')
        return
      }
      if (opener < 273) {
        reps.push('5-8')
        return
      }
      reps.push('8')
    }
    if (round === 3) {
      times.push(time + '10')
      if (opener < 91) {
        reps.push('1')
        return
      }
      if (opener < 182) {
        reps.push('3')
        return
      }
      if (opener < 273) {
        reps.push('3-5')
        return
      }
      reps.push('5')
    }
    if (round === 4) {
      times.push(time + '15')
      if (opener < 114) {
        reps.push('1')
        return
      }
      if (opener < 273) {
        reps.push('2')
        return
      }
      reps.push('3')
    }
    if (round === 5) {
      times.push(time + '20')
      if (opener < 157) {
        reps.push('1')
      } else {
        reps.push('1-2')
      }
    }
    if (round === 6) {
      times.push(time + '25')
      reps.push('1')
    }
    if (round === 7) {
      times.push(time + '30')
      reps.push('1')
    }
    if (round === 8) {
      times.push(time + '35')
      reps.push('1')
    }
  })
  return {
    weight: tableTarget?.slice(1) || [],
    reps: reps || [],
    times: times || [],
  }
}

export const compPlanRouter = createTRPCRouter({
  get: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const plan = await ctx.prisma.compPlan.findFirst({
        where: { userId: input.userId },
        include: { value: true },
      })
      return plan
    }),
  complete: privateProcedure
    .input(
      z.object({
        id: z.string(),
        value: z.boolean(),
        isGood: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const value = await ctx.prisma.compPlanValue.update({
        where: {
          id: input.id,
        },
        data: {
          isComplete: input.value,
          isGoodLift: input?.isGood,
        },
      })
      return value
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        value: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const value = await ctx.prisma.compPlanValue.update({
        where: {
          id: input.id,
        },
        data: {
          value: input.value,
        },
      })
      return value
    }),
  deleteValue: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const value = await ctx.prisma.compPlanValue.update({
        where: {
          id: input.id,
        },
        data: {
          value: '',
          notes: '',
        },
      })
      return value
    }),
  updateNotes: privateProcedure
    .input(
      z.object({
        id: z.string(),
        notes: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const value = await ctx.prisma.compPlanValue.update({
        where: {
          id: input.id,
        },
        data: {
          notes: input.notes,
        },
      })
      return value
    }),
  updateTime: privateProcedure
    .input(
      z.object({
        id: z.string(),
        time: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const value = await ctx.prisma.compPlanValue.update({
        where: {
          id: input.id,
        },
        data: {
          time: input.time,
        },
      })
      return value
    }),
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.string(),
        userId: z.string(),
        squat: z.number(),
        bench: z.number(),
        deadlift: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input)

      const squats = lifts(input.squat)
      const benches = lifts(input.bench)
      const deadlifts = lifts(input.deadlift)
      const warmupSquats = warmup(squats[1] || 0, 's')
      const warmupBenches = warmup(benches[1] || 0, 'b')
      const warmupDeadlifts = warmup(deadlifts[1] || 0, 'd')

      await ctx.prisma.compPlan.deleteMany({
        where: {
          userId: input.userId,
        },
      })

      const plan = await ctx.prisma.compPlan.create({
        data: {
          name: input.name,
          date: input.date,
          userId: input.userId,
          value: {
            createMany: {
              data: [
                {
                  name: 's11',
                  value: squats[0]?.toString() || '',
                },
                {
                  name: 's12',
                  value: squats[0]?.toString() || '',
                },
                {
                  name: 's13',
                  value: squats[2]?.toString() || '',
                },
                {
                  name: 's21',
                  value: squats[3]?.toString() || '',
                },
                {
                  name: 's22',
                  value: squats[4]?.toString() || '',
                },
                {
                  name: 's23',
                  value: squats[5]?.toString() || '',
                },
                {
                  name: 's31',
                  value: squats[6]?.toString() || '',
                },
                {
                  name: 's32',
                  value: squats[7]?.toString() || '',
                },
                {
                  name: 's33',
                  value: squats[8]?.toString() || '',
                },
                {
                  name: 'b11',
                  value: benches[0]?.toString() || '',
                },
                {
                  name: 'b12',
                  value: benches[1]?.toString() || '',
                },
                {
                  name: 'b13',
                  value: benches[2]?.toString() || '',
                },
                {
                  name: 'b21',
                  value: benches[3]?.toString() || '',
                },
                {
                  name: 'b22',
                  value: benches[4]?.toString() || '',
                },
                {
                  name: 'b23',
                  value: benches[5]?.toString() || '',
                },
                {
                  name: 'b31',
                  value: benches[6]?.toString() || '',
                },
                {
                  name: 'b32',
                  value: benches[7]?.toString() || '',
                },
                {
                  name: 'b33',
                  value: benches[8]?.toString() || '',
                },
                {
                  name: 'd11',
                  value: deadlifts[0]?.toString() || '',
                },
                {
                  name: 'd12',
                  value: deadlifts[1]?.toString() || '',
                },
                {
                  name: 'd13',
                  value: deadlifts[2]?.toString() || '',
                },
                {
                  name: 'd21',
                  value: deadlifts[3]?.toString() || '',
                },
                {
                  name: 'd22',
                  value: deadlifts[4]?.toString() || '',
                },
                {
                  name: 'd23',
                  value: deadlifts[5]?.toString() || '',
                },
                {
                  name: 'd31',
                  value: deadlifts[6]?.toString() || '',
                },
                {
                  name: 'd32',
                  value: deadlifts[7]?.toString() || '',
                },
                {
                  name: 'd33',
                  value: deadlifts[8]?.toString() || '',
                },
                {
                  name: 'sw1',
                  value: warmupSquats.weight[0]?.toString() || '',
                  notes: warmupSquats.reps[0],
                  time: warmupSquats.times[0],
                },
                {
                  name: 'sw2',
                  value: warmupSquats.weight[1]?.toString() || '',
                  notes: warmupSquats.reps[1],
                  time: warmupSquats.times[1],
                },
                {
                  name: 'sw3',
                  value: warmupSquats.weight[2]?.toString() || '',
                  notes: warmupSquats.reps[2],
                  time: warmupSquats.times[2],
                },
                {
                  name: 'sw4',
                  value: warmupSquats.weight[3]?.toString() || '',
                  notes: warmupSquats.reps[3],
                  time: warmupSquats.times[3],
                },
                {
                  name: 'sw5',
                  value: warmupSquats.weight[4]?.toString() || '',
                  notes: warmupSquats.reps[4],
                  time: warmupSquats.times[4],
                },
                {
                  name: 'sw6',
                  value: warmupSquats.weight[5]?.toString() || '',
                  notes: warmupSquats.reps[5],
                  time: warmupSquats.times[5],
                },
                {
                  name: 'sw7',
                  value: warmupSquats.weight[6]?.toString() || '',
                  notes: warmupSquats.reps[6],
                  time: warmupSquats.times[6],
                },
                {
                  name: 'sw8',
                  value: warmupSquats.weight[7]?.toString() || '',
                  notes: warmupSquats.reps[7],
                  time: warmupSquats.times[7],
                },
                {
                  name: 'bw1',
                  value: warmupBenches.weight[0]?.toString() || '',
                  notes: warmupBenches.reps[0],
                  time: warmupBenches.times[0],
                },
                {
                  name: 'bw2',
                  value: warmupBenches.weight[1]?.toString() || '',
                  notes: warmupBenches.reps[1],
                  time: warmupBenches.times[1],
                },
                {
                  name: 'bw3',
                  value: warmupBenches.weight[2]?.toString() || '',
                  notes: warmupBenches.reps[2],
                  time: warmupBenches.times[2],
                },
                {
                  name: 'bw4',
                  value: warmupBenches.weight[3]?.toString() || '',
                  notes: warmupBenches.reps[3],
                  time: warmupBenches.times[3],
                },
                {
                  name: 'bw5',
                  value: warmupBenches.weight[4]?.toString() || '',
                  notes: warmupBenches.reps[4],
                  time: warmupBenches.times[4],
                },
                {
                  name: 'bw6',
                  value: warmupBenches.weight[5]?.toString() || '',
                  notes: warmupBenches.reps[5],
                  time: warmupBenches.times[5],
                },
                {
                  name: 'bw7',
                  value: warmupBenches.weight[6]?.toString() || '',
                  notes: warmupBenches.reps[6],
                  time: warmupBenches.times[6],
                },
                {
                  name: 'bw8',
                  value: warmupBenches.weight[7]?.toString() || '',
                  notes: warmupBenches.reps[7],
                  time: warmupBenches.times[7],
                },
                {
                  name: 'dw1',
                  value: warmupDeadlifts.weight[0]?.toString() || '',
                  notes: warmupDeadlifts.reps[0],
                  time: warmupDeadlifts.times[0],
                },
                {
                  name: 'dw2',
                  value: warmupDeadlifts.weight[1]?.toString() || '',
                  notes: warmupDeadlifts.reps[1],
                  time: warmupDeadlifts.times[1],
                },
                {
                  name: 'dw3',
                  value: warmupDeadlifts.weight[2]?.toString() || '',
                  notes: warmupDeadlifts.reps[2],
                  time: warmupDeadlifts.times[2],
                },
                {
                  name: 'dw4',
                  value: warmupDeadlifts.weight[3]?.toString() || '',
                  notes: warmupDeadlifts.reps[3],
                  time: warmupDeadlifts.times[3],
                },
                {
                  name: 'dw5',
                  value: warmupDeadlifts.weight[4]?.toString() || '',
                  notes: warmupDeadlifts.reps[4],
                  time: warmupDeadlifts.times[4],
                },
                {
                  name: 'dw6',
                  value: warmupDeadlifts.weight[5]?.toString() || '',
                  notes: warmupDeadlifts.reps[5],
                  time: warmupDeadlifts.times[5],
                },
                {
                  name: 'dw7',
                  value: warmupDeadlifts.weight[6]?.toString() || '',
                  notes: warmupDeadlifts.reps[6],
                  time: warmupDeadlifts.times[6],
                },
                {
                  name: 'dw8',
                  value: warmupDeadlifts.weight[7]?.toString() || '',
                  notes: warmupDeadlifts.reps[7],
                  time: warmupDeadlifts.times[7],
                },
              ],
            },
          },
        },
      })

      return plan
    }),

  delete: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const compDate = await ctx.prisma.compPlan.deleteMany({
        where: {
          userId: input.userId,
        },
      })
      return compDate
    }),
})

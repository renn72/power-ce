import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const res = await clerkClient.users.getUserList()
    type Users = typeof res
    const users: { users: Users, admins: Users, } = {
      users: [],
      admins: [],
    }
    users.users = res
      .filter((user) => user.emailAddresses
        .filter((email) => email.emailAddress !== 'ren@warner.systems' && email.emailAddress !== 'mitchlee021@gmail.com').length > 0
      )
    users.admins = res
      .filter((user) => user.emailAddresses
        .filter((email) => email.emailAddress === 'ren@warner.systems' || email.emailAddress === 'mitchlee021@gmail.com').length > 0
      )
    console.log(users);

    return users
  }),
})

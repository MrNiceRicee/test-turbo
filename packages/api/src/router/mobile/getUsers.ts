import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const mobileRouter = router({
  getUsers: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(100) }))
    .query(({ ctx }) => {
      // the logic to get users from the database
      return [
        {
          id: "1",
          name: "John Doe",
        },
        {
          id: "2",
          name: "Jane Doe",
        },
      ];
    }),
});

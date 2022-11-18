import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { mobileRouter } from "./mobile/getUsers";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  mobile: mobileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

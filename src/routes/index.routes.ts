import { Router } from "express";
import { postRouter } from "./post.routes";
import { userRouter } from "./user.routes";

export const router = Router()

router.use("/posts", postRouter)
router.use("/users", userRouter)
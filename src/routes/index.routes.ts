import { Router } from "express";
import { postRouter } from "./post.routes";
import { userRouter } from "./user.routes";
import { commentRouter } from "./comment.routes";

export const router = Router()

router.use("/posts", postRouter)
router.use("/users", userRouter)
router.use("/posts/comments", commentRouter)
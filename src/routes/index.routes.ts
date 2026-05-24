import { Router } from "express";
import { postRouter } from "./post.routes";
import { userRouter } from "./user.routes";
import { commentRouter } from "./comment.routes";
import { mailRouter } from "./mail.routes";
import { likesRouter } from "./likes.routes";

export const router = Router()

router.use("/posts", postRouter)
router.use("/users", userRouter)
router.use("/mail", mailRouter)
router.use("/posts/comments", commentRouter)
router.use("/posts", likesRouter)

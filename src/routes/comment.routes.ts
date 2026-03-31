import { CommentController } from "../controllers/comment.controller";
import { Router } from "express";
import { authHandler } from "../middlewares/authHandler";

export const commentRouter = Router()

commentRouter.get("/", authHandler, CommentController.showComments)
commentRouter.post("/", authHandler, CommentController.createComment)
commentRouter.put("/:id", authHandler, CommentController.updateComment)
commentRouter.delete("/:id", authHandler, CommentController.deleteComment)
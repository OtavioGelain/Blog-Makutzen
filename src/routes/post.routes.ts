import { CommentController } from "../controllers/comment.controller";
import { PostController } from "../controllers/post.controller";
import { Router } from "express";
import { authHandler } from "../middlewares/authHandler";

export const postRouter = Router()

postRouter.get("/search/title", authHandler, PostController.showPostByTitle)
postRouter.get("/", authHandler, PostController.showPosts)
postRouter.get("/:id", authHandler, PostController.showPostById)
postRouter.post("/", authHandler, PostController.createPost)
postRouter.put("/:id", authHandler, PostController.updatePost)
postRouter.delete("/:id", authHandler, PostController.deletePost)
postRouter.post("/:id/comments", authHandler, CommentController.createComment)
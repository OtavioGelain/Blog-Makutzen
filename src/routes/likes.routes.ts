import { Router } from "express";
import { LikeController } from "../controllers/likes.controller";

export const likesRouter = Router();

likesRouter.post("/:postId/like", LikeController.likePost);

likesRouter.delete("/:postId/like", LikeController.unlikePost);

likesRouter.get("/:postId/likes", LikeController.countLikes);

likesRouter.get("/:postId/liked", LikeController.userLiked);


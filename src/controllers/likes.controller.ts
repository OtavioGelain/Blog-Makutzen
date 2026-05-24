import { Request, Response } from "express";
import { LikeService } from "../services/like.service";

export class LikeController {

    static async likePost(req: Request, res: Response) {
        try {

            const { postId } = req.params;
            const { userId } = req.body;

            const result = await LikeService.likePost(
                Number(postId),
                Number(userId)
            );

            return res.status(201).json(result);

        } catch (error: any) {

            return res.status(400).json({
                error: error.message
            });

        }
    }

    static async unlikePost(req: Request, res: Response) {
        try {

            const { postId } = req.params;
            const { userId } = req.body;

            const result = await LikeService.unlikePost(
                Number(postId),
                Number(userId)
            );

            return res.status(200).json(result);

        } catch (error: any) {

            return res.status(400).json({
                error: error.message
            });

        }
    }

    static async countLikes(req: Request, res: Response) {
        try {

            const { postId } = req.params;

            const result = await LikeService.countLikes(
                Number(postId)
            );

            return res.status(200).json(result);

        } catch (error: any) {

            return res.status(400).json({
                error: error.message
            });

        }
    }

    static async userLiked(req: Request, res: Response) {
        try {

            const { postId } = req.params;
            const { userId } = req.body;

            const result = await LikeService.userLiked(
                Number(postId),
                Number(userId)
            );

            return res.status(200).json(result);

        } catch (error: any) {

            return res.status(400).json({
                error: error.message
            });

        }
    }
}
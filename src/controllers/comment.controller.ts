import { Request, Response } from "express";
import { CommentService } from "../services/comment.service";

export class CommentController{
    static async createComment(req: Request, res: Response): Promise<Response>{
        try{
            const postId = Number(req.params.id)
            const userId = (req as any).user.id
            const {text} = req.body
            if(!userId){
                throw new Error("User not authenticated")
            }
            const comment = await CommentService.createComment({ text, userId, postId })
            return res.status(200).json(comment)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async showComments(req: Request, res: Response): Promise<Response>{
        try{
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10

            const comments = await CommentService.showComments(page, limit)
            return res.status(200).json(comments)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async updateComment(req: Request, res: Response):Promise<Response>{
        try{
            const id = Number(req.params.id)
            const comment = await CommentService.updateComment(id, req.body)
            if(!id){
                return res.status(404).json({message: "Comment not found"})
            }
            return res.status(200).json(comment)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async deleteComment(req: Request, res: Response): Promise<Response>{
        try{
            const id = Number(req.params.id)
            const comment = await CommentService.deleteComment(id)
            if(!id){
                return res.status(404).json({message: "Comment not found"})
            }
            return res.status(200).json(comment)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
}
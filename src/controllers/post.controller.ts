import { PostService } from "../services/post.service";
import { Request, Response } from 'express'

export class PostController{
    static async createPost(req: Request, res: Response): Promise<Response>{
        try{
            const post = await PostService.createPost(req.body)
            return res.status(200).json({message: "Post created"})
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async showPosts(req: Request, res: Response): Promise<Response>{
        try{
            const posts = await PostService.showPosts()
            return res.status(200).json(posts)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    } static async showPostByTitle(req: Request, res: Response): Promise<Response>{
        try{
            const posts = await PostService.showPostByTitle(req.body)
            if(!posts){
                return res.status(404).json({message: "Post not found"})
            }
            return res.status(200).json(posts)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
}
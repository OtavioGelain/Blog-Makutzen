import { PostService } from "../services/post.service";
import { Request, Response } from 'express'

export class PostController{
    static async createPost(req: Request, res: Response): Promise<Response>{
        try{
            const post = await PostService.createPost(req.body, (req as any).user.id)
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
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10
            
            const result = await PostService.showPosts(page, limit)
            return res.status(200).json(result)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    } static async showPostByTitle(req: Request, res: Response): Promise<Response>{
        try{
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10
            const title = req.query.title ? String(req.query.title) : ""

            const result = await PostService.showPostByTitle(title, page, limit)
            return res.status(200).json(result)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    
    static async updatePost(req: Request, res: Response): Promise<Response>{
        try{
            const id = Number(req.params.id)
            const post = await PostService.updatePost(id, req.body)
            if(!id){
                return res.status(404).json({message: "Post not found"})
            }
            return res.status(200).json(post)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async deletePost(req: Request, res: Response): Promise<Response>{
        try{
            const id = Number(req.params.id)
            const post = await PostService.deletePost(id)
            if(!id){
                return res.status(404).json({message: "Post not found"})
            }
            return res.status(200).json(post)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
}
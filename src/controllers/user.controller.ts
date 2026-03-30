import { UserService } from "../services/user.service";
import { Request, Response } from "express";

export class UserController{
    static async createUser(req: Request, res: Response): Promise<Response>{
        try{
            const user = await UserService.createUser(req.body)
            return res.status(200).json({message: "User created", user})
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async showUsers(req: Request, res: Response): Promise<Response>{
        try{
            const user = await UserService.showUser()
            return res.status(200).json(user)
        }catch(error){
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async showUserById(req: Request, res: Response): Promise<Response>{
        try{
            const id = Number(req.params.id)
            const user = await UserService.showUserById(id)
            if(!id){
                return res.status(404).json({message: "Internal server error"})
            }
            return res.status(200).json(user)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async showUserByUsername(req: Request, res: Response): Promise<Response>{
        try{
            const { username } = req.query
            const user = await UserService.showUserByUsername(String(username))
            if(!user){
                return res.status(404).json({message: "Username not found"})
            }
            return res.status(200).json(user)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async showUserByName(req: Request, res: Response): Promise<Response>{
        try{
            const {name} = req.query
            const user = await UserService.showUserByName(String(name))
            if(!user){
                return res.status(404).json({message: "Name not found"})
            }
            return res.status(200).json(user)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async updateUser(req: Request, res: Response): Promise<Response>{
        try{
            const id = Number(req.params.id)
            if(!id){
                return res.status(404).json({message: "User not found"})
            }
            const user = await UserService.updateUser(id, req.body)
            return res.status(200).json(user)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async deleteUser(req: Request, res: Response): Promise<Response>{
        try{
            const id = Number(req.params.id)
            if(!id){
                return res.status(404).json({message: "User not found"})
            }
            const user = await UserService.deleteUser(id)
            return res.status(200).json(user)
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message: error.message})
            }
            return res.status(500).json({message: "Internal server error"})
        }
    }
    static async login(req: Request, res: Response): Promise<Response>{
        try{
            const {username, password} = req.body
            const userWithToken = await UserService.login(username, password)

            return res.status(200).json({message: "Login successful", userWithToken})
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
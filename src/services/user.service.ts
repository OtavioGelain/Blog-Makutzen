import { User } from "../entities/User";
import { AppDataSource } from "../database/DataSource";
import { hashedpassword } from "../utils/encryptHash";
import { ILike } from "typeorm";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken";
import { commentRepository } from "./comment.service";
import { Comment } from "../entities/Comment";
import { Post } from "../entities/Post";
import { postRepository } from "./post.service";

export const userRepository = AppDataSource.getRepository(User)

export class UserService{
    static async createUser(userData: Partial<User>): Promise<User>{
        const hashedPassword = await hashedpassword(userData.password!)
        const user = userRepository.create({...userData, password: hashedPassword})
        if(!user.name || !user.password || !user.username || !user.email){
            throw new Error('All fields are mandatory')
        }
        await userRepository.save(user)
        return user
    }
    static async showUser(page: number = 1, limit: number = 10): Promise<User[]>{
        const [users, total] = await userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: "DESC"
            }
        })
        return users
    }
    static async showUserById(id: number): Promise<User>{
        const user = await userRepository.findOne({ 
            where: { id },
            relations: ["posts", "comments"]
         })
        if(!user){
            throw new Error('User not found')
        }
        return user
    }
    static async showCommentsByUserId(id: number, page: number = 1, limit: number = 10): Promise<Comment[]>{
        const commentsByUser = await commentRepository.find({
            where: {
                user: { id }
            },
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: "ASC"
            }
        })
        return commentsByUser
    }
    static async showPostsByUserId(id: number, page: number = 1, limit: number = 10): Promise<Post[]>{
        const postsByUser = await postRepository.find({
            where: {
                user: { id }
            },
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: "ASC"
            }
        })
        return postsByUser
    }
    static async showUserByUsername(username: string): Promise<User>{
        const user = await userRepository.findOneBy({ username })
        if(!user){
            throw new Error('Username not found')
        }
        return user
    }
    static async showUserByName(name: string, page: number = 1, limit: number = 10): Promise<User[]>{
        const user = await userRepository.find({
            where: {
                name: ILike(`%${name}%`),
            },
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: "DESC"
            }
        })
        return user
    }
    static async updateUser(id: number, userData: Partial<User>): Promise<User>{
        const user = await userRepository.findOneBy({ id })
        if(!user){
            throw new Error('User not found')
        }
        userRepository.merge(user, userData)
        await userRepository.save(user)
        return user
    }
    static async deleteUser(id: number): Promise<User>{
        const user = await userRepository.findOneBy({ id })
        if(!user){
            throw new Error('User not found')
        }
        userRepository.remove(user)
        return user
    }
    static async login(username: string, password: string): Promise<{token: string, user: Partial<User>}>{
        const user = await userRepository.findOneBy({ username })
        if(!user){
            throw new Error("Username not found")
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if(!passwordValid){
            throw new Error("Incorrect password")
        }
        const token = generateToken(user)
        return { 
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        } 
    }
}
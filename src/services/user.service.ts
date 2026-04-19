import { User } from "../entities/User";
import { AppDataSource } from "../database/DataSource";
import { hashedpassword } from "../utils/encryptHash";
import { ILike } from "typeorm";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken";

export const userRepository = AppDataSource.getRepository(User)

export class UserService{
    static async createUser(userData: Partial<User>): Promise<User>{
        const hashedPassword = await hashedpassword(userData.password!)
        const user = userRepository.create({...userData, password: hashedPassword})
        if(!user.name || !user.password || !user.username){
            throw new Error('All fields are mandatory')
        }
        await userRepository.save(user)
        return user
    }
    static async showUser(): Promise<User[]>{
        const users = await userRepository.find()
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
    static async showUserByUsername(username: string): Promise<User>{
        const user = await userRepository.findOneBy({ username })
        if(!user){
            throw new Error('Username not found')
        }
        return user
    }
    static async showUserByName(name: string): Promise<User[]>{
        const user = await userRepository.find({
            where: {
                name: ILike(`%${name}%`)
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
    static async login(username: string, password: string): Promise<User & {token: string}>{
        const user = await userRepository.findOneBy({ username })
        if(!user){
            throw new Error("Username not found")
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if(!passwordValid){
            throw new Error("Incorrect password")
        }
        const token = generateToken(user)
        return {...user, token}
    }
}
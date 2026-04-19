import { Post } from "../entities/Post";
import { AppDataSource } from "../database/DataSource";
import { ILike, Like } from "typeorm";
import { userRepository } from "./user.service";

export const postRepository = AppDataSource.getRepository(Post)

export class PostService{
    static async createPost(postData: Partial<Post>, userid: number): Promise<Post>{
        const user = await userRepository.findOneBy({id: userid})
        const post = postRepository.create({...postData, user: user!})
        if(!postData.title){
            throw new Error('Titile is mandatory')
        }   
        await postRepository.save(post)
        return post
    }
    static async showPosts(page: number = 1, limit: number = 10){
        const [posts, total] = await postRepository.findAndCount({
            relations: ["user"],
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: "DESC"
            }
        })  
        const lastPage = Math.ceil(total / limit)

        return {
            data: posts,
            total,
            page,
            lastPage,
            hasNextPage: page < lastPage,
            hasPreviousPage: page > 1
        }
    }
    static async showPostById(id: number): Promise<Post>{
        const post = await postRepository.findOne({ 
            where: { id },
            relations: ["user", "comments.user"]
         })
        if(!post){
            throw new Error('Post not found')
        }
        return post
    }
    
    static async showPostByTitle(title: string, page: number = 1, limit: number = 10){
        const [posts, total] = await postRepository.findAndCount({
            where: {
                title: ILike(`%${title}%`)
            },
            skip: (page - 1) * limit,
            take: limit,
            order: {
                id: "DESC"
            }
        })
        const lastPage = Math.ceil(total / limit) 
        
        return {
            data: posts,
            total,
            page,
            lastPage,
            hasNextPgae: page < lastPage,
            hasPreviousPage: page > 1
        }
    }
    static async updatePost(id: number, postData: Partial<Post>): Promise<Post>{
        const post = await postRepository.findOneBy({ id })
        if(!post){
            throw new Error('Post not found')
        }
        postRepository.merge(post, postData)
        await postRepository.save(post)
        return post
    }
    static async deletePost(id: number): Promise<Post>{
        const post = await postRepository.findOneBy({ id })
        if(!post){
            throw new Error('Post not found')
        }
        postRepository.remove(post)
        return post
    }
}
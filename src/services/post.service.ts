import { Post } from "../entities/Post";
import { AppDataSource } from "../database/DataSource";
import { ILike } from "typeorm";

const postRepository = AppDataSource.getRepository(Post)

export class PostService{
    static async createPost(postData: Partial<Post>): Promise<Post>{
        const post = postRepository.create({...postData})
        if(!postData.title){
            throw new Error('Titile is mandatory')
        }   
        await postRepository.save(post)
        return post
    }
    static async showPosts(): Promise<Post[]>{
        const posts = await postRepository.find()
        return posts
    }
    static async showPostById(id: number): Promise<Post | null>{
        const post = await postRepository.findOneBy({ id })
        if(!post){
            throw new Error('Post not found')
        }
        return post
    }
    static async showPostByTitle(title: string): Promise<Post[]>{
        const post = await postRepository.find({
            where: {
                title: ILike(`%${title}%`)
            }
        })
        return post
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
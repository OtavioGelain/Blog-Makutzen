import { AppDataSource } from "../database/DataSource";
import { Comment } from "../entities/Comment";

const commentRepository = AppDataSource.getRepository(Comment)

export class CommentService{
    static async createComment({ text, userId, postId }: { text: string; userId: number; postId: number }): Promise<Comment>{
        const comment = commentRepository.create({ text, user: { id: userId }, post: { id: postId }, createdAt: new Date() })
        if(!comment.text){
            throw new Error("Need text")
        }
        await commentRepository.save(comment)
        return comment
    }
    static async showComments(page: number = 1, limit: number = 10){
        const [comments, total] = await commentRepository.findAndCount({
            skip: (page -1) * limit,
            take: limit,
            order: {
                id: "DESC"
            }
        })    
        const lastPage = Math.ceil(total / limit)

        return {
            data: comments,
            total,
            page,
            lastPage,
            hasNextPage: page < lastPage,
            hasPreviousPage: page > 1
        }
    }
    static async updateComment(id: number, commentData: Partial<Comment>): Promise<Comment>{
        const comment = await commentRepository.findOneBy({ id })
        if(!comment){
            throw new Error("Comment not fouond")
        }
        commentRepository.merge(comment, commentData)
        await commentRepository.save(comment)
        return comment
    }
    
    static async deleteComment(id: number): Promise<Comment>{
        const comment = await commentRepository.findOneBy({ id })
        if(!comment){
            throw new Error("Comment not found")
        }
        commentRepository.remove(comment)
        return comment
    }
}
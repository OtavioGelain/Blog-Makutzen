import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, RelationId } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, user => user.comments)
    user: User

    @ManyToOne(() => Post, post => post.comments)
    post: Post

    @RelationId((comment: Comment) => comment.post)
    postId: number
}
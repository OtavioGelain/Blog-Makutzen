import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @Column()
    createdAt: Date

    @ManyToOne(() => User, user => user.comments)
    user: User

    @ManyToOne(() => Post, post => post.comments)
    post: Post
}
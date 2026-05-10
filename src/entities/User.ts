import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Like } from "./Likes";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    email: string
    
    @Column({ nullable: true })
    profileUrl: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];
    
}
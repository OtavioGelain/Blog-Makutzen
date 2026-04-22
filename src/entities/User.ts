import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";

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
    
    @Column({ nullable: true })
    profileUrl: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]
    
}
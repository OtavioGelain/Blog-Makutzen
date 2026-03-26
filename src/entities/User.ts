import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

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
    
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
    
}
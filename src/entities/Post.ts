import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm'
import { User } from './User'
import { Comment } from './Comment'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, user => user.posts)
    user: User

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]
}

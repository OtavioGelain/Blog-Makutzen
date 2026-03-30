import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
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

    @ManyToOne(() => User, user => user.posts)
    user: User

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]
}

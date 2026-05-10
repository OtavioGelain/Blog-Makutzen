import { AppDataSource } from "../database/DataSource";
import { Like } from "../entities/Likes";
import { postRepository } from "./post.service";
import { userRepository } from "./user.service";

const likeRepository = AppDataSource.getRepository(Like)

export class LikeService {

    static async likePost(postId: number, userId: number) {

        const post = await postRepository.findOneBy({
            id: postId
        });

        if (!post) {
            throw new Error("Post not found");
        }

        const user = await userRepository.findOneBy({
            id: userId
        });

        if (!user) {
            throw new Error("User not found");
        }

        const alreadyLiked = await likeRepository.findOne({
            where: {
                user: {
                    id: userId
                },
                post: {
                    id: postId
                }
            },
            relations: {
                user: true,
                post: true
            }
        });

        if (alreadyLiked) {
            throw new Error("Você já curtiu esse post");
        }

        const like = likeRepository.create({
            user,
            post
        });

        await likeRepository.save(like);

        return {
            message: "Post curtido com sucesso"
        };
    }

    static async unlikePost(postId: number, userId: number) {

        const like = await likeRepository.findOne({
            where: {
                user: {
                    id: userId
                },
                post: {
                    id: postId
                }
            },
            relations: {
                user: true,
                post: true
            }
        });

        if (!like) {
            throw new Error("Like not found");
        }

        await likeRepository.remove(like);

        return {
            message: "Like removido com sucesso"
        };
    }

    static async countLikes(postId: number) {

        const count = await likeRepository.count({
            where: {
                post: {
                    id: postId
                }
            }
        });

        return {
            likes: count
        };
    }

    static async userLiked(postId: number, userId: number) {

        const liked = await likeRepository.exists({
            where: {
                user: {
                    id: userId
                },
                post: {
                    id: postId
                }
            }
        });

        return {
            liked
        };
    }
}
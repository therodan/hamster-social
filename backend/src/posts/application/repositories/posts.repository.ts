import { IPost } from '../../core/model';
export { IPost };

export interface IPostsRepository {
    getAll(): Promise<IPost[]>;
    createPost(post: IPost): Promise<number>;
    likePost(postId: number, userId: number): Promise<void>;
    unlikePost(postId: number, userId: number): Promise<void>;
}

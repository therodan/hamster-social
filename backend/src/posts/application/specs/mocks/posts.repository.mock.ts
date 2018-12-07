import { IPostsRepository, IPost } from '../../repositories/posts.repository';

export class PostsRepositoryMock implements IPostsRepository {
    getAll(): Promise<IPost[]> {
        throw new Error('Method not implemented.');
    }
    createPost(post: IPost): Promise<number> {
        throw new Error('Method not implemented.');
    }
    likePost(postId: number, userId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    unlikePost(postId: number, userId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

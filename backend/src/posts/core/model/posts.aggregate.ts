import { IPost } from './entities';

/**
 * Posts Aggregate
 *
 * Manage posts and likes
 */
export class PostsAggregate {
    constructor(protected _posts: IPost[]) {}

    /**
     * Get a list of posts
     */
    getPosts() {
        return this._posts;
    }

    /**
     * Toggle liking a post
     * @param postId number - ID of post
     * @param userId number - ID of user liking the post
     * @returns boolean - whether the post is liked or unliked
     */
    toggleLikePost(postId: number, userId: number): boolean {
        throw new Error('Not implemented');
    }

    /**
     * Create a Post
     * @param content string - Content of the post
     * @param userId number - User ID of user creating the post
     */
    createPost(content: string, userId: number): IPost {
        throw new Error('Not implemented');
    }
}

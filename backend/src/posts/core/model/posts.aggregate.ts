import * as sanitizeHtml from 'sanitize-html';

import { IPost } from './entities';

/**
 * Posts Aggregate
 *
 * Manage posts and likes
 */
export class PostsAggregate {
    protected _posts: IPost[] = [];

    constructor(posts: IPost[]) {
        this._posts = posts;
    }

    /**
     * Get a list of posts
     */
    getPosts(): IPost[] {
        return this._posts;
    }

    /**
     * Get a single post
     * @param id number - Post ID
     */
    getPost(id: number): IPost {
        // Find post if exists
        const postIndex = this._posts.findIndex(post => post.id === id);

        if (postIndex === -1) {
            return null;
        }
        else {
            return this._posts[postIndex];
        }
    }

    /**
     * Toggle liking a post
     * @param postId number - ID of post
     * @param userId number - ID of user liking the post
     * @returns boolean - whether the post is liked or unliked
     */
    toggleLikePost(postId: number, userId: number): boolean {
        // Get post
        const post = this.getPost(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        // Check if same user
        else if (post.user_id === userId) {
            throw new Error('You cannot like your own post');
        }

        // Check if currently liked
        const isLiked = post.likes.indexOf(userId);
        if (isLiked === -1) {
            // Like Post
            post.likes.push(userId);

            return true;
        }
        else {
            // Unlike Post
            post.likes.splice(isLiked, 1);

            return false;
        }
    }

    /**
     * Create a Post
     * @param content string - Content of the post
     * @param userId number - User ID of user creating the post
     */
    createPost(content: string, userId: number): IPost {
        if (!userId) {
            throw new Error('Please log in first');
        }
        else if (content.length === 0) {
            throw new Error('Please include some content');
        }

        const post: IPost = {
            id: null,
            date: new Date().toISOString(),
            content: sanitizeHtml(content), // Sanitize HTML for safety
            user_id: userId,
            likes: []
        };
        this._posts.push(post);

        return post;
    }
}

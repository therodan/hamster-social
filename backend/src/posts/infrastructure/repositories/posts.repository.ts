import { IPostsRepository, IPost } from '../../application/repositories/posts.repository';
import { IDatabaseAdapter, queryResult } from '../../../shared/infrastructure';

/**
 * Posts Repository
 */
export class PostsRepository implements IPostsRepository {
    constructor(private db: IDatabaseAdapter) {}

    /**
     * Get all posts from database
     */
    getAll(): Promise<IPost[]> {
        return new Promise((resolve, reject) => {
            // Get list of all posts
            this.db.get(`SELECT id, user_id, date, content FROM posts`).then(posts => {
                const promises = [];

                // Loop through posts to get likes from likes table
                posts.forEach(post => {
                    // Save to promise array for execution all at once later
                    promises.push(new Promise((res, rej) => {
                        // Get likes for post
                        this.db.get(`SELECT user_id FROM likes WHERE post_id = $/postId/`, { postId: post.id }).then(results => {
                            // Map the user IDs Array<number>
                            const likes = results.map(result => result.user_id);

                            // Assign likes to post
                            post.likes = likes;

                            // Resolve post
                            return res(post);
                        }, err => {
                            return rej(err);
                        });
                    }));
                });

                // Execute promises to get likes
                Promise.all(promises).then(results => {
                    // Return results (posts)
                    return resolve(results);
                }, err => {
                    return reject(err);
                });
            }, err => {
                return reject(err);
            });
        });
    }

    /**
     * Create a new Post
     */
    createPost(post: IPost): Promise<number> {
        return this.db.execute(`INSERT INTO posts (user_id, content, date) VALUES ($/userId/, $/content/, $/date/) RETURNING id`, {
            userId: post.user_id,
            content: post.content,
            date: post.date
        }, queryResult.one).then(data => {
            return +data.id;
        });
    }

    /**
     * Like a Post (create)
     * @param postId number - Post ID
     * @param userId number - User ID
     */
    likePost(postId: number, userId: number): Promise<void> {
        return this.db.execute(`INSERT INTO likes (post_id, user_id) VALUES ($/postId/, $/userId/)`, {
            postId,
            userId
        });
    }

    /**
     * Unlike a Post (delete)
     * @param postId number - Post ID
     * @param userId number - User ID
     */
    unlikePost(postId: number, userId: number): Promise<void> {
        return this.db.execute(`DELETE FROM likes WHERE post_id = $/postId/ AND user_id = $/userId/`, {
            postId,
            userId
        });
    }
}

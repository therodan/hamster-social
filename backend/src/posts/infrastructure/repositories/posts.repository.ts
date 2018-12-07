import { IPostsRepository, IPost } from '../../application/repositories/posts.repository';
import { IDatabaseAdapter, queryResult } from '../../../shared/infrastructure';

export class PostsRepository implements IPostsRepository {
    constructor(private db: IDatabaseAdapter) {}

    getAll(): Promise<IPost[]> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT id, user_id, content FROM posts`).then(posts => {
                const promises = [];

                posts.forEach(post => {
                    promises.push(this.db.get(`SELECT user_id FROM likes WHERE post_id = ?`, post.id).then(results => {
                        return results.map(result => result.user_id);
                    }));
                });

                Promise.all(promises).then(results => {
                    return resolve(results);
                }, err => {
                    return reject(err);
                });
            }, err => {
                return reject(err);
            });
        });
    }

    createPost(post: IPost): Promise<number> {
        return this.db.execute(`INSERT INTO posts VALUES ($/userId/, $/content/) RETURNING id`, {
            userId: post.user_id,
            content: post.content
        }, queryResult.one).then(data => {
            return +data.id;
        });
    }

    likePost(postId: number, userId: number): Promise<void> {
        return this.db.execute(`INSERT INTO likes VALUES ($/postId/, $/userId/)`, {
            postId,
            userId
        });
    }

    unlikePost(postId: number, userId: number): Promise<void> {
        return this.db.execute(`DELETE FROM likes WHERE post_id = $/postId/ AND user_id = $/userId/`, {
            postId,
            userId
        });
    }
}

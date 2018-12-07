import { IPostsRepository, IPost } from '../../application/repositories/posts.repository';
import { IDatabaseAdapter, queryResult } from '../../../shared/infrastructure';

export class PostsRepository implements IPostsRepository {
    constructor(private db: IDatabaseAdapter) {}

    getAll(): Promise<IPost[]> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT id, user_id, date, content FROM posts`).then(posts => {
                const promises = [];

                posts.forEach(post => {
                    promises.push(new Promise((res, rej) => {
                        this.db.get(`SELECT user_id FROM likes WHERE post_id = $/postId/`, { postId: post.id }).then(results => {
                            const likes = results.map(result => result.user_id);

                            post.likes = likes;

                            return res(post);
                        }, err => {
                            return rej(err);
                        });
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
        return this.db.execute(`INSERT INTO posts (user_id, content, date) VALUES ($/userId/, $/content/, $/date/) RETURNING id`, {
            userId: post.user_id,
            content: post.content,
            date: post.date
        }, queryResult.one).then(data => {
            return +data.id;
        });
    }

    likePost(postId: number, userId: number): Promise<void> {
        return this.db.execute(`INSERT INTO likes (post_id, user_id) VALUES ($/postId/, $/userId/)`, {
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

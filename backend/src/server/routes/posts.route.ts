import { Router } from 'express';
import { getPostgresDB } from '../services';
import { PostsRepository } from '../../posts/infrastructure/repositories/posts.repository';
import { PostsController } from '../../posts/application/posts.controller';

export const postsRouter = Router();

postsRouter.route('/posts')
    .get(async (req, res) => {
        const userId = typeof req['session'].user !== 'undefined' ? +req['session'].user.id : null;
        const postsRepository = new PostsRepository(getPostgresDB());
        const postsController = new PostsController(postsRepository);

        const result = await postsController.getPosts(userId);

        // Return response
        return res.status(result.getStatusCode()).json({
            code: result.getStatusCode(),
            msg: result.getMessage(),
            data: result.data
        });
    })
    .post(async (req, res) => {
        const userId = typeof req['session'].user !== 'undefined' ? +req['session'].user.id : null;
        const postsRepository = new PostsRepository(getPostgresDB());
        const postsController = new PostsController(postsRepository);

        const result = await postsController.createPost({
            content: req.body.content,
            userId
        });

        // Return response
        return res.status(result.getStatusCode()).json({
            code: result.getStatusCode(),
            msg: result.getMessage(),
            data: result.data
        });
    });

postsRouter.route('/posts/:id/like')
    .post(async (req, res) => {
        const userId = typeof req['session'].user !== 'undefined' ? +req['session'].user.id : null;
        const postsRepository = new PostsRepository(getPostgresDB());
        const postsController = new PostsController(postsRepository);

        const result = await postsController.toggleLikePost({
            id: +req.params.id,
            userId
        });

        // Return response
        return res.status(result.getStatusCode()).json({
            code: result.getStatusCode(),
            msg: result.getMessage(),
            data: result.data
        });
    });

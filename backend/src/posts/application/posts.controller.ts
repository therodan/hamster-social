import { IPostsRepository } from './repositories/posts.repository';
import { PostsAggregate } from '../core/model';
import { Result } from '../../shared/core/entities';
import { ICreatePostViewModel, ILikePostViewModel } from './viewmodels';

export class PostsController {
    constructor(protected postsRepository: IPostsRepository) {}

    async getPosts(userId: number) {
        const result = new Result();
        if (!userId) {
            result.addError(new Error('Please log in first'));
        }
        else {
            const postsData = await this.postsRepository.getAll();
            const posts = new PostsAggregate(postsData);

            result.data = posts.getPosts();
        }

        return result;
    }

    async createPost(viewModel: ICreatePostViewModel) {
        const result = new Result();

        try {
            const postsData = await this.postsRepository.getAll();
            const posts = new PostsAggregate(postsData);

            const post = posts.createPost(viewModel.content, viewModel.userId);

            post.id = await this.postsRepository.createPost(post);

            result.data = post;
        }
        catch (e) {
            result.addError(e);
        }

        return result;
    }

    async toggleLikePost(viewModel: ILikePostViewModel) {
        const result = new Result();

        try {
            const postsData = await this.postsRepository.getAll();
            const posts = new PostsAggregate(postsData);

            const liked = posts.toggleLikePost(viewModel.id, viewModel.userId);

            if (liked === true) {
                await this.postsRepository.likePost(viewModel.id, viewModel.userId);
            }
            else {
                await this.postsRepository.unlikePost(viewModel.id, viewModel.userId);
            }

            result.data = liked;
        }
        catch (e) {
            result.addError(e);
        }

        return result;
    }
}

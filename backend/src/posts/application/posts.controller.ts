import { IPostsRepository } from './repositories/posts.repository';
import { PostsAggregate } from '../core/model';
import { Result } from '../../shared/core/entities';
import { ICreatePostViewModel, ILikePostViewModel } from './viewmodels';

/**
 * Posts Controller
 *
 * Contains all the functions with regards to posts including liking/unliking
 */
export class PostsController {
    constructor(protected postsRepository: IPostsRepository) {}

    /**
     * Get all posts
     * @param userId number - ID of user trying to access the posts
     */
    async getPosts(userId: number) {
        const result = new Result();
        if (!userId) {
            result.addError(new Error('Please log in first'));
        }
        else {
            // Load the posts from the database
            const postsData = await this.postsRepository.getAll();
            const posts = new PostsAggregate(postsData);

            result.data = posts.getPosts();
        }

        return result;
    }

    /**
     * Create a new Post
     * @param viewModel object - contains content for the post and the user creating the post
     */
    async createPost(viewModel: ICreatePostViewModel) {
        const result = new Result();

        try {
            // Load previous posts
            const postsData = await this.postsRepository.getAll();
            const posts = new PostsAggregate(postsData);

            // Create the new post
            const post = posts.createPost(viewModel.content, viewModel.userId);

            // Save the post to the database and get the ID
            post.id = await this.postsRepository.createPost(post);

            // Return the post
            result.data = post;
        }
        catch (e) {
            result.addError(e);
        }

        return result;
    }

    /**
     * Toggle Like/Unlike on Post
     * @param viewModel object - contains the ID of the post and the user liking the post
     */
    async toggleLikePost(viewModel: ILikePostViewModel) {
        const result = new Result();

        try {
            // Load all the posts
            const postsData = await this.postsRepository.getAll();
            const posts = new PostsAggregate(postsData);

            // Toggle whether post is liked or unliked
            const liked = posts.toggleLikePost(viewModel.id, viewModel.userId);

            if (liked === true) {
                // Save like to database
                await this.postsRepository.likePost(viewModel.id, viewModel.userId);
            }
            else {
                // Delete like from the database
                await this.postsRepository.unlikePost(viewModel.id, viewModel.userId);
            }

            // Return whether post was liked or unliked
            result.data = liked;
        }
        catch (e) {
            result.addError(e);
        }

        return result;
    }
}

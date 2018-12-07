import 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { PostsRepositoryMock } from '../mocks';
import { getMockPosts } from '../../../core/specs/mocks/posts.mock';
import { PostsController } from '../../posts.controller';
import { Result } from '../../../../shared/core/entities';

describe('Like Post Integration', function() {
    describe('Valid Like Post', function() {
        const postsRepository = new PostsRepositoryMock();
        const getAll = sinon.stub(postsRepository, 'getAll');
        getAll.resolves(getMockPosts());
        const likePost = sinon.stub(postsRepository, 'likePost');
        likePost.resolves();

        const postsController = new PostsController(postsRepository);
        let result: Result;

        before(async function() {
            result = await postsController.toggleLikePost({
                id: 1,
                userId: 2
            });
        });

        it('should save the like in the database', function() {
            assert(likePost.calledOnceWith(1, 2));
        });

        it('should return the true', function() {
            expect(result.data).to.be.equal(true);
        });
    });
});

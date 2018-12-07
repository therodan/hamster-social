import 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { PostsRepositoryMock } from '../mocks';
import { PostsController } from '../../posts.controller';
import { Result } from '../../../../shared/core/entities';

describe('Create Post Integration', function() {
    describe('Valid Post', function() {
        const postsRepository = new PostsRepositoryMock();
        const getAll = sinon.stub(postsRepository, 'getAll');
        getAll.resolves([]);
        const createPost = sinon.stub(postsRepository, 'createPost');
        createPost.resolves(1);

        const postsController = new PostsController(postsRepository);
        let result: Result;

        before(async function() {
            result = await postsController.createPost({
                content: 'Test post',
                userId: 1
            });
        });

        it('should save the post in the database', function() {
            assert(createPost.calledOnce);
            expect(result.data.id).to.be.equal(1);
        });

        it('should return the post', function() {
            expect(result.data.content).to.be.equal('Test post');
            expect(result.data.user_id).to.be.equal(1);
        });
    });
});

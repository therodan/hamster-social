import 'mocha';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';
import { PostsRepositoryMock } from '../mocks';
import { PostsController } from '../../posts.controller';

describe('Create Post Integration', function() {
    describe('Invalid Post', function() {
        describe('User is not logged in', function() {
            const postsRepository = new PostsRepositoryMock();
            const getAll = sinon.stub(postsRepository, 'getAll');
            getAll.resolves([]);
            const createPost = sinon.stub(postsRepository, 'createPost');
            createPost.resolves(1);

            it('should return an error "Please log in first"', async function() {
                const postsController = new PostsController(postsRepository);
                const result = await postsController.createPost({
                    content: 'Test',
                    userId: null
                });

                expect(result.hasErrors()).to.be.equal(true);
                expect(result.getMessage()).to.be.equal('Please log in first');
                assert(createPost.notCalled);
            });
        });
    });
});

import 'mocha';
import { expect } from 'chai';
import { getRegisteredUser } from '../../../../shared/core/specs/mocks';
import { getMockPosts } from '../mocks/posts.mock';
import { PostsAggregate } from '../../model';

describe('Create Post', function() {
    describe('Valid Unlike Post', async function() {
        const user = await getRegisteredUser(2);
        const mockPostData = getMockPosts();
        const posts = new PostsAggregate(mockPostData);

        it('should return true', function() {
            const liked = posts.toggleLikePost(mockPostData[0].id, user.id);

            expect(liked).to.be.equal(false);
        });
    });
});

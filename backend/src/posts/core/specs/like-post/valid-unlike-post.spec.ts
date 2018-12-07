import 'mocha';
import { expect } from 'chai';
import { getMockPosts } from '../mocks/posts.mock';
import { PostsAggregate } from '../../model';

describe('Like Post', function() {
    describe('Valid Unlike Post', function() {
        const mockPostData = getMockPosts();
        mockPostData[0].likes.push(2);  // Simulate like by user 2
        const posts = new PostsAggregate(mockPostData);

        it('should return true', function() {
            const liked = posts.toggleLikePost(mockPostData[0].id, 2);

            expect(liked).to.be.equal(false);
        });
    });
});

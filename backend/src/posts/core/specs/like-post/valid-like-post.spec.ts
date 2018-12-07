import 'mocha';
import { expect } from 'chai';
import { getMockPosts } from '../mocks/posts.mock';
import { PostsAggregate } from '../../model';

describe('Like Post', function() {
    describe('Valid Like Post', function() {
        const mockPostData = getMockPosts();
        const posts = new PostsAggregate(mockPostData);

        it('should return true', function() {
            const liked = posts.toggleLikePost(mockPostData[0].id, 2);

            expect(liked).to.be.equal(true);
        });
    });
});

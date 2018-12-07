import 'mocha';
import { expect } from 'chai';
import { getMockPosts } from '../mocks/posts.mock';
import { PostsAggregate } from '../../model';

describe('Like Post', function() {
    describe('Invalid Unlike Post', function() {
        describe('Post belongs to user', function() {
            const mockPostData = getMockPosts();
            const posts = new PostsAggregate(mockPostData);

            it('should throw an error', function() {
                try {
                    posts.toggleLikePost(mockPostData[0].id, 1);

                    throw new Error('Test invalid');
                }
                catch (e) {
                    expect(e).to.be.instanceof(Error);
                    expect(<Error>e.message).to.be.equal('You cannot like your own post');
                }
            });
        });
    });
});

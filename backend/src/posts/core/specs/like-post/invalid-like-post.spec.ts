import 'mocha';
import { expect } from 'chai';
import { getRegisteredUser } from '../../../../shared/core/specs/mocks';
import { getMockPosts } from '../mocks/posts.mock';
import { PostsAggregate } from '../../model';

describe('Create Post', function() {
    describe('Invalid Unlike Post', function() {
        describe('Post belongs to user', async function() {
            const user = await getRegisteredUser();
            const mockPostData = getMockPosts();
            const posts = new PostsAggregate(mockPostData);

            it('should throw an error', function() {
                try {
                    posts.toggleLikePost(mockPostData[0].id, user.id);

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

import 'mocha';
import { expect } from 'chai';
import { getGuestUser, getRegisteredUser } from '../../../../shared/core/specs/mocks';
import { PostsAggregate } from '../../model';
import { getMockPosts } from '../mocks/posts.mock';

describe('Create Post', function() {
    describe('Invalid Post', function() {
        const posts = new PostsAggregate(getMockPosts());

        describe('User is not logged in', function() {
            it('should return an error "Please log in first"', function() {
                try {
                    posts.createPost('Test Content', getGuestUser().id);
                }
                catch (e) {
                    expect(e).to.be.instanceof(Error);
                    expect(<Error>e.message).to.be.equal('Please log in first');
                }
            });
        });

        describe('Post does not include any content', function() {
            it('should return an error "Please include some content"', async function() {
                try {
                    const user = await getRegisteredUser();

                    posts.createPost('', user.id);
                }
                catch (e) {
                    expect(e).to.be.instanceof(Error);
                    expect(<Error>e.message).to.be.equal('Please include some content');
                }
            });
        });
    });
});

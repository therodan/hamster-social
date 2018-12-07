import 'mocha';
import { expect } from 'chai';
import { getGuestUser, getRegisteredUser } from '../../../../shared/core/specs/mocks';
import { PostsAggregate } from '../../model';
import { getMockPosts } from '../mocks/posts.mock';

describe('Create Post', function() {
    describe('Invalid Post', function() {
        describe('User is not logged in', function() {
            const posts = new PostsAggregate(getMockPosts());

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

        describe('Post does not include any content', async function() {
            const user = await getRegisteredUser();
            const posts = new PostsAggregate(getMockPosts());

            it('should return an error "Please include some content"', function() {
                try {
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

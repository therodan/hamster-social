import 'mocha';
import { expect } from 'chai';
import { getRegisteredUser } from '../../../../shared/core/specs/mocks';
import { getMockPosts } from '../mocks/posts.mock';
import { PostsAggregate } from '../../model';

describe('Create Post', function() {
    describe('Valid Post', async function() {
        const user = await getRegisteredUser();
        const mockPostData = getMockPosts();
        const posts = new PostsAggregate(mockPostData);
        const postData = {
            user,
            content: '<strong>Test content</strong>'
        };
        const newPost = posts.createPost(postData.content, postData.user.id);

        it('should add the posts to the list of posts', function() {
            expect(posts.getPosts().length).to.be.equal(mockPostData.length + 1);
        });

        it('should create a post for the user', function() {
            expect(newPost.user_id).to.be.equal(user.id);
        });

        it('should sanitise the content', function() {
            expect(newPost.content).to.be.equal('');
        });
    });
});

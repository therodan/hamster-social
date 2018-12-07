import 'mocha';
import { expect } from 'chai';
import { getMockPosts } from '../mocks/posts.mock';
import { PostsAggregate } from '../../model';

describe('Create Post', function() {
    describe('Valid Post', function() {
        const mockPostData = getMockPosts();
        const posts = new PostsAggregate(mockPostData);
        const newPost = posts.createPost('<strong>Test content</strong>', 1);

        it('should add the posts to the list of posts', function() {
            expect(posts.getPosts().length).to.be.equal(2);
        });

        it('should create a post for the user', function() {
            expect(newPost.user_id).to.be.equal(1);
        });

        it('should sanitise the content', function() {
            expect(newPost.content).to.be.equal('<strong>Test content</strong>');
        });
    });
});

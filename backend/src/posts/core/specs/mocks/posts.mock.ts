import { IPost } from '../../model';

const MOCK_POSTS: IPost[] = [{
    id: 1,
    content: 'Test post',
    user_id: 1,
    likes: [2]
}];

export function getMockPosts() {
    return Object.assign({}, MOCK_POSTS);
}

import { IPost } from '../../model';

export function getMockPosts(): IPost[] {
    return [{
        id: 1,
        content: 'Test post',
        user_id: 1,
        likes: []
    }];
}

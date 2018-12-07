export interface IPost {
    id: number;
    user_id: number;     // UserID of owner of post
    content: string;
    likes: number[];    // Array of user IDs
}

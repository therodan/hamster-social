export interface IPost {
    id: number;
    user_id: number;     // UserID of owner of post
    date: string;
    content: string;
    likes: number[];    // Array of user IDs
}

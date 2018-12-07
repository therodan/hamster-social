import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsService {
    constructor(private httpClient: HttpClient) { }

    getPosts() {
        return this.httpClient.get<any>('/api/posts');
    }

    createPost(content: string) {
        return this.httpClient.post('/api/posts', { content });
    }

    toggleLikePost(id: number) {
        return this.httpClient.post('/api/posts/' + id + '/like', null);
    }
}

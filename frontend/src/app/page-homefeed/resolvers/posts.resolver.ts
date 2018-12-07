import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Injectable()
export class PostsResolver implements Resolve<any> {
    constructor(private postsService: PostsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.postsService.getPosts();
    }
}

import { Component, OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUserService } from '../shared/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-homefeed',
    styleUrls: ['page-homefeed.component.scss'],
    templateUrl: 'page-homefeed.component.html'
})
export class PageHomeFeedComponent implements OnInit {
    posts = [];
    createPostForm: FormGroup;
    userId: number;

    get postsInReverse() {
        return this.posts && this.posts.length > 0 ? this.posts.reverse() : [];
    }

    constructor(private postsService: PostsService, private route: ActivatedRoute, private activeUser: ActiveUserService,
        private formBuilder: FormBuilder, private router: Router) {
            this.createPostForm = this.formBuilder.group({
                content: ['', [Validators.required]]
            });
        }

    ngOnInit() {
        this.userId = this.activeUser.user.id;
        this.route.data.subscribe((data) => {
            if (data && data.posts) {
                this.posts = data.posts;
            }
        }, err => console.error(err));
    }

    refresh() {
        this.postsService.getPosts().subscribe(posts => this.posts = posts);
    }

    createPost() {
        if (this.createPostForm.valid) {
            this.postsService.createPost(this.createPostForm.get('content').value).subscribe(post => {
                this.posts.push(post);
                this.createPostForm.get('content').setValue('');    // Clear content
            });
        }
    }

    toggleLikePost(post) {
        this.postsService.toggleLikePost(post.id).subscribe(response => {
            if (response === true) {
                post.likes.push(this.userId);
            }
            else {
                post.likes.splice(post.likes.indexOf(this.userId), 1);
            }
        });
    }

    logout() {
        this.activeUser.logout().subscribe(() => {
            this.router.navigate(['/login']);
        });
    }
}

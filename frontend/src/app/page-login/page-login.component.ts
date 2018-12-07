import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from '../shared/services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-login',
    styleUrls: ['page-login.component.scss'],
    templateUrl: 'page-login.component.html'
})

export class PageLoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    errorMessage: string;

    constructor(private activeUser: ActiveUserService, private router: Router, private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        if (!this.activeUser.guest) {
            this.router.navigate(['/home']);
        }
    }

    login() {
        if (this.loginForm.valid) {
            this.loading = true;
            this.errorMessage = null;

            this.activeUser.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(() => {
                this.router.navigate(['/home']);
                this.loading = false;
            }, err => {
                this.errorMessage = err.msg;
                this.loading = false;
            });
        }
    }
}

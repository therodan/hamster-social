import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from '../shared/services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-registration',
    styleUrls: ['page-registration.component.scss'],
    templateUrl: 'page-registration.component.html'
})

export class PageRegistrationComponent implements OnInit {
    registrationForm: FormGroup;
    loading = false;
    errorMessage: string = null;

    constructor(private activeUser: ActiveUserService, private router: Router, private formBuilder: FormBuilder) {
        this.registrationForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            password1: '',
            password2: ''
        });
    }

    ngOnInit() {
        if (!this.activeUser.guest) {
            this.router.navigate(['/home']);
        }
    }

    register() {
        if (this.registrationForm.valid) {
            this.loading = true;
            this.errorMessage = null;

            this.activeUser.register(this.registrationForm.value).subscribe(() => {
                this.loading = false;
                this.router.navigate(['/home']);
            }, err => {
                this.errorMessage = err.msg;
                this.loading = false;
            });
        }
    }
}

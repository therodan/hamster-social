import { Routes } from '@angular/router';

import { PageErrorComponent } from './page-error';
import { AuthorisationGuard } from './shared/guards';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageHomeFeedComponent, PostsResolver } from './page-homefeed/';
import { PageRegistrationComponent } from './page-registration/page-registration.component';

export const AppRoutes: Routes = [{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
}, {
    path: 'home',
    canActivate: [AuthorisationGuard],
    component: PageHomeFeedComponent,
    resolve: {
        posts: PostsResolver
    }
}, {
    path: 'login',
    component: PageLoginComponent
}, {
    path: 'register',
    component: PageRegistrationComponent
}, {
    path: '**',
    component: PageErrorComponent
}];

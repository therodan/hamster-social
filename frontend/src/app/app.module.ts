import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthorisationGuard } from './shared/guards';
import { ActiveUserService } from './shared/services';
import { httpInterceptorProviders } from './shared/interceptors';
import { PageHomeFeedComponent } from './page-homefeed/page-homefeed.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegistrationComponent } from './page-registration/page-registration.component';
import { PageErrorComponent } from './page-error';
import { AppRoutes } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        PageHomeFeedComponent,
        PageLoginComponent,
        PageRegistrationComponent,
        PageErrorComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(AppRoutes),
    ],
    providers: [
        // Guards
        AuthorisationGuard,
        // Services
        ActiveUserService,
        httpInterceptorProviders,
        {
            provide: APP_INITIALIZER,
            useFactory: (activeUserService: ActiveUserService) => {
                return () => activeUserService.init();
            },
            deps: [ActiveUserService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

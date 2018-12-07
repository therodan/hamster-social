import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IUser, INewUser } from '../entities';

const guest: IUser = {
    id: null,
    name: 'Guest',
    email: 'guest@guest.com'
};

@Injectable()
export class ActiveUserService {
    private _user: IUser;
    public user$: BehaviorSubject<IUser>;

    get guest() {
        return !this._user.id;
    }

    get user() {
        return this._user;
    }

    set user(user: IUser) {
        this._user = user;
        this.user$.next(this._user);
    }

    constructor(private http: HttpClient) {
        this._user = guest;
        this.user$ = new BehaviorSubject(this._user);
    }

    init() {
        return this.http.get<IUser>('/api/users/me')
            .toPromise()
            .then(user => {
                this.user = user;

                return;
            });
    }

    login(email: string, password: string) {
        return this.http.post('/api/session', { email, password })
            .pipe(tap((user: IUser) => {
                this.user = user;
            }));
    }

    logout() {
        return this.http.post('/api/session/logout', null)
            .pipe(tap(() => this.user$.next(guest)));
    }

    register(newUser: INewUser) {
        return this.http.post('/api/users', newUser)
            .pipe(tap((user: IUser) => {
                this.user = user;
            }));
    }
}

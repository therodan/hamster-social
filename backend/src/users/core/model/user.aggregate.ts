import { IUser } from '../../../shared/core/entities';
import { INewUser } from './entities';

/**
 * User Aggregate
 *
 * Contains list of users and functions to perform on users
 */
export class UserAggregate {
    constructor(protected _users: IUser[]) {
    }

    /**
     * Create a new user
     * @param user INewUser New user to create
     */
    newUser(user: INewUser): IUser {
        throw new Error('Not implemented');
    }

    /**
     * Login User using email and password
     * @param email string - Users email address
     * @param password string - Users password
     */
    async loginUser(email: string, password: string) {
        throw new Error('Not implemented');
    }
}

import * as Joi from 'joi';
import { User, INewUser } from '../../../shared/core/entities';
import { newUserSchema } from './schemas';

/**
 * User Aggregate
 *
 * Contains list of users and functions to perform on users
 *
 * Storing the entire lists of users is not the very effient but here it helps
 * demonstrate domain driven design and storing business login in the core
 */
export class UserAggregate {
    private _users: User[] = [];

    constructor(users: User[]) {
        this._users = users;
    }

    getUserByEmail(email: string) {
        const userIndex = this._users.findIndex(user => user.email === email);

        if (userIndex === -1) {
            return null;
        }
        else {
            return this._users[userIndex];
        }
    }

    /**
     * Create a new user
     * @param newUserData INewUser New user to create
     */
    async newUser(newUserData: INewUser): Promise<User> {
        // Check if user data is valid
        const validationResult = Joi.validate(newUserData, newUserSchema);
        if (validationResult.error) {
            throw new Error(validationResult.error.message);
        }

        // Check for existing user with email
        const existingUser = this.getUserByEmail(newUserData.email);
        if (existingUser !== null) {
            throw new Error('Email already in use');
        }

        const newUser = await User.createUser(newUserData);

        this._users.push(newUser);

        return newUser;
    }

    /**
     * Login User using email and password
     * @param email string - Users email address
     * @param password string - Users password
     */
    async loginUser(email: string, password: string) {
        const user = this.getUserByEmail(email);
        if (user === null) {
            return false;
        }

        const valid = await user.passwordIsValid(password);

        return valid;
    }
}

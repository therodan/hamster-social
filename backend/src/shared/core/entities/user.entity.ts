import * as bcrypt from 'bcrypt';
import { INewUser } from './new-user.entity';

/**
 * User Entity Interface
 */
export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;   // Encrypted password
}

/**
 * User Class
 */
export class User implements IUser {
    id: number;
    name: string;
    email: string;
    password: string;   // Encrypted password

    constructor(data: IUser) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }

    /**
     * Encrpyt password
     * @param password1 string - Password
     * @param password2 string - Password to compare
     */
    async setPassword(password1: string, password2: string): Promise<Error> {
        return new Promise<Error>((resolve, reject) => {
            // Check for valid password
            if (!password1) {
                return resolve(new Error('Please enter a password'));
            }
            else if (password1.length < 5) {
                return resolve(new Error('Passwords must be at least 5 characters long'));
            }
            else if (password1 !== password2) {
                return resolve(new Error('Passwords do not match'));
            }

            // Encrypt password
            bcrypt.hash(password1, 12, (error, hash) => {
                if (error) {
                    return reject(error);
                }

                // Set password to hash (encrypted)
                this.password = hash;

                // No errors
                return resolve(null);
            });
        });
    }

    /**
     * Check if unencrypted password is valid
     * @param password string - unencrypted password
     */
    async passwordIsValid(password: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            // Compare password again hashed password
            bcrypt.compare(password, this.password, (err, same) => {
                if (err) {
                    return reject(err);
                }

                return resolve(same);
            });
        });
    }

    static async createUser(userData: INewUser) {
        const user = new User({
            id: null,
            name: userData.name,
            email: userData.email,
            password: null
        });
        const errors = await user.setPassword(userData.password1, userData.password2);
        if (errors && errors instanceof Error) {
            throw errors;
        }

        return user;
    }
}

import { IUsersRepository } from '../../application/repositories';
import { User } from '../../../shared/core/entities';
import { IDatabaseAdapter, queryResult } from '../../../shared/infrastructure';

/**
 * Users Repository
 */
export class UsersRepository implements IUsersRepository {
    constructor(private db: IDatabaseAdapter) {}

    /**
     * Get all users
     */
    getAll(): Promise<User[]> {
        return this.db.get(`SELECT id, name, email, password FROM users`).then(users => {
            // Map users to User class
            return users.map(user => new User(user));
        });
    }

    /**
     * Create a new User
     * @param user object - User to be created
     */
    createUser(user: User): Promise<number> {
        return this.db.execute(
                `INSERT INTO users (name, email, password)
                VALUES ($/name/, $/email/, $/password/)
                RETURNING id`,
            user, queryResult.one).then(data => {
                return +data.id;
            });
    }
}

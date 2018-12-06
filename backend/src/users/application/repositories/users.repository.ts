import { User } from '../../../shared/core/entities';

export interface IUsersRepository {
    getAll(): Promise<User[]>;
    createUser(user: User): Promise<number>;
}

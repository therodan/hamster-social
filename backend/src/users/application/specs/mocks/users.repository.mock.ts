import { IUsersRepository } from '../../repositories';
import { User } from '../../../../shared/core/entities';

export class UsersRepositoryMock implements IUsersRepository {
    getAll(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    createUser(user: User): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

import { Result } from '../../../shared/core/entities';
import { IUsersRepository } from '../repositories';
import { ILoginViewModel } from '../viewmodels';

export class LoginCommand {
    constructor(private usersRepository: IUsersRepository) {}

    execute(viewModel: ILoginViewModel): Promise<Result> {
        throw new Error('Not implemented');
    }
}

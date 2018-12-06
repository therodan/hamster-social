import { Result } from '../../../shared/core/entities';
import { IUsersRepository } from '../repositories';
import { ILoginViewModel } from '../viewmodels';
import { UserAggregate } from '../../core/model';

/**
 * Login Command
 *
 * Check users email and password
 */
export class LoginCommand {
    constructor(private usersRepository: IUsersRepository) {}

    async execute(viewModel: ILoginViewModel): Promise<Result> {
        const result = new Result();
        const usersData = await this.usersRepository.getAll();  // Load users from database

        const userAggregate = new UserAggregate(usersData);

        // Attempt login in
        const success = await userAggregate.loginUser(viewModel.email, viewModel.password);
        if (!success) {
            result.addError('Invalid username or password');
        }
        else {
            // Get users details
            const user = userAggregate.getUserByEmail(viewModel.email);

            // Add user data to result to be returned
            result.data = {
                id: user.id,
                email: user.email
            };
        }

        return result;
    }
}

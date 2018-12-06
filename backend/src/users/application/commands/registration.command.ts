import { IApplication } from '../../../shared/application/application.meta';
import { Result } from '../../../shared/core/entities';
import { IUsersRepository } from '../repositories';
import { IRegistrationViewModel } from '../viewmodels';
import { UserAggregate } from '../../core/model';

export class RegistrationCommand implements IApplication {
    constructor(private usersRepository: IUsersRepository) {}

    async execute(viewModel: IRegistrationViewModel): Promise<Result> {
        const result = new Result();

        try {
            const usersData = await this.usersRepository.getAll();  // Load users from database

            const userAggregate = new UserAggregate(usersData);

            // Create new user
            const user = await userAggregate.newUser(viewModel);

            // Save user in database
            const id = await this.usersRepository.createUser(user);
            user.id = id;

            result.data = {
                id: user.id,
                name: user.name,
                email: user.email
            };
        }
        catch (e) {
            result.addError(e);
        }

        return result;
    }
}

import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { LoginCommand } from '../../commands';
import { UsersRepositoryMock } from '../mocks';
import { Result } from '../../../../shared/core/entities';
import { getUserData } from '../../../core/specs/mocks';
import { ILoginViewModel } from '../../viewmodels';

describe('User Login Integration', function() {
    describe('Valid Login', function() {
        it('should return the user', async function() {
            const userData = await getUserData();
            const usersRepository = new UsersRepositoryMock();
            const getAll = sinon.stub(usersRepository, 'getAll');
            getAll.resolves(userData);

            const loginCommand = new LoginCommand(usersRepository);
            const viewModel: ILoginViewModel = {
                email: 'user@test.com',
                password: 'password'
            };

            const result = await loginCommand.execute(viewModel);

            expect(result).to.be.instanceOf(Result);
            expect(result.hasErrors()).to.be.equal(false);
            expect(result.data.id).to.be.equal(1);
            expect(result.data.email).to.be.equal('user@test.com');
        });
    });
});

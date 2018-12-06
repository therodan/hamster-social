import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { LoginCommand } from '../../commands';
import { UsersRepositoryMock } from '../mocks';
import { Result } from '../../../../shared/core/entities';
import { getUserData } from '../../../core/specs/mocks';
import { ILoginViewModel } from '../../viewmodels';

describe('User Login Integration', function() {
    describe('Invalid Login', function() {
        describe('Password does not match', function() {
            it('should return "Invalid username or password"', async function() {
                const userData = await getUserData();
                const usersRepository = new UsersRepositoryMock();
                const getAll = sinon.stub(usersRepository, 'getAll');
                getAll.resolves(userData);

                const loginCommand = new LoginCommand(usersRepository);
                const viewModel: ILoginViewModel = {
                    email: 'test@user.com',
                    password: 'badpassword'
                };

                const result = await loginCommand.execute(viewModel);

                expect(result).to.be.instanceOf(Result);
                expect(result.hasErrors()).to.be.equal(true);
                expect(result.getErrorMessages()[0]).to.be.equal('Invalid username or password');
            });
        });
    });
});

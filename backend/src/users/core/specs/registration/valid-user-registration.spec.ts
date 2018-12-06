import 'mocha';
import { expect } from 'chai';
import { UserAggregate, INewUser } from '../../model';
import { getUserData } from '../mocks';
import { IUser } from '../../../../shared/core/entities';

describe('User Registration', function() {
    describe('Valid user registration', async function() {
        const userData = await getUserData();
        const userAggregate = new UserAggregate(userData);
        const newUser: INewUser = {
            name: 'Test',
            email: 'test@test.com',
            password1: 'password',
            password2: 'password'
        };
        let user: IUser;

        before(async function() {
            user = await userAggregate.newUser(newUser);
        });

        it('should create a new user object', async function() {
            expect(user.name).to.be.equal(newUser.name);
            expect(user.email).to.be.equal(newUser.email);
        });

        it('should encrypt the password', async function() {
            expect(user.password).to.not.be.equal(newUser.password1);
        });
    });
});

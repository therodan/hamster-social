import 'mocha';
import { expect } from 'chai';
import { UserAggregate } from '../../model';
import { getUserData } from '../mocks';

describe('User Login', function() {
    describe('Valid Login', function() {
        it('should return true', async function() {
            const userData = await getUserData();
            const userAggregate = new UserAggregate(userData);

            const success = await userAggregate.loginUser('user@test.com', 'password');

            expect(success).to.be.equal(true);
        });
    });
});

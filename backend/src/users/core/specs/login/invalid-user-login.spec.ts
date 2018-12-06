import 'mocha';
import { expect } from 'chai';
import { UserAggregate } from '../../model';
import { getUserData } from '../mocks';

describe('User Login', function() {
    describe('Invalid Login', async function() {
        const userData = await getUserData();
        const userAggregate = new UserAggregate(userData);

        describe('Users email not found', function() {
            it('should return false', async function() {
                const success = await userAggregate.loginUser('test@test.com', '');

                expect(success).to.be.equal(false);
            });
        });

        describe('Users password does not match', function() {
            it('should return false', async function() {
                const success = await userAggregate.loginUser('test@test.com', '');

                expect(success).to.be.equal(false);
            });
        });
    });
});

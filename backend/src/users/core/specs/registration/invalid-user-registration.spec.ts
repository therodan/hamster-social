import 'mocha';
import { expect } from 'chai';
import { UserAggregate } from '../../model';
import { getUserData } from '../mocks';

describe('User Registration', function() {
    describe('Invalid user registration', async function() {
        const userData = await getUserData();
        const userAggregate = new UserAggregate(userData);

        describe('Invalid Password', function() {
            it('should return "Passwords do not match"', async function() {
                try {
                    await userAggregate.newUser({
                        name: 'Test',
                        email: 'test@test.com',
                        password1: 'password1',
                        password2: 'password2'
                    });

                    throw new Error('Test Failed');
                }
                catch (e) {
                    expect(e).to.be.instanceof(Error);
                    expect(<Error>e.message).to.be.equal('Passwords do not match');
                }
            });

            it('should return "Passwords must be at least 5 characters long"', async function() {
                try {
                    await userAggregate.newUser({
                        name: 'Test',
                        email: 'test@test.com',
                        password1: 'test',
                        password2: 'test'
                    });

                    throw new Error('Test Failed');
                }
                catch (e) {
                    expect(e).to.be.instanceof(Error);
                    expect(<Error>e.message).to.be.equal('Passwords must be at least 5 characters long');
                }
            });
        });

        describe('Invalid name', function() {
            it('should return "Please include a valid name"', async function() {
                try {
                    await userAggregate.newUser({
                        name: '',
                        email: 'test@test.com',
                        password1: 'small',
                        password2: 'small'
                    });
                }
                catch (e) {
                    expect(e).to.be.instanceof(Error);
                    expect(<Error>e.message).to.be.equal('Please include a valid name');
                }
            });
        });

        describe('Invalid Email', function() {
            it('should return "Please enter a valid email address"', async function() {
                try {
                    await userAggregate.newUser({
                        name: 'Test',
                        email: 'bademail',
                        password1: 'password',
                        password2: 'password'
                    });
                }
                catch (e) {
                    expect(e).to.be.instanceof(Error);
                    expect(<Error>e.message).to.be.equal('Please enter a valid email address');
                }
            });

            it('should return "Email already in use"', async function() {
                try {
                    await userAggregate.newUser({
                        name: 'Test',
                        email: 'user@test.com',
                        password1: 'password',
                        password2: 'password'
                    });

                    throw new Error('Test Failed');
                }
                catch (e) {
                    expect(e).to.be.instanceof(Error);
                    expect(<Error>e.message).to.be.equal('Email already in use');
                }
            });
        });
    });
});

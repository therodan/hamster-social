import { IUser, User } from '../../entities';

export function getGuestUser(): IUser {
    return {
        id: null,
        name: 'Guest',
        email: 'guest@guest.com',
        password: null
    };
}

export async function getRegisteredUser(id = 1): Promise<IUser> {
    const user = new User({
        id,
        name: 'User',
        email: 'user@test.com',
        password: ''
    });
    await user.setPassword('password', 'password');

    return user;
}

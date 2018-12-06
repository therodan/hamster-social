import { IUser, User } from '../../entities';

export function getGuestUser(): User {
    return new User({
        id: null,
        name: 'Guest',
        email: 'guest@guest.com',
        password: null
    });
}

export async function getRegisteredUser(id = 1): Promise<User> {
    const user = new User({
        id,
        name: 'User',
        email: 'user@test.com',
        password: null
    });
    await user.setPassword('password', 'password');

    return user;
}

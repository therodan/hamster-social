import { getRegisteredUser } from '../../../../shared/core/specs/mocks';

export async function getUserData() {
    const user = await getRegisteredUser();

    // Return new copy of data
    return [user];
}

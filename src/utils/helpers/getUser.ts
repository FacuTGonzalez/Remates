import  mocks  from '../mocks/users.json';

export const getUserByUsername = (username?: string) => {
    const user = mocks.users.find((user: any) => user.username === username);
    return user ? user : null;
}
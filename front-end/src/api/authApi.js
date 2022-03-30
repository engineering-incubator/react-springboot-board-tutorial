import client from './client'

export const register = async(
    data
) => {
    try {
        console.log('data', data);
        const response = await client.post('/api/v1/authentication/sign-up', {
            email: data.email,
            password: data.password,
            permission: data.permission,
            phoneNumber: data.phoneNumber,
            username: data.username,
        });
        console.log('response', response);
        return response.data;
    } catch (e) {
        return e;
    }
}
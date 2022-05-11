import client from "./client";

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

export const signInApi = async ({ username, password }) => {
    try {
        void await client.post('/api/v1/authentication/sign-in', {
            username, password
        });

        return {
            isSuccess: true,
            data: null,
        }
    } catch (e) {
        return {
            isSuccess: false,
            message: e.message,
        }
    }
}
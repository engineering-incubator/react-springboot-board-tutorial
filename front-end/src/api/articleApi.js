import client from './client'

export const getArticleList = async() => {
    try {
        console.log('data', data);
        const response = await client.get('/api/v1/article');
        console.log('response', response);
        return response.content;
    } catch (e) {
        return e;
    }
}
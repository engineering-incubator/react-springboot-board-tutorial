import client from './client'

export const getArticleList = async() => {
    try {
        const response = await client.get('/api/v1/article');
        console.log('response', response);
        return response.data.content;
    } catch (e) {
        return e;
    }
}
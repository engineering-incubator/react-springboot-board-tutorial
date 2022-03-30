import client from './client'

export const getArticleList = async() => {
    try {
        const response = await client.get(`/api/v1/article`);
        return response.data.content;
    } catch (e) {
        return e;
    }
}

export const getArticle = async(articleId) => {
    try {
        const response = await client.get(`/api/v1/article/${articleId}`);
        console.log('response', response);
        return response.data.content;
    } catch (e) {
        return e;
    }
}
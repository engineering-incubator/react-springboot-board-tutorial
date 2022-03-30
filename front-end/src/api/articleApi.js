import client, { requestClientService } from "./client";

export const getArticleList = async() => {
    const response = await requestClientService();
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
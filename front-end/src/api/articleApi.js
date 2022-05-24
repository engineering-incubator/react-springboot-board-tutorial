import client, { requestClientService } from "./client";

export const getArticleList = async() => {
    try {
        const response = await requestClientService('get', `/api/v1/articles?currentPage=1&size=5`);
        return {
            isSuccess: true,
            data: response.items,
        }
    } catch (e) {
        return {
            isSuccess: false,
            message: e.message,
        }
    }
};

export const getArticle = async(articleId) => {
    try {
        const response = await client.get(`/api/v1/articles/${articleId}`);
        console.log(response)
        return response.data;
    } catch (e) {
        return e;
    }
};

export const createArticle = async(article) => {
    try {
        const response = await requestClientService('post', `/api/v1/articles`, { content: article.content, title: article.title });
        return {
            isSuccess: true,
            data: response.items,
        }
    } catch (e) {
        return {
            isSuccess: false,
            message: e.message,
        }
    }
};
export const updateArticle = async(articleId, article) => {
    try {
        const response = await client.put(`/api/v1/articles/${articleId}`, {
            content: article.content,
            title: article.title,
        });
        console.log(article.content, article.title, response)
        return response.data;
    } catch (e) {
        return e;
    }
};

export const deleteArticle = async(articleId) => {
    return requestClientService('delete', `/api/v1/articles/${articleId}`);
};
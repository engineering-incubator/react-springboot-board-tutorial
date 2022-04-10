import client, { requestClientService } from "./client";

export const getArticleList = async() => {
    return requestClientService('get', `/api/v1/article`);
}

export const getArticle = async(articleId) => {
    return requestClientService('get', `/api/v1/article/${articleId}`);
}
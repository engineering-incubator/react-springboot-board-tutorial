import client, { requestClientService } from './client';

export const getArticleList = async() => {
    return requestClientService('get', `/api/v1/articles?currentPage=1&size=8`);
};

export const getArticle = async(articleId) => {
    return requestClientService('get', `/api/v1/articles/${articleId}`);
};

export const createArticle = async(article) => {
    try {
        const response = await client.post(`/api/v1/articles`, {
            content: article.content,
            title: article.title,
        });
        console.log(article.content, article.title, response)
        return response.data.content;
    } catch (e) {
        return e;
    }
};
// TODO api body를 객체로 넘겨주면 오류가남. 이유를 모르겠어서 임시방편으로 이 함수만 따로 처리
// return requestClientService('post', `/api/v1/articles`, { content: article.content, title: article.title });

export const deleteArticle = async(articleId) => {
    return requestClientService('delete', `/api/v1/articles/${articleId}`);
};
import { fetchLatestArticleListApi } from "./api/articleApi";

export async function fetchLatestArticleListsService() {
  const response = await fetchLatestArticleListApi();
  if (!response.isSuccess) {
    return response;
  }

  return {
    ...response,

    data: {
      ...response.data,
      // 데이터는 최신 작성된 글 5개까지만 화면에 노출시킨다.
      items: response.data.items.slice(0, 5),
    },
  };
}

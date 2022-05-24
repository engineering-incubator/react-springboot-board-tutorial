import requester1 from "../../configures/requestConfigures";

export const fetchLatestArticleListApi = () =>
  requester1("/v1/articles?currentPage=1");

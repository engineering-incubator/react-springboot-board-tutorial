import React, {useEffect, useState} from "react";
import Template from "../../components/common/Template";
import ArticleDetail from "../../components/article/ArticleDetail";
import { getArticle } from "../../api/articleApi";

const Article = ({ match }) => {
	const [article, setArticle] = useState({});
	 useEffect(() => {
    async function getItem() {
      const item = await getArticle(match.params.article_id);
			setArticle(item);
    }
		console.log('article', article)
    getItem();
	 }, []);
	return (
		<>
			<Template title="글 상세">
				<p>{match.params.article_id}</p>
				<ArticleDetail data={article}></ArticleDetail>			
			</Template>
		</>
	);
};
export default Article;

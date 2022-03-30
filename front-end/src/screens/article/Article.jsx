import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Template from "../../components/common/Template";
import ArticleDetail from "../../components/article/ArticleDetail";
import { getArticle } from "../../api/articleApi";

function useFetchArticle() {
	const params = useParams()
	const [article, setArticle] = useState({});
	useEffect(function fetchArticle () {
		(async function getItem() {
			const item = await getArticle(params.article_id);
			setArticle(item);
		})();
	}, []);

	return article;
}

const Article = () => {
	const article = useFetchArticle();
	return (
		<>
			<Template title="글 상세">
				<p>{article.id}</p>
				<ArticleDetail data={article} />
			</Template>
		</>
	);
};

export default Article;

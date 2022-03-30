import React, {useState, useEffect} from "react";
import Template from "../../components/common/Template";
import ArticleItem from "../../components/article/ArticleItem";
import { getArticleList } from "../../api/articleApi";
import { Link } from "react-router-dom";

const ArticleList = () => {
	const [articleList, setArticleList] = useState([]);
	 useEffect(() => {
    async function getList() {
      const list = await getArticleList();
			setArticleList(list);
    }
		console.log(articleList)
    getList();
	 }, []);
	
	return (
		<>
			<Template title="글 목록">
				{articleList.map((article, index) => <Link to={`/article/` + article.article_id}><ArticleItem data={article} /></Link>)}
			</Template>
		</>
	);
};
export default ArticleList;

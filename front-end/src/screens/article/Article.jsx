import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Template from '../../components/common/Template';
import ArticleDetail from '../../components/article/ArticleDetail';
import { getArticle, deleteArticle } from '../../api/articleApi';
import Button from '../../components/common/Button';
import { isFailureStatus } from "../../api/config/status-code.config";

function useFetchArticle() {
  const params = useParams();
  const [article, setArticle] = useState({});
  useEffect(function fetchArticle() {
    (async function getItem() {
      const item = await getArticle(params.article_id);
      setArticle(item);
    })();
  }, []);

  return article;
}

const Article = () => {
	const article = useFetchArticle();
	const params = useParams();

	const requestDelete = async () => {
		// FIXME validation 통과하지 못했을 경우, 서버로 요청을 하지 말아야 함.
		const result = await deleteArticle(params.article_id);
		console.log(result);
		if (isFailureStatus(result.code)) {
			return alert(result.message);
		}
	
		alert('글이 삭제되었습니다.');
		document.location.href = '/article';
	};
  return (
    <>
      <Template title="글 상세">
        <p>{article.id}</p>
        <ArticleDetail data={article} />
        <Link to={{ pathname: `/article/update/` + article.article_id, state: {article} }}><Button style={{ width: '48%', marginRight: '4%' }}>수정</Button></Link>
				<Button style={{ width: '48%' }} onClick={()=>requestDelete()}>삭제</Button>
      </Template>
    </>
  );
};

export default Article;

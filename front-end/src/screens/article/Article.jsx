import React from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Template from "../../components/common/Template";
import ArticleItem from "../../components/article/ArticleItem";

const sampleDate = [{
		article_id: 1,
		title: '첫번째 제목',
		content: '첫번쨰 글 내용',
		created_at: '2022-03-21',
		modified_at: '2022-03-22'
	},
		{
		article_id: 2,
		title: '두번째 제목',
		content: '두번쨰 글 내용',
		created_at: '2022-03-21',
		modified_at: '2022-03-22'
		},
		{
		article_id: 3,
		title: '세번째 제목',
		content: '세번쨰 글 내용',
		created_at: '2022-03-21',
		modified_at: '2022-03-22'
		},
		{
		article_id: 4,
		title: '네번째 제목',
		content: '네번쨰 글 내용',
		created_at: '2022-03-21',
		modified_at: '2022-03-22'
	},
	]
const Article = () => {
	const test = {
		article_id: 1,
		title: '첫번째 제목',
		content: '첫번째 글 내용',
		created_at: '2022-03-21',
		modified_at: '2022-03-22'
	}
	return (
		<>
			<Template title="글 상세">
				<ArticleItem data={test}></ArticleItem>			
			</Template>
		</>
	);
};
export default Article;

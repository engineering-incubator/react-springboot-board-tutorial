import React from "react";
import styled from "styled-components";
import Template from "../../components/common/Template";

export const ArticleContainer = styled.select`
	margin: 10px 0;
	display: block;
	width: 100%;
	padding: 5px;
	font-size: 1rem;
	border: 1px solid;
`;

const Article = ({data}) => {
	const { article_id, title, content, created_at, modified_at } = data.data;
	return (
		<>
			<Template title='글 상세'>
			<ArticleContainer>
				<div>{title}</div>
				</ArticleContainer>
				</Template>
		</>
	);
};
export default Article;

import React from "react";
import styled from "styled-components";
	
export const ArticleContainer = styled.div`
	margin: 10px 0;
	padding: 15px;
	font-size: 1rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	border-radius: 10px;
`;

const ArticleItem = (data) => {
	const { article_id, title, content, created_at, modified_at } = data.data;
	return (
		<>
			<ArticleContainer>
				<div>{article_id}</div>
				<div style={{ fontWeight: 'bold' }}>{title}</div>
				<div>{content}</div>
				<div>생성일: {created_at} 수정일: {modified_at}</div>
			</ArticleContainer>
		</>
	);
};
export default ArticleItem;

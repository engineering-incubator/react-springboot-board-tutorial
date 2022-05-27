import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import useArticleItem from '../hooks/api/useArticleItem';
import {
  StyledCommonFlexContainer,
  StyledCommonNegativeButton,
  StyledCommonPositiveButton,
  StyledCommonWranningButton,
  StyledCommonWrap,
} from '../styles/common';
import styled from '@emotion/styled';
import Loading from '../components/common/Loading';
import DOMPurify from 'dompurify';
import { generateDate } from '../utils';
import { colors } from '../styles/variables';
import { useRecoilValue } from 'recoil';
import { whoamiState } from '../recoil/signin';
import { deleteArticleItem } from '../api';
import { isSuccessStatus } from '../config/status.code.config';

const ArticleView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isSignin, username } = useRecoilValue(whoamiState);
  const { articleId = '' } = useParams();
  const { data, isSuccess, isLoading } = useArticleItem(articleId);
  const isValidUser = useMemo(() => username === data?.content.author, [data?.content, username]);

  useEffect(() => {
    if (isSignin) return;
    if (
      !confirm('로그인을 하셔야 게시글을 열람하실 수 있습니다\n로그인 페이지로 이동하시겠습니까?')
    ) {
      navigate(-1);
      return;
    }
    navigate('/signin');
  }, [isSignin, navigate]);

  if (isLoading) return <Loading msg="게시글을 불러오고 있습니다." isFull={true} />;

  if (!data?.content || !isSuccess) return null;

  const { article_id, author, content, created_at, modified_at, title } = data.content;

  const purifyingDom = DOMPurify.sanitize(content);
  const isModified = created_at !== modified_at;
  const onClickGoBack = () => {
    navigate(-1);
  };
  const onClickDelete = async () => {
    const { code } = await queryClient.fetchQuery(['delete', article_id], () =>
      deleteArticleItem(`${article_id}`),
    );
    const isSuccess = isSuccessStatus(code);
    if (isSuccess) {
      if (!confirm('정말 게시글을 삭제하시겠습니까?')) return;
      alert('게시글이 삭제 되었습니다.');
      navigate('/articles');
      return;
    }
    alert('잠시 후 다시 시도해 주십시오');
  };

  return (
    <StyledCommonWrap>
      <StyledHeader>
        <StyledTitle>{title}</StyledTitle>
        <StyledName>{author}</StyledName>
        <StyledInformation>
          <StyledUnit>{generateDate(created_at)}</StyledUnit>
          {isModified && <StyledUnit>{generateDate(modified_at)}</StyledUnit>}
        </StyledInformation>
      </StyledHeader>
      <StyledContent>
        <StyledTextarea dangerouslySetInnerHTML={{ __html: purifyingDom }} />
      </StyledContent>
      <StyledCommonFlexContainer justify={'space-between'}>
        {isValidUser && (
          <>
            <StyledCommonPositiveButton onClick={() => navigate(`/article/write/${articleId}`)}>
              수정
            </StyledCommonPositiveButton>
            <StyledCommonWranningButton onClick={onClickDelete}>삭제</StyledCommonWranningButton>
          </>
        )}
      </StyledCommonFlexContainer>
      <StyledCommonFlexContainer>
        <StyledCommonNegativeButton role="link" onClick={onClickGoBack}>
          목록으로 돌아가기
        </StyledCommonNegativeButton>
      </StyledCommonFlexContainer>
    </StyledCommonWrap>
  );
};

const StyledHeader = styled.header``;

const StyledTitle = styled.h2`
  padding: 8px;
  font-size: 15px;
  word-break: break-all;
`;

const StyledContent = styled.div`
  padding: 24px 12px;
  color: ${colors.whiteGray};
`;

const StyledTextarea = styled.div`
  word-break: break-all;
`;

const StyledInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  font-size: 12px;
`;

const StyledName = styled.span`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  background-color: ${colors.gray4};
  font-size: 14px;
  line-height: 1;

  &::after {
    content: '님';
    padding-left: 4px;
    font-size: 12px;
    color: ${colors.gray5};
  }
`;

const StyledUnit = styled.span`
  color: ${colors.gray5};
`;

const StyledButton = styled.a``;

export default ArticleView;

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ExternalResponse } from '../@types/response';
import styled from '@emotion/styled';
import InputText, { focusRef } from '../components/common/InputText';
import { useParams } from 'react-router-dom';
import {
  StyledCommonFlexContainer,
  StyledCommonPositiveButton,
  StyledCommonNegativeButton,
  StyledCommonToastContainer,
  StyledCommonClosePopup,
} from '../styles/common';
import Textarea from '../components/common/Textarea';
import { createArticleItem, updateArticleItem } from '../api';
import ErrorNotice from '../components/common/ErrorNotice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isSuccessStatus } from '../config/status.code.config';
import Loading from 'src/components/common/Loading';
import useArticleItem from '../hooks/api/useArticleItem';

type ChangeEventElementType = HTMLInputElement | HTMLTextAreaElement;
type PostContentValue = 'title' | 'content';
export type PostContentValueType = Record<PostContentValue, string>;
type PostContentInValidType = Record<PostContentValue, boolean>;

interface PostContent {
  value: PostContentValueType;
  isValid: PostContentInValidType;
}

const ArticlePost = () => {
  const { articleId = '' } = useParams();
  const { data } = useArticleItem(articleId);
  const textFieldRef = useRef<focusRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textField, setTextField] = useState<PostContent>({
    value: {
      title: '',
      content: '',
    },
    isValid: {
      title: true,
      content: true,
    },
  });

  useEffect(() => {
    const { title, content } = data?.content || { title: '', content: '' };
    setTextField((currVal) => ({
      ...currVal,
      value: {
        title: title,
        content: content,
      },
    }));
  }, [data?.content]);

  const onChangeText = (e: React.FormEvent<ChangeEventElementType>) => {
    const { value, name } = e.currentTarget;
    const isLengthValid = name === 'title' ? value.length >= 5 : !!value;

    setTextField((currVal) => ({
      ...currVal,
      value: {
        ...currVal.value,
        [name]: value,
      },
      isValid: {
        ...currVal.isValid,
        [name]: isLengthValid,
      },
    }));
  };

  const { title: titleValue, content: contentValue } = textField.value;
  const { title: titleIsValid, content: contentIsValid } = textField.isValid;

  const onClickCancel = () => window.history.back();

  const onSubmitPost = () => {
    const { isValid, value } = textField;

    const inValidField = Object.entries(isValid).find((i) => {
      const isEmptyValue = !!value[i[0] as PostContentValue];
      return (!i[1] || !isEmptyValue) && i;
    })?.[0];

    if (!!inValidField) {
      textFieldRef.current?.[inValidField]();
      setTextField((currVal) => ({
        ...currVal,
        isValid: {
          ...currVal.isValid,
          [inValidField]: false,
        },
      }));

      return;
    }

    const requestArticle = async (data: PostContentValueType, articleId?: string) => {
      if (!!articleId) return await updateArticleItem<PostContentValueType>(data, articleId);
      return await createArticleItem<PostContentValueType>(data);
    };

    (async () => {
      setIsLoading(true);
      const response = await requestArticle(value, articleId);
      const { code, message } = response;
      const isSuccess = isSuccessStatus(code);

      const CloseButton = ({ closeToast }: { closeToast: () => void }) => {
        const onClickClose = () => {
          setIsLoading((prev) => {
            closeToast();
            if (isSuccess) {
              window.location.href = '/';
            }
            return !prev;
          });
        };
        return <StyledCommonClosePopup onClick={onClickClose}>X</StyledCommonClosePopup>;
      };

      const toastMessage = isSuccess
        ? `게시물을 ${!!articleId ? '수정' : '작성'}하였습니다. \n 잠시후 목록으로 이동 합니다.`
        : message;
      const toastMehod = isSuccess ? 'success' : 'error';

      toast[toastMehod](toastMessage, {
        position: 'top-center',
        theme: 'dark',
        autoClose: isSuccess ? 2000 : false,
        onClose: isSuccess ? () => (window.location.href = '/articles') : undefined,
        closeButton: CloseButton,
      });
    })();
  };

  return (
    <>
      {isLoading && <Loading isFull={true} msg={'잠시만 기다려주세요.'} />}
      <StyledCommonToastContainer />
      <StyledWrap>
        <StyledInner>
          <StyledHeader>
            <InputText
              isInValid={!titleIsValid}
              text="제목"
              value={titleValue}
              name="title"
              placeholder="제목을 입력해주세요."
              disabled={false}
              onChangeInput={onChangeText}
              ref={textFieldRef}
            />
            {!titleIsValid && <ErrorNotice text="제목은 5자 이상이여야 합니다." />}
          </StyledHeader>
          <StyledContent>
            <Textarea
              value={contentValue}
              isInValid={!contentIsValid}
              onChange={onChangeText}
              name="content"
              text="내용"
              ref={textFieldRef}
            />
          </StyledContent>
        </StyledInner>
        <StyledButtonWrap>
          <StyledCommonNegativeButton onClick={onClickCancel}>취소</StyledCommonNegativeButton>
          <StyledCommonPositiveButton isPositive={true} onClick={onSubmitPost}>
            작성하기
          </StyledCommonPositiveButton>
        </StyledButtonWrap>
      </StyledWrap>
    </>
  );
};

const StyledWrap = styled.main`
  padding: 0 12px;
`;

const StyledInner = styled.div``;

const StyledHeader = styled.header``;

const StyledContent = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const StyledButtonWrap = styled(StyledCommonFlexContainer)`
  width: 50%;
  gap: 5px;
  margin: 12px auto 0;
`;

export default ArticlePost;

import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import InputText, { focusRef } from '../components/common/InputText';
import {
  StyledCommonFlexContainer,
  StyledCommonPositiveButton,
  StyledCommonNegativeButton,
} from '../styles/common';
import Textarea from '../components/common/Textarea';
import { postArticleItem } from '../api';
import ErrorNotice from '../components/common/ErrorNotice';

type ChangeEventElementType = HTMLInputElement | HTMLTextAreaElement;
type PostContentValue = 'title' | 'content';
export type PostContentValueType = Record<PostContentValue, string>;
type PostContentInValidType = Record<PostContentValue, boolean>;

interface PostContent {
  value: PostContentValueType;
  isValid: PostContentInValidType;
}

const ArticlePost = () => {
  const textFieldRef = useRef<focusRef>(null);
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

    (async () => {
      const response = await postArticleItem(value);
      console.log(response);
    })();
  };

  console.log(contentIsValid, contentValue);

  return (
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

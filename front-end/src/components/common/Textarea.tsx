import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../styles/variables';
import { StyledCommonLabel } from '../../styles/common';

interface TextareaTypes {
  value: string;
  isInValid: boolean;
  onChange(e: React.FormEvent<HTMLTextAreaElement>): void;
  name: string;
  text: string;
}

const Textarea = forwardRef(
  // FIXME any
  ({ value, isInValid, onChange, name, text }: TextareaTypes, ref: any) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => ({
      ...ref.current,
      [name]: () => textareaRef.current?.focus(),
    }));
    return (
      <>
        <StyledCommonLabel isError={isInValid} htmlFor={name}>
          {text}
        </StyledCommonLabel>
        <StyledTextarea
          ref={textareaRef}
          name={name}
          cols={30}
          rows={10}
          value={value}
          isInValid={isInValid}
          onChange={onChange}
          id={name}
        />
      </>
    );
  },
);

const StyledTextarea = styled.textarea<{ isInValid: boolean }>`
  height: 300px;
  padding: 8px;
  border: 1px solid ${({ isInValid }) => (isInValid ? `${colors.warning}` : `${colors.gray}`)};
  border-radius: 4px;
  box-sizing: border-box;
`;

Textarea.displayName = 'textarea';

export default Textarea;

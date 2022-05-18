import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import styled from '@emotion/styled';
import { StyledCommonLabel } from '../../styles/common';
import { colors } from '../../styles/variables';
import { mixinPlaceholder } from '../../styles/mixin';

export type InputTypes = {
  type?: string | undefined;
  name: string;
  value: string;
  text: string;
  placeholder?: string;
  isInValid: boolean;
  disabled?: boolean;
  onChangeInput(e: React.FormEvent<HTMLInputElement>): void;
};

export interface focusRef {
  [key: string]: () => void;
}

const InputText = forwardRef(
  // FIXME any
  (
    {
      type = 'text',
      value,
      isInValid,
      name,
      text,
      placeholder,
      disabled,
      onChangeInput,
    }: InputTypes,
    ref?: any,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
      ...ref.current,
      [name]: () => inputRef.current?.focus(),
    }));

    return (
      <>
        {text && (
          <StyledCommonLabel isError={isInValid} htmlFor={name}>
            {text}
          </StyledCommonLabel>
        )}
        <StyledInput
          ref={inputRef}
          type={type}
          value={value}
          name={name}
          isInValid={isInValid}
          disabled={disabled}
          placeholder={placeholder || text}
          onChange={onChangeInput}
          id={name}
        />
      </>
    );
  },
);

const StyledInput = styled.input<{ isInValid: boolean }>`
  width: 100%;
  height: 35px;
  padding-left: 8px;
  border: 1px solid ${({ isInValid }) => (isInValid ? `${colors.warning}` : `${colors.gray}`)};
  border-radius: 4px;
  box-sizing: border-box;

  ${mixinPlaceholder()};
`;

InputText.displayName = `inputText`;

export default InputText;

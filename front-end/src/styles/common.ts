import styled from '@emotion/styled';

export const StyledCommonWrap = styled.main`
  background-color: white;
`;

export const StyledCommonTitle = styled.h2`
  font-size: 20px;
  padding: 20px;
`;

export const StyledCommonCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCommonButton = styled.button<{ isPositive: boolean }>`
  width: 100%;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: white;
  background-color: ${({ isPositive }) => (isPositive ? 'black' : 'gray')};
`;

export const StyledCommonSelectWrap = styled.div`
  position: relative;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    right: 16px;
    width: 1px;
    height: 8px;
    background-color: black;
    content: '';
  }

  &::before {
    transform: rotate(45deg) translateY(-50%);
  }

  &::after {
    transform: rotate(-45deg) translateY(-50%);
  }
`;

export const StyledCommonSelectBox = styled.select`
  appearance: none;
  width: 100%;
  height: 35px;
  padding: 0 30px 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

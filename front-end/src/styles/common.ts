import { CSSProperties } from '@emotion/serialize';
import styled from '@emotion/styled';
import { colors } from '../styles/variables';
import { ToastContainer } from 'react-toastify';

export const StyledCommonWrap = styled.main`
  padding: 0 10px;
  background-color: ${colors.black};
`;

export const StyledCommonTitle = styled.h2`
  font-size: 20px;
  padding: 20px 0;
`;

export const StyledCommonBlind = styled.div`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0 0 0 0);
`;

export const StyledCommonFlexContainer = styled.div<{
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  padding?: CSSProperties['padding'];
}>`
  display: flex;
  align-items: ${({ align }) => (align ? align : 'center')};
  justify-content: ${({ justify }) => (justify ? justify : 'center')};
  padding: ${({ padding }) => (padding ? padding : '0')};
`;

const StyledCommonButton = styled.button<{
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}>`
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : '35px')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-radius: 4px;
`;

export const StyledCommonPositiveButton = styled(StyledCommonButton)<{
  isPositive?: boolean;
}>`
  color: white;
  background-color: ${({ isPositive = true }) =>
    isPositive ? `${colors.darkBlue}` : `${colors.gray}`};
`;

export const StyledCommonNegativeButton = styled(StyledCommonButton)`
  color: white;
  background-color: ${colors.gray1};
`;

export const StyledCommonWranningButton = styled(StyledCommonButton)`
  color: white;
  background-color: ${colors.warning};
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

export const StyledCommonLabel = styled.label<{ isError?: boolean }>`
  display: block;
  height: 32px;
  font-weight: bold;
  color: ${({ isError }) => (isError ? `${colors.warning}` : 'inherit')};
`;

export const StyledCommonToastContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    max-width: 80%;
    margin: 0 auto;
    word-break: break-all;
    overflow: auto;
  }
`;

export const StyledCommonClosePopup = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: white;
`;

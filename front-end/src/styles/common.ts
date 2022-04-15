import { CSSProperties } from '@emotion/serialize';
import styled from '@emotion/styled';
import { colors } from '../styles/variables';

export const StyledCommonWrap = styled.main`
  padding: 0 10px;
  background-color: white;
`;

export const StyledCommonTitle = styled.h2`
  font-size: 20px;
  padding: 20px;
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
  background-color: ${({ isPositive }) => (isPositive ? `${colors.black}` : `${colors.gray}`)};
`;

export const StyledCommonNegativeButton = styled(StyledCommonButton)`
  color: white;
  background-color: ${colors.gray};
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

// article common components
export const StyledArticleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  span {
    flex-grow: 1;
    flex-shrink: 1;
    &:nth-of-type(1) {
      flex-basis: 8%;
      text-align: center;
    }
    &:nth-of-type(2) {
      flex-basis: 50%;
      padding-left: 10px;
    }
    &:nth-of-type(3) {
      flex-basis: 20%;
      text-align: center;
    }
    &:nth-of-type(4) {
      flex-basis: 22%;
      text-align: center;
    }
  }
`;

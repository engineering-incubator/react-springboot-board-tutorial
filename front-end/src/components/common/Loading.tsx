import React from 'react';
import styled from '@emotion/styled';
import { loadingBarAnimation } from '../../styles/mixin';
import { CSSProperties } from '@emotion/serialize';

type StylesType = {
  padding?: CSSProperties['padding'];
};
interface LoadingType {
  msg: string;
  isFull?: boolean;
  styles?: StylesType;
}

const Loading = ({ msg, isFull = false, styles }: LoadingType) => {
  const loadingBars = Array.from({ length: 5 }, (_, i) => i);

  return (
    <StyledWrap isFull={isFull} styles={styles}>
      <StyledText isFull={isFull}>{msg}</StyledText>
      <StyledLoadingBars>
        {loadingBars.map((i) => (
          <StyledLoadingBar key={i} position={i * 11} delay={(i + 1) * 1} isFull={isFull} />
        ))}
      </StyledLoadingBars>
    </StyledWrap>
  );
};

const StyledWrap = styled.div<{ isFull: boolean; styles?: StylesType }>`
  position: ${({ isFull }) => (isFull ? 'fixed' : 'static')};
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ isFull }) => (isFull ? 'rgba(0, 0, 0, 0.4)' : 'transparent')};
  z-index: 100;

  ${({ styles }) => styles && styles}
`;

const StyledText = styled.p<{ isFull: boolean }>`
  padding: 0 12px;
  font-size: 15px;
  color: ${({ isFull }) => (isFull ? 'white' : 'black')};
  white-space: normal;
  word-break: break-all;
`;

const StyledLoadingBars = styled.div`
  position: relative;
  width: 53px;
  height: 50px;
`;

const StyledLoadingBar = styled.span<{ position: number; delay: number; isFull: boolean }>`
  position: absolute;
  display: block;
  left: ${({ position }) => position}px;
  bottom: 10px;
  width: 9px;
  height: 5px;
  background: ${({ isFull }) => (isFull ? 'white' : 'black')};
  animation: ${loadingBarAnimation(
      `${({ isFull }: { isFull: boolean }) => (isFull ? 'black' : 'white')}`,
    )}
    1.5s infinite ease-in-out;
  animation-delay: ${({ delay }) => `0.${delay}`}s;
`;

export default Loading;

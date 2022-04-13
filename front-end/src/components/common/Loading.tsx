import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { loadingBarAnimation } from '../../styles/mixin';

interface LoadingType {
  msg: string;
  isFull?: boolean;
}

const Loading = ({ msg, isFull = false }: LoadingType) => {
  const loadingBars = Array.from({ length: 5 }, (_, i) => i);
  const color = isFull ? 'black' : 'white';
  // NOTE dim 을 flexible 하게..
  return (
    <StyledWrap isFull={isFull}>
      <StyledText isFull={isFull}>{msg}</StyledText>
      <StyledLoadingBars>
        {loadingBars.map((i) => (
          <StyledLoadingBar key={i} position={i * 11} delay={(i + 1) * 1} isFull={isFull} />
        ))}
      </StyledLoadingBars>
    </StyledWrap>
  );
};

const StyledWrap = styled.div<{ isFull: boolean }>`
  position: ${({ isFull }) => (isFull ? 'fixed' : 'static')};
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ isFull }) => (isFull ? 'rgba(0, 0, 0, 0.4)' : 'transparent')};
  z-index: 100;
`;

const StyledText = styled.p<{ isFull: boolean }>`
  padding: 0 20px;
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

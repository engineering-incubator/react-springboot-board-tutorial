import React from 'react';
import styled from '@emotion/styled';
import { barLoadingAnimation } from '../../styles/mixin';

interface Msg {
  msg: string;
}

const Loading = ({ msg }: Msg) => {
  const loadingBars = Array.from({ length: 5 }, (_, i) => i);
  return (
    <StyledWrap>
      <StyledText>{msg}</StyledText>
      <StyledLoadingBars>
        {loadingBars.map((i) => (
          <StyledLoadingBar key={i} position={i * 11} delay={(i + 1) * 1} />
        ))}
      </StyledLoadingBars>
    </StyledWrap>
  );
};

const StyledWrap = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

const StyledText = styled.p`
  padding: 0 20px;
  font-size: 15px;
  color: white;
  white-space: normal;
  word-break: break-all;
`;

const StyledLoadingBars = styled.div`
  position: relative;
  width: 53px;
  height: 50px;
`;

const StyledLoadingBar = styled.span<{ position: number; delay: number }>`
  position: absolute;
  display: block;
  left: ${({ position }) => position}px;
  bottom: 10px;
  width: 9px;
  height: 5px;
  background: #fff;
  animation: ${barLoadingAnimation} 1.5s infinite ease-in-out;
  animation-delay: ${({ delay }) => `0.${delay}`}s;
`;

export default Loading;

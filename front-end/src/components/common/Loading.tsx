import React from 'react';
import styled from '@emotion/styled';

interface Msg {
  msg: string;
}

const Loading = ({ msg }: Msg) => {
  return (
    <StyledWrap>
      <StyledText>{msg}</StyledText>
    </StyledWrap>
  );
};

const StyledWrap = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

const StyledText = styled.p`
  padding: 0 20px;
  font-size: 15px;
  color: white;
  white-space: normal;
  word-break: break-all;
  transform: translateY(-20%);
`;

export default Loading;

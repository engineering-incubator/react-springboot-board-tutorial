import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 0px 32px;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin: 0 0 28px 0;
`;

export const Button = styled.button`
  background: #ff334b;
  border-radius: 4px;
  border: none;
  padding: 12px 24px;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  &:hover {
    background: rgba(255, 51, 75, 0.8);
  }
`;

import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "./theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  padding: 0px 32px;
`;

export const NavigateLink = styled(Link)`
  &:hover,
  &:focus {
    color: ${(props) => props.colors || "red"}};
    font-weight: ${(props) => props.fontWeights || "700"};
  }
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const CardBox = styled.div`
  margin-bottom: 16px;
  padding: 20px;
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
`;

export const Title = styled.h1`
  display: inline-block;
  margin: 0 0 32px 0;
  color: ${theme.colors.gray};
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

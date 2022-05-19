import React from "react";
import styled from "styled-components";
import theme from "./style/theme";

export default function Footer() {
  const Container = styled.div`
    display: block;
    position: relative;
    width: 100%;
    padding: 32px 32px 80px 32px;
    border-top: 1px solid ${theme.colors.border};
    background: ${theme.colors.white};
    font-size: 14px;
    color: ${theme.colors.lightGray};
  `;

  return <Container>2022 @ireneworks</Container>;
}

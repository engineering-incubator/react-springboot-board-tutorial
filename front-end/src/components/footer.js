import React from "react";
import styled from "styled-components";

export default function Footer() {
  const Container = styled.div`
    display: block;
    border-top: 1px solid #eee;
    position: relative;
    width: 100%;
    padding: 32px 32px 80px 32px;
    font-size: 12px;
    color: #98a0b3;
    background: #fff;
  `;

  return <Container>2022 @ireneworks</Container>;
}

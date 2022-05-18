import React from "react";
import styled from "styled-components";

export default function ToTop() {
  const ToTop = styled.div`
    width: 40px;
    height: 40px;
    text-align: center;
    background: cyan;
    display: inline-block;
    position: relative;
  `;

  return <ToTop>위로</ToTop>;
}

import { keyframes } from '@emotion/react';
import { colors } from '../styles/variables';

export const blind = () => `
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0 0 0 0);
`;

export const mixinPlaceholder = (color = `${colors.gray3}`) => `
  &::-webkit-input-placeholder {
    color: ${color};
  }
  &:-moz-placeholder {
    color: ${color};
  }
  &:-ms-input-placeholder {
    color: ${color};
  }
  &::placeholder {
    color: ${color};
  }
`;

export const barLoadingAnimation = keyframes`
  from, 0% {
    height: 5px;
    transform: translateY(0px);
    background: rgba(255, 255, 255, 0.25);
  }
  25% {
    height: 30px;
    transform: translateY(15px);
    background: white;
  }
  50% {
    height: 5px;
    transform: translateY(0px);
    background: rgba(255, 255, 255, 0.25);
  }
  100% {
    height: 5px;
    transform: translateY(0px);
    background: rgba(255, 255, 255, 0.25);
}`;

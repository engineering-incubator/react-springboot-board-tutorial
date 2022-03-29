import { colors } from '_/styles/variables';

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

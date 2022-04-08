import { required } from "../../utilites/validates/utilityValidations";

const title = (value) => {
  return value.length > 5;
};

export const articleTitleValidates = [
  {
    validation: required,
    errorMessage: "제목을 입력해주세요.",
  },
  {
    validation: title,
    errorMessage: "5자 이상 입력해주세요.",
  },
];

export const articleContentValidates = [
  {
    validation: required,
    errorMessage: "내용을 입력해주세요.",
  },
];

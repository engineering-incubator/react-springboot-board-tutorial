export const idValidation = (value) => /^[a-z]+[a-z0-9]{5,19}$/g.test(value);

export const pwValidation = (value) => /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]*$/.test(value);

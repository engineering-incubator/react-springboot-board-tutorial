export const inputValidation = (value: string, reg: RegExp) => new RegExp(reg).test(value);

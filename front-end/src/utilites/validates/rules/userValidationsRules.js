export const userName = (value) => {
  return /[a-z0-9]{2,20}$/.test(value);
};
export const password = (value) => {
  return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/.test(value);
};
export const email = (value) => {
  return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
    value,
  );
};
export const phoneNumber = (value) => {
  return /^\d{3}-\d{3,4}-\d{4}$/.test(value);
};

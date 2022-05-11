export function isEmpty(value) {
  return !value;
}

export function isAllFilled(object) {
  return Object.values(object).every((x) => x !== null && x !== '');
}

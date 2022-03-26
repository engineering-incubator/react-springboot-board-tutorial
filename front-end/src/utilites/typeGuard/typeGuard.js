export function isString(target) {
  return typeof target === "string";
}

export function isEmpty(target) {
  if (isString(target)) {
    return target.length === 0;
  }
}

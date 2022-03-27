export function isUndefined(target) {
  return target === undefined;
}

export function isNull(target) {
  return target === null;
}

export function isNullish(target) {
  return isUndefined(target) || isNull(target);
}

export function isEmpty(target) {
  if (isNullish(target)) {
    // null 과 undefined 체크
    return true;
  }
  if (typeof target === "number") {
    // number 체크
    return target === 0;
  }
  if (typeof target === "string") {
    // string 체크
    return target.length === 0;
  }

  if (Array.isArray(target)) {
    // array 체크
    return target.length === 0;
  }

  // object 체크

  return Object.keys(target).length === 0;
}

export const articleDate = (date) => {
  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);
  return `${year}.${month}.${day}`;
};

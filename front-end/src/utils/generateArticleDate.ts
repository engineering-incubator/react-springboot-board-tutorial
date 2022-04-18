import dayjs from 'dayjs';
import relativeTIme from 'dayjs/plugin/relativeTime';
import isYesterday from 'dayjs/plugin/isYesterday';
dayjs.extend(relativeTIme);
dayjs.extend(isYesterday);

export const generateDate = (date: string) => {
  const isCreatedYesterday = dayjs(date).add(-1, 'day').isYesterday();
  return isCreatedYesterday ? dayjs(date).fromNow() : date.slice(2, 10);
};

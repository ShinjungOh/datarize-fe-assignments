import { format, parse } from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';

const formatDate = (date: Date) => format(date, DATE_FORMAT);

const parseDate = (dateString: string) => parse(dateString, DATE_FORMAT, new Date());

export const dateUtils = {
  formatDate,
  parseDate,
};

import { useState } from 'react';
import { dateUtils } from '@/utils/dateUtils.ts';

type UseDateRangeOptions = {
  initialFrom?: string;
  initialTo?: string;
};

export const useDateRange = (options: UseDateRangeOptions = {}) => {
  const initialFromDate = options.initialFrom ? dateUtils.parseDate(options.initialFrom) : undefined;
  const initialToDate = options.initialTo ? dateUtils.parseDate(options.initialTo) : undefined;

  const [from, setFrom] = useState<Date | undefined>(initialFromDate);
  const [to, setTo] = useState<Date | undefined>(initialToDate);

  const reset = () => {
    setFrom(initialFromDate);
    setTo(initialToDate);
  };

  const clear = () => {
    setFrom(undefined);
    setTo(undefined);
  };

  return {
    from,
    to,
    setFrom,
    setTo,
    reset,
    clear,
  };
};

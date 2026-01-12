import { numberUtils } from '@/utils/numberUtils';

type ParsedRange = {
  min: number;
  max: number;
};

const parseRange = (range: string): ParsedRange => {
  const parts = range.split(' - ');
  return {
    min: parseInt(parts[0], 10),
    max: parts[1] === 'Infinity' ? Infinity : parseInt(parts[1], 10),
  };
};

const formatPriceRange = (range: string) => {
  const { min, max } = parseRange(range);

  if (max === Infinity) {
    return `${numberUtils.formatNumber(min)}원 이상`;
  }
  return `${numberUtils.formatNumber(min)} ~ ${numberUtils.formatNumber(max)}원`;
};

export const purchaseUtils = {
  parseRange,
  formatPriceRange,
};

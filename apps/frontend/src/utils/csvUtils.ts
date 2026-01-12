import type { Purchase } from '@/types/purchase.type';
import { numberUtils } from '@/utils/numberUtils';

const CSV_HEADERS = ['date', 'customerName', 'productName', 'price', 'quantity'];

const escapeValue = (value: string): string => {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

const generatePurchasesCsv = (purchases: Purchase[]): string => {
  const rows = purchases.map((purchase) => [
    purchase.date,
    purchase.customerName,
    purchase.productName,
    numberUtils.formatNumber(purchase.price),
    numberUtils.formatNumber(purchase.quantity),
  ]);

  return [CSV_HEADERS.join(','), ...rows.map((row) => row.map(escapeValue).join(','))].join('\n');
};

const downloadCsv = (content: string, filename: string, onEmptyData?: () => void): boolean => {
  if (!content || content.split('\n').length <= 1) {
    onEmptyData?.();
    return false;
  }

  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
};

const generateCsvFilename = (from: string, to: string): string => {
  return `purchases_${from}_${to}.csv`;
};

export const csvUtils = {
  generatePurchasesCsv,
  downloadCsv,
  generateCsvFilename,
};

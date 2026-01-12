import { useState } from 'react';
import { getPurchaseFrequency, getPurchases } from '@/api/purchase.api';
import { PurchaseFrequency } from '@/types/purchase.type';
import { dateUtils } from '@/utils/dateUtils';
import { csvUtils } from '@/utils/csvUtils';

type UsePurchaseFrequencyParams = {
  from?: Date;
  to?: Date;
};

export const usePurchaseFrequency = ({ from, to }: UsePurchaseFrequencyParams) => {
  const [data, setData] = useState<PurchaseFrequency[]>([]);

  const fetchData = async ({ from, to }: { from: string; to: string }) => {
    const response = await getPurchaseFrequency({ from, to });
    setData(response);
  };

  const handleDownloadCsv = async () => {
    if (!from || !to) return;
    const fromString = dateUtils.formatDate(from);
    const toString = dateUtils.formatDate(to);
    const purchases = await getPurchases({ from: fromString, to: toString });
    const csvContent = csvUtils.generatePurchasesCsv(purchases);
    const filename = csvUtils.generateCsvFilename(fromString, toString);
    csvUtils.downloadCsv(csvContent, filename);
  };

  return {
    data,
    fetchData,
    handleDownloadCsv,
  };
};

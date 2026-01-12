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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async ({ from, to }: { from: string; to: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getPurchaseFrequency({ from, to });
      setData(response);
    } catch {
      setError('구매 빈도 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
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
    isLoading,
    error,
    fetchData,
    handleDownloadCsv,
  };
};

import { useState } from 'react';
import { getCustomersPurchases } from '@/api/customer.api';
import { CustomerPurchase } from '@/types/customer.type';
import { dateUtils } from '@/utils/dateUtils';

type UseCustomerPurchasesParams = {
  from?: Date;
  to?: Date;
};

export const useCustomerPurchases = ({ from, to }: UseCustomerPurchasesParams) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [customerPurchases, setCustomerPurchases] = useState<CustomerPurchase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCustomerClick = async (customerId: number) => {
    if (!from || !to) return;
    const fromDateString = dateUtils.formatDate(from);
    const toDateString = dateUtils.formatDate(to);

    setSelectedCustomerId(customerId);
    setIsLoading(true);
    setError(null);

    try {
      const purchasesResponse = await getCustomersPurchases(customerId, {
        from: fromDateString,
        to: toDateString,
      });

      setCustomerPurchases(purchasesResponse);
    } catch {
      setError('구매 내역을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailClick = (imgSrc: string) => {
    window.open(imgSrc, '_blank');
  };

  const handleBackClick = () => {
    setSelectedCustomerId(null);
    setCustomerPurchases([]);
  };

  return {
    selectedCustomerId,
    customerPurchases,
    isLoading,
    error,
    handleCustomerClick,
    handleThumbnailClick,
    handleBackClick,
  };
};

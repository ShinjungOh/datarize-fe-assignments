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

  const handleCustomerClick = async (customerId: number) => {
    if (!from || !to) return;
    const fromDateString = dateUtils.formatDate(from);
    const toDateString = dateUtils.formatDate(to);

    setSelectedCustomerId(customerId);

    const purchasesResponse = await getCustomersPurchases(customerId, {
      from: fromDateString,
      to: toDateString,
    });

    setCustomerPurchases(purchasesResponse);
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
    handleCustomerClick,
    handleThumbnailClick,
    handleBackClick,
  };
};

import { useState } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { Layout } from '@/components/layout/Layout';
import { SubHeader } from '@/components/layout/SubHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { Main } from '@/components/layout/Main';
import { DateFilter } from '@/components/common/DateFilter';
import { CustomerSearchSection } from '@/components/customer/CustomerSearchSection';
import { CustomerListTable } from '@/components/customer/CustomerListTable';
import { CustomerPagination } from '@/components/customer/CustomerPagination';
import { PurchaseFrequencyChartSection } from '@/components/purchase/PurchaseFrequencyChartSection';
import { PurchaseFrequencyTableSection } from '@/components/purchase/PurchaseFrequencyTableSection';
import { CustomerDetailsSection } from '@/components/customer/CustomerDetailsSection';
import { useDateRange } from '@/hooks/useDateRange';
import { usePurchaseFrequency } from '@/hooks/usePurchaseFrequency';
import { useCustomers } from '@/hooks/useCustomers';
import { dateUtils } from '@/utils/dateUtils';
import { DEFAULT_FROM_DATE, DEFAULT_TO_DATE } from '@/constants/date';
import { getCustomersPurchases } from '@/api/customer.api';
import { CustomerPurchase } from '@/types/customer.type';

export const DashboardPage = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [customerPurchases, setCustomerPurchases] = useState<CustomerPurchase[]>([]);

  const { from, to, setFrom, setTo } = useDateRange({
    initialFrom: DEFAULT_FROM_DATE,
    initialTo: DEFAULT_TO_DATE,
  });

  const {
    data: purchaseFrequencyData,
    fetchData: fetchPurchaseFrequency,
    handleDownloadCsv,
  } = usePurchaseFrequency({ from, to });

  const {
    customers,
    pagination,
    currentPage,
    searchName,
    sortBy,
    fetchCustomers,
    handleNameSearch,
    handleSort,
    handlePageChange,
    handleSearchNameChange,
  } = useCustomers({ from, to });

  const handleSearch = async () => {
    if (!from || !to) return;
    const fromDateString = dateUtils.formatDate(from);
    const toDateString = dateUtils.formatDate(to);

    await fetchPurchaseFrequency({ from: fromDateString, to: toDateString });
    await fetchCustomers(1);
  };

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

  return (
    <Layout>
      <SubHeader title="대시보드">
        <DateFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} onSearch={handleSearch} />
      </SubHeader>
      <Box display="flex" flex={1} overflow="hidden">
        <Sidebar>
          <CustomerSearchSection
            searchName={searchName}
            sortBy={sortBy}
            onSearchNameChange={handleSearchNameChange}
            onNameSearch={handleNameSearch}
            onSort={handleSort}
          />
          <CustomerListTable customers={customers} pagination={pagination} onCustomerClick={handleCustomerClick} />
          <CustomerPagination pagination={pagination} currentPage={currentPage} onPageChange={handlePageChange} />
        </Sidebar>
        <Main>
          <Stack gap={4}>
            {selectedCustomerId ? (
              <CustomerDetailsSection
                customerId={selectedCustomerId}
                data={customerPurchases}
                onThumbnailClick={handleThumbnailClick}
              />
            ) : (
              <>
                <PurchaseFrequencyChartSection data={purchaseFrequencyData} />
                <PurchaseFrequencyTableSection data={purchaseFrequencyData} onDownloadCsv={handleDownloadCsv} />
              </>
            )}
          </Stack>
        </Main>
      </Box>
    </Layout>
  );
};

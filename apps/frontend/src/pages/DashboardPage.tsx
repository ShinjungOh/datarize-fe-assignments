import { useEffect } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { Layout } from '@/components/layout/Layout';
import { SubHeader } from '@/components/layout/SubHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { Main } from '@/components/layout/Main';
import { DateFilter } from '@/components/common/DateFilter';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { CustomerSearchSection } from '@/components/customer/CustomerSearchSection';
import { CustomerListTable } from '@/components/customer/CustomerListTable';
import { CustomerPagination } from '@/components/customer/CustomerPagination';
import { PurchaseFrequencyChartSection } from '@/components/purchase/PurchaseFrequencyChartSection';
import { PurchaseFrequencyTableSection } from '@/components/purchase/PurchaseFrequencyTableSection';
import { CustomerPurchasesSection } from '@/components/customer/CustomerPurchasesSection';
import { useDateRange } from '@/hooks/useDateRange';
import { usePurchaseFrequency } from '@/hooks/usePurchaseFrequency';
import { useCustomers } from '@/hooks/useCustomers';
import { useCustomerPurchases } from '@/hooks/useCustomerPurchases';
import { dateUtils } from '@/utils/dateUtils';
import { DEFAULT_FROM_DATE, DEFAULT_TO_DATE } from '@/constants/date';

export const DashboardPage = () => {
  const { from, to, setFrom, setTo } = useDateRange({
    initialFrom: DEFAULT_FROM_DATE,
    initialTo: DEFAULT_TO_DATE,
  });

  const {
    data: purchaseFrequencyData,
    isLoading: isPurchaseFrequencyLoading,
    error: purchaseFrequencyError,
    fetchData: fetchPurchaseFrequency,
    handleDownloadCsv,
  } = usePurchaseFrequency({ from, to });

  const {
    customers,
    pagination,
    currentPage,
    searchName,
    sortBy,
    isLoading: isCustomersLoading,
    error: customersError,
    fetchCustomers,
    handleNameSearch,
    handleSort,
    handlePageChange,
    handleSearchNameChange,
  } = useCustomers({ from, to });

  const {
    selectedCustomerId,
    customerPurchases,
    isLoading: isCustomerPurchasesLoading,
    error: customerPurchasesError,
    handleCustomerClick,
    handleThumbnailClick,
    handleBackClick,
  } = useCustomerPurchases({
    from,
    to,
  });

  const handleSearch = async () => {
    if (!from || !to) return;
    const fromDateString = dateUtils.formatDate(from);
    const toDateString = dateUtils.formatDate(to);

    await fetchPurchaseFrequency({ from: fromDateString, to: toDateString });
    await fetchCustomers(1);
  };

  useEffect(() => {
    handleSearch();
  }, []);

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
          {isCustomersLoading && <LoadingSpinner />}
          {!isCustomersLoading && customersError && <ErrorMessage message={customersError} />}
          {!isCustomersLoading && !customersError && (
            <CustomerListTable
              customers={customers}
              pagination={pagination}
              searchName={searchName}
              onCustomerClick={handleCustomerClick}
            />
          )}
          <CustomerPagination pagination={pagination} currentPage={currentPage} onPageChange={handlePageChange} />
        </Sidebar>
        <Main>
          {selectedCustomerId && isCustomerPurchasesLoading && <LoadingSpinner />}
          {selectedCustomerId && !isCustomerPurchasesLoading && customerPurchasesError && (
            <ErrorMessage message={customerPurchasesError} />
          )}
          {selectedCustomerId && !isCustomerPurchasesLoading && !customerPurchasesError && (
            <CustomerPurchasesSection
              customerId={selectedCustomerId}
              customerName={customers.find((customer) => customer.id === selectedCustomerId)?.name ?? ''}
              data={customerPurchases}
              onThumbnailClick={handleThumbnailClick}
              onBackClick={handleBackClick}
            />
          )}

          {!selectedCustomerId && isPurchaseFrequencyLoading && <LoadingSpinner />}
          {!selectedCustomerId && !isPurchaseFrequencyLoading && purchaseFrequencyError && (
            <ErrorMessage message={purchaseFrequencyError} />
          )}
          {!selectedCustomerId && !isPurchaseFrequencyLoading && !purchaseFrequencyError && (
            <Stack gap={4}>
              <PurchaseFrequencyChartSection data={purchaseFrequencyData} />
              <PurchaseFrequencyTableSection data={purchaseFrequencyData} onDownloadCsv={handleDownloadCsv} />
            </Stack>
          )}
        </Main>
      </Box>
    </Layout>
  );
};

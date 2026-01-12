import { ChangeEvent, useState } from 'react';
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
import { useDateRange } from '@/hooks/useDateRange';
import { usePurchaseFrequency } from '@/hooks/usePurchaseFrequency';
import { dateUtils } from '@/utils/dateUtils';
import { getCustomers } from '@/api/customer.api';
import { Customer, Pagination as PaginationType } from '@/types/customer.type';

export const DashboardPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [sortBy, setSortBy] = useState<'id' | 'asc' | 'desc'>('id');

  const { from, to, setFrom, setTo } = useDateRange({
    initialFrom: '2025-10-01',
    initialTo: '2025-12-31',
  });

  const {
    data: purchaseFrequencyData,
    fetchData: fetchPurchaseFrequency,
    handleDownloadCsv,
  } = usePurchaseFrequency({ from, to });

  const fetchCustomers = async (page: number, name?: string, sort?: 'id' | 'asc' | 'desc') => {
    if (!from || !to) return;
    const fromDateString = dateUtils.formatDate(from);
    const toDateString = dateUtils.formatDate(to);

    const sortValue = sort ?? sortBy;

    const customersResponse = await getCustomers({
      from: fromDateString,
      to: toDateString,
      sortBy: sortValue === 'id' ? undefined : sortValue,
      name: name ?? (searchName || undefined),
      page,
    });

    setCustomers(customersResponse.data);
    setPagination(customersResponse.pagination);
  };

  const handleNameSearch = () => {
    setCurrentPage(1);
    fetchCustomers(1, searchName);
  };

  const handleSort = (sort: 'id' | 'asc' | 'desc') => {
    setSortBy(sort);
    setCurrentPage(1);
    fetchCustomers(1, searchName, sort);
  };

  const handleSearch = async () => {
    if (!from || !to) return;
    const fromDateString = dateUtils.formatDate(from);
    const toDateString = dateUtils.formatDate(to);

    await fetchPurchaseFrequency({ from: fromDateString, to: toDateString });
    setCurrentPage(1);
    await fetchCustomers(1);
  };

  const handlePageChange = (details: { page: number }) => {
    setCurrentPage(details.page);
    fetchCustomers(details.page);
  };

  const handleChangeCustomerNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
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
            onSearchNameChange={handleChangeCustomerNameInput}
            onNameSearch={handleNameSearch}
            onSort={handleSort}
          />
          <CustomerListTable customers={customers} pagination={pagination} />
          <CustomerPagination pagination={pagination} currentPage={currentPage} onPageChange={handlePageChange} />
        </Sidebar>
        <Main>
          <Stack gap={4}>
            <PurchaseFrequencyChartSection data={purchaseFrequencyData} />
            <PurchaseFrequencyTableSection data={purchaseFrequencyData} onDownloadCsv={handleDownloadCsv} />
          </Stack>
        </Main>
      </Box>
    </Layout>
  );
};

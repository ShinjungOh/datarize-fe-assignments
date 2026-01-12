import { useState } from 'react';
import { Box, Flex, Stack, Table, Text } from '@chakra-ui/react';
import { Layout } from '@/components/layout/Layout';
import { SubHeader } from '@/components/layout/SubHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { Main } from '@/components/layout/Main';
import { DateFilter } from '@/components/common/DateFilter';
import { PurchaseFrequencyChartSection } from '@/components/purchase/PurchaseFrequencyChartSection';
import { PurchaseFrequencyTableSection } from '@/components/purchase/PurchaseFrequencyTableSection';
import { useDateRange } from '@/hooks/useDateRange';
import { usePurchaseFrequency } from '@/hooks/usePurchaseFrequency';
import { dateUtils } from '@/utils/dateUtils';
import { getCustomers } from '@/api/customer.api';
import { Customer, Pagination } from '@/types/customer.type';
import { numberUtils } from '@/utils/numberUtils';

export const DashboardPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const { from, to, setFrom, setTo } = useDateRange({
    initialFrom: '2025-10-01',
    initialTo: '2025-12-31',
  });

  const {
    data: purchaseFrequencyData,
    fetchData: fetchPurchaseFrequency,
    handleDownloadCsv,
  } = usePurchaseFrequency({ from, to });

  const handleSearch = async () => {
    if (!from || !to) return;
    const fromDateString = dateUtils.formatDate(from);
    const toDateString = dateUtils.formatDate(to);

    await fetchPurchaseFrequency({ from: fromDateString, to: toDateString });

    const customersResponse = await getCustomers({ from: fromDateString, to: toDateString, sortBy: 'desc' });
    setCustomers(customersResponse.data);
    setPagination(customersResponse.pagination);
  };

  return (
    <Layout>
      <SubHeader title="대시보드">
        <DateFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} onSearch={handleSearch} />
      </SubHeader>
      <Box display="flex" flex={1} overflow="hidden">
        <Sidebar>
          {/* TODO: 고객 목록 분리 */}
          <Text fontSize="lg" fontWeight="semibold">
            고객 목록
          </Text>
          <Stack bg="white" p={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="sm" color="gray.600">
                전체 {pagination?.total ?? 0}명
              </Text>
              <Text fontSize="sm" color="gray.600">
                {pagination?.page ?? 0} / {pagination?.totalPages ?? 0} 페이지
              </Text>
            </Flex>
            <Table.Root size="sm" variant="line">
              <Table.Header>
                <Table.Row bg="gray.50">
                  <Table.ColumnHeader>ID</Table.ColumnHeader>
                  <Table.ColumnHeader>이름</Table.ColumnHeader>
                  <Table.ColumnHeader>총 구매 횟수</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">총 구매 금액</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {customers.map((customer) => (
                  <Table.Row key={customer.id}>
                    <Table.Cell>{customer.id}</Table.Cell>
                    <Table.Cell>{customer.name}</Table.Cell>
                    <Table.Cell>{numberUtils.formatNumber(customer.count)}</Table.Cell>
                    <Table.Cell textAlign="end">{numberUtils.formatNumber(customer.totalAmount)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Stack>
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

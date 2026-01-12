import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Layout } from '@/components/layout/Layout';
import { SubHeader } from '@/components/layout/SubHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { Main } from '@/components/layout/Main';
import { DateFilter } from '@/components/common/DateFilter';
import { useDateRange } from '@/hooks/useDateRange';
import { getPurchaseFrequency } from '@/api/purchase.api';
import { PurchaseFrequency } from '@/types/purchase.type';
import { dateUtils } from '@/utils/dateUtils';
import { purchaseUtils } from '@/utils/purchaseUtils';
import { numberUtils } from '@/utils/numberUtils';
import { Stack, Table } from '@chakra-ui/react';

export const DashboardPage = () => {
  const [purchaseFrequencyData, setPurchaseFrequencyData] = useState<PurchaseFrequency[]>([]);

  const { from, to, setFrom, setTo } = useDateRange({
    initialFrom: '2025-10-01',
    initialTo: '2025-12-31',
  });

  const handleSearch = async () => {
    if (!from || !to) return;
    const fromDateString = dateUtils.formatDate(from);
    const toDateString = dateUtils.formatDate(to);
    const responsePurchaseFrequency = await getPurchaseFrequency({ from: fromDateString, to: toDateString });
    setPurchaseFrequencyData(responsePurchaseFrequency);
  };

  return (
    <Layout>
      <SubHeader title="대시보드">
        <DateFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} onSearch={handleSearch} />
      </SubHeader>
      <Box display="flex" flex={1} overflow="hidden">
        <Sidebar>고객 목록</Sidebar>
        <Main>
          {/* TODO 테이블 컴포넌트 분리*/}
          <Stack gap={2} p={2}>
            <Text>상세 데이터</Text>
            <Stack gap="10">
              <Table.Root size="sm" variant="line">
                <Table.Header>
                  <Table.Row bg="gray.50">
                    <Table.ColumnHeader>가격대</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">구매 건수</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {purchaseFrequencyData.map((item) => (
                    <Table.Row key={item.range}>
                      <Table.Cell>{purchaseUtils.formatPriceRange(item.range)}</Table.Cell>
                      <Table.Cell textAlign="end">{numberUtils.formatNumber(item.count)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Stack>
          </Stack>
        </Main>
      </Box>
    </Layout>
  );
};

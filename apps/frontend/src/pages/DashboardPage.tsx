import { Box, Stack } from '@chakra-ui/react';
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

export const DashboardPage = () => {
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
  };

  return (
    <Layout>
      <SubHeader title="대시보드">
        <DateFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} onSearch={handleSearch} />
      </SubHeader>
      <Box display="flex" flex={1} overflow="hidden">
        <Sidebar>고객 목록</Sidebar>
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

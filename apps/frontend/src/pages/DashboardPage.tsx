import { useState } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { Layout } from '@/components/layout/Layout';
import { SubHeader } from '@/components/layout/SubHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { Main } from '@/components/layout/Main';
import { DateFilter } from '@/components/common/DateFilter';
import { PurchaseFrequencyChartSection } from '@/components/purchase/PurchaseFrequencyChartSection';
import { useDateRange } from '@/hooks/useDateRange';
import { getPurchaseFrequency, getPurchases } from '@/api/purchase.api';
import { PurchaseFrequency } from '@/types/purchase.type';
import { dateUtils } from '@/utils/dateUtils';
import { csvUtils } from '@/utils/csvUtils';
import { PurchaseFrequencyTableSection } from '@/components/purchase/PurchaseFrequencyTableSection';

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

  const handleDownloadCsv = async () => {
    if (!from || !to) return;

    const fromString = dateUtils.formatDate(from);
    const toString = dateUtils.formatDate(to);

    const purchases = await getPurchases({ from: fromString, to: toString });
    const csvContent = csvUtils.generatePurchasesCsv(purchases);
    const filename = csvUtils.generateCsvFilename(fromString, toString);

    csvUtils.downloadCsv(csvContent, filename);
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

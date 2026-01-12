import { Stack, Text } from '@chakra-ui/react';
import { Chart, useChart } from '@chakra-ui/charts';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { PurchaseFrequency } from '@/types/purchase.type';
import { purchaseUtils } from '@/utils/purchaseUtils';
import { numberUtils } from '@/utils/numberUtils';

type PurchaseFrequencyChartSectionProps = {
  data: PurchaseFrequency[];
};

export const PurchaseFrequencyChartSection = ({ data }: PurchaseFrequencyChartSectionProps) => {
  const chart = useChart({
    data: data.map((item) => ({
      range: purchaseUtils.formatPriceRange(item.range),
      count: item.count,
    })),
    series: [{ name: 'count', color: 'blue.400', label: '구매 건수' }],
  });

  return (
    <Stack gap={4} p={6} bg="white">
      <Text fontSize="lg" fontWeight="semibold">
        가격대별 구매 빈도
      </Text>
      <Chart.Root maxH="sm" chart={chart}>
        <BarChart data={chart.data}>
          <CartesianGrid stroke={chart.color('border.muted')} vertical={false} />
          <XAxis axisLine={false} tickLine={false} dataKey={chart.key('range')} />
          <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => numberUtils.formatNumber(value)} />
          <Tooltip cursor={{ fill: chart.color('bg.muted') }} animationDuration={0} content={<Chart.Tooltip />} />
          {chart.series.map((item) => (
            <Bar
              isAnimationActive={false}
              key={item.name}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
            />
          ))}
        </BarChart>
      </Chart.Root>
    </Stack>
  );
};

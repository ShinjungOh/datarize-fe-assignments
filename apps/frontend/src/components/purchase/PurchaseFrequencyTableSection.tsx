import { Stack, Table, Text } from '@chakra-ui/react';
import { PurchaseFrequency } from '@/types/purchase.type';
import { purchaseUtils } from '@/utils/purchaseUtils';
import { numberUtils } from '@/utils/numberUtils';

type PurchaseFrequencyTableSectionProps = {
  data: PurchaseFrequency[];
};

export const PurchaseFrequencyTableSection = ({ data }: PurchaseFrequencyTableSectionProps) => (
  <Stack gap={4} p={6} minH="500px" bg="white">
    <Text fontSize="lg" fontWeight="semibold">
      상세 데이터
    </Text>
    <Stack gap="10">
      <Table.Root size="sm" variant="line">
        <Table.Header>
          <Table.Row bg="gray.50">
            <Table.ColumnHeader>가격대</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">구매 건수</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.range}>
              <Table.Cell>{purchaseUtils.formatPriceRange(item.range)}</Table.Cell>
              <Table.Cell textAlign="end">{numberUtils.formatNumber(item.count)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  </Stack>
);

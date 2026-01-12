import { Button, Flex, Stack, Table, Text } from '@chakra-ui/react';
import { PurchaseFrequency } from '@/types/purchase.type';
import { purchaseUtils } from '@/utils/purchaseUtils';
import { numberUtils } from '@/utils/numberUtils';

type PurchaseFrequencyTableSectionProps = {
  data: PurchaseFrequency[];
  onDownloadCsv: () => void;
};

export const PurchaseFrequencyTableSection = ({ data, onDownloadCsv }: PurchaseFrequencyTableSectionProps) => {
  return (
    <Stack gap={4} p={6} minH="500px" bg="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="semibold">
          상세 데이터
        </Text>
        <Button onClick={onDownloadCsv}>CSV 다운로드</Button>
      </Flex>
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
};

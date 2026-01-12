import { Image, Stack, Table, Text } from '@chakra-ui/react';
import { EmptyState } from '@/components/common/EmptyState';
import { EMPTY_MESSAGES } from '@/constants/messages';
import { colors } from '@/theme/theme';
import { numberUtils } from '@/utils/numberUtils';
import { CustomerPurchase } from '@/types/customer.type';

type CustomerPurchasesSectionProps = {
  customerId: number;
  data: CustomerPurchase[];
  onThumbnailClick: (imgSrc: string) => void;
};

export const CustomerPurchasesSection = ({ customerId, data, onThumbnailClick }: CustomerPurchasesSectionProps) => {
  return (
    <Stack gap={4} p={6} bg="white">
      <Text fontSize="lg" fontWeight="semibold">
        고객 ID {customerId} 상세 구매 내역 (총 {data.length}건)
      </Text>
      {data.length === 0 ? (
        <EmptyState message={EMPTY_MESSAGES.NO_PURCHASES} minH="200px" />
      ) : (
        <Table.Root size="sm" variant="line">
          <Table.Header>
            <Table.Row bg={colors.gray1}>
              <Table.ColumnHeader>구매날짜</Table.ColumnHeader>
              <Table.ColumnHeader>제품</Table.ColumnHeader>
              <Table.ColumnHeader>제품명</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">구매 수량</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">제품 가격</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((purchase, index) => (
              <Table.Row key={index}>
                <Table.Cell>{purchase.date}</Table.Cell>
                <Table.Cell onClick={() => onThumbnailClick(purchase.imgSrc)} cursor="pointer">
                  <Image src={purchase.imgSrc} alt={purchase.product} w="50px" h="50px" objectFit="cover" />
                </Table.Cell>
                <Table.Cell>{purchase.product}</Table.Cell>
                <Table.Cell textAlign="center">{purchase.quantity}</Table.Cell>
                <Table.Cell textAlign="end">{numberUtils.formatNumber(purchase.price)}원</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Stack>
  );
};

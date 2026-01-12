import { Image, Stack, Table, Text } from '@chakra-ui/react';
import { numberUtils } from '@/utils/numberUtils';
import { CustomerPurchase } from '@/types/customer.type';

type CustomerDetailsSectionProps = {
  customerId: number;
  data: CustomerPurchase[];
  onThumbnailClick: (imgSrc: string) => void;
};

export const CustomerDetailsSection = ({ customerId, data, onThumbnailClick }: CustomerDetailsSectionProps) => {
  return (
    <Stack gap={4} p={6} bg="white">
      <Text fontSize="lg" fontWeight="semibold">
        고객 ID {customerId} 상세 구매 내역
      </Text>
      <Table.Root size="sm" variant="line">
        <Table.Header>
          <Table.Row bg="gray.50">
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
    </Stack>
  );
};

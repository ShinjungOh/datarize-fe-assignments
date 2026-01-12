import { Flex, Image, Stack, Table, Text } from '@chakra-ui/react';
import { EmptyState } from '@/components/common/EmptyState';
import { InfoBox } from '@/components/common/InfoBox';
import { EMPTY_MESSAGES } from '@/constants/messages';
import { colors } from '@/theme/theme';
import { numberUtils } from '@/utils/numberUtils';
import { CustomerPurchase } from '@/types/customer.type';
import { LuChevronLeft } from 'react-icons/lu';

type CustomerPurchasesSectionProps = {
  customerId: number;
  customerName: string;
  data: CustomerPurchase[];
  onThumbnailClick: (imgSrc: string) => void;
};

export const CustomerPurchasesSection = ({
  customerId,
  customerName,
  data,
  onThumbnailClick,
}: CustomerPurchasesSectionProps) => {
  const totalAmount = data.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Stack gap={4} p={4}>
      <Flex align="center" gap={1} cursor="pointer" onClick={handleBackClick}>
        <LuChevronLeft color={colors.gray4} />
        <Text fontSize="md" color={colors.gray4}>
          이전으로
        </Text>
      </Flex>

      <Text fontSize="xl" fontWeight="bold">
        {customerName}
      </Text>
      <Flex gap={4}>
        <InfoBox label="ID" value={customerId} />
        <InfoBox label="구매 횟수" value={`${data.length}회`} />
        <InfoBox label="총 금액" value={`${numberUtils.formatNumber(totalAmount)}원`} />
      </Flex>

      <Stack gap={4} p={6} bg="white" borderRadius="md" boxShadow="xs">
        <Text fontSize="lg" fontWeight="semibold">
          구매 내역 (총 {data.length}건)
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
                <Table.ColumnHeader textAlign="end">최종 금액</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((purchase, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{purchase.date}</Table.Cell>
                  <Table.Cell onClick={() => onThumbnailClick(purchase.imgSrc)} cursor="pointer">
                    <Image src={purchase.imgSrc} alt={purchase.product} w="40px" h="40px" objectFit="cover" />
                  </Table.Cell>
                  <Table.Cell>{purchase.product}</Table.Cell>
                  <Table.Cell textAlign="center">{purchase.quantity}</Table.Cell>
                  <Table.Cell textAlign="end">{numberUtils.formatNumber(purchase.price)}원</Table.Cell>
                  <Table.Cell textAlign="end">
                    {numberUtils.formatNumber(purchase.price * purchase.quantity)}원
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Stack>
    </Stack>
  );
};

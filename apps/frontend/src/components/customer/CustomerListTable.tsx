import { Flex, Stack, Table, Text } from '@chakra-ui/react';
import { Customer, Pagination } from '@/types/customer.type';
import { numberUtils } from '@/utils/numberUtils';

type CustomerListTableProps = {
  customers: Customer[];
  pagination: Pagination | null;
  onCustomerClick: (customerId: number) => void;
};

export const CustomerListTable = ({ customers, pagination, onCustomerClick }: CustomerListTableProps) => {
  return (
    <Stack p={4} flex={1} overflow="auto">
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
            <Table.ColumnHeader textAlign="center">총 구매 횟수</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">총 구매 금액</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customers.map((customer) => (
            <Table.Row
              key={customer.id}
              onClick={() => onCustomerClick(customer.id)}
              cursor="pointer"
              _hover={{ bg: 'gray.100' }}
            >
              <Table.Cell>{customer.id}</Table.Cell>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell textAlign="center">{numberUtils.formatNumber(customer.count)}</Table.Cell>
              <Table.Cell textAlign="end">{numberUtils.formatNumber(customer.totalAmount)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

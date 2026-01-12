import { Box, ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Pagination as PaginationType } from '@/types/customer.type';

type CustomerPaginationProps = {
  pagination: PaginationType | null;
  currentPage: number;
  onPageChange: (details: { page: number }) => void;
};

export const CustomerPagination = ({ pagination, currentPage, onPageChange }: CustomerPaginationProps) => {
  return (
    <Box p={2} borderTop="1px solid" borderColor="gray.200">
      <Pagination.Root
        count={pagination?.total ?? 0}
        pageSize={pagination?.limit ?? 10}
        page={currentPage}
        onPageChange={onPageChange}
      >
        <ButtonGroup variant="ghost" size="sm" w="100%" justifyContent="center">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.Items
            render={(page) => <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>{page.value}</IconButton>}
          />
          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Box>
  );
};

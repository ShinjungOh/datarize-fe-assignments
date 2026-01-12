import { ChangeEvent } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { SortType } from '@/types/customer.type';
import { colors } from '@/theme/theme';

type CustomerSearchSectionProps = {
  searchName: string;
  sortBy: SortType;
  onSearchNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNameSearch: () => void;
  onSort: (sort: SortType) => void;
};

export const CustomerSearchSection = ({
  searchName,
  sortBy,
  onSearchNameChange,
  onNameSearch,
  onSort,
}: CustomerSearchSectionProps) => {
  return (
    <>
      <Flex pt={4} px={4} gap={2} alignItems="center">
        <Input placeholder="검색할 이름을 입력하세요" value={searchName} onChange={onSearchNameChange} />
        <Button size="md" onClick={onNameSearch}>
          검색
        </Button>
      </Flex>
      <Flex p={2} gap={2} justifyContent="center" alignItems="center">
        <Button
          size="sm"
          onClick={() => onSort('id')}
          variant={sortBy === 'id' ? 'solid' : 'outline'}
          bg={sortBy === 'id' ? colors.secondary : undefined}
        >
          ID순
        </Button>
        <Button
          size="sm"
          onClick={() => onSort('desc')}
          variant={sortBy === 'desc' ? 'solid' : 'outline'}
          bg={sortBy === 'desc' ? colors.secondary : undefined}
        >
          높은금액순
        </Button>
        <Button
          size="sm"
          onClick={() => onSort('asc')}
          variant={sortBy === 'asc' ? 'solid' : 'outline'}
          bg={sortBy === 'asc' ? colors.secondary : undefined}
        >
          낮은금액순
        </Button>
      </Flex>
    </>
  );
};

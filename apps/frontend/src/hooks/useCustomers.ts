import { ChangeEvent, useState } from 'react';
import { getCustomers } from '@/api/customer.api';
import { Customer, Pagination, SortType } from '@/types/customer.type';
import { dateUtils } from '@/utils/dateUtils';

type UseCustomersParams = {
  from?: Date;
  to?: Date;
};

export const useCustomers = ({ from, to }: UseCustomersParams) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('id');

  const fetchCustomers = async (page: number, name?: string, sort?: SortType) => {
    if (!from || !to) return;
    const fromDateString = dateUtils.formatDate(from);
    const toDateString = dateUtils.formatDate(to);

    const sortValue = sort ?? sortBy;

    const customersResponse = await getCustomers({
      from: fromDateString,
      to: toDateString,
      sortBy: sortValue === 'id' ? undefined : sortValue,
      name: name ?? (searchName || undefined),
      page,
    });

    setCustomers(customersResponse.data);
    setPagination(customersResponse.pagination);
  };

  const handleNameSearch = () => {
    setCurrentPage(1);
    fetchCustomers(1, searchName);
  };

  const handleSort = (sort: SortType) => {
    setSortBy(sort);
    setCurrentPage(1);
    fetchCustomers(1, searchName, sort);
  };

  const handlePageChange = (details: { page: number }) => {
    setCurrentPage(details.page);
    fetchCustomers(details.page);
  };

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  return {
    customers,
    pagination,
    currentPage,
    searchName,
    sortBy,
    fetchCustomers,
    handleNameSearch,
    handleSort,
    handlePageChange,
    handleSearchNameChange,
  };
};

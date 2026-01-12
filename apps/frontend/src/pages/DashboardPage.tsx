import { Box } from '@chakra-ui/react';
import { Layout } from '@/components/layout/Layout';
import { SubHeader } from '@/components/layout/SubHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { Main } from '@/components/layout/Main';

export const DashboardPage = () => {
  return (
    <Layout>
      <SubHeader title="대시보드" />
      <Box display="flex" flex={1} overflow="hidden">
        <Sidebar>고객 목록</Sidebar>
        <Main>구매 빈도</Main>
      </Box>
    </Layout>
  );
};

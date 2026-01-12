import { Box } from '@chakra-ui/react';
import { Header } from '@/components/layout/Header';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box display="flex" flexDirection="column" h="100vh" overflow="hidden">
      <Header />
      {children}
    </Box>
  );
};

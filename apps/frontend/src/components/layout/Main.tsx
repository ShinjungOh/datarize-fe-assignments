import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

export const Main = ({ children }: MainProps) => {
  return (
    <Box as="main" flex={1} overflow="auto" p={6} bg="gray.50">
      {children}
    </Box>
  );
};

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { colors } from '@/theme/theme';

type MainProps = {
  children: ReactNode;
};

export const Main = ({ children }: MainProps) => {
  return (
    <Box as="main" flex={1} overflow="auto" p={6} bg={colors.gray1}>
      {children}
    </Box>
  );
};

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type SidebarProps = {
  children: ReactNode;
};

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <Box as="aside" w="360px" display="flex" flexDirection="column" overflow="auto" borderRight="1px solid black">
      {children}
    </Box>
  );
};

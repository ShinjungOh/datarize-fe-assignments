import { Box, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { colors } from '@/theme/theme';

type SubHeaderProps = {
  title: string;
  children?: ReactNode;
};

export const SubHeader = ({ title, children }: SubHeaderProps) => {
  return (
    <Box
      as="section"
      h="56px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={6}
      borderBottom="1px solid"
      borderColor={colors.gray2}
    >
      <Box display="flex" alignItems="center" gap={4}>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
      </Box>
      {children}
    </Box>
  );
};

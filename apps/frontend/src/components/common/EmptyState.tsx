import { Flex, Text } from '@chakra-ui/react';
import { colors } from '@/theme/theme';

type EmptyStateProps = {
  message: string;
  minH?: string;
};

export const EmptyState = ({ message, minH }: EmptyStateProps) => {
  return (
    <Flex flex={1} justifyContent="center" alignItems="center" minH={minH}>
      <Text color={colors.gray4}>{message}</Text>
    </Flex>
  );
};

import { Flex, Text } from '@chakra-ui/react';

type EmptyStateProps = {
  message: string;
  minH?: string;
};

export const EmptyState = ({ message, minH }: EmptyStateProps) => {
  return (
    <Flex flex={1} justifyContent="center" alignItems="center" minH={minH}>
      <Text color="gray.500">{message}</Text>
    </Flex>
  );
};

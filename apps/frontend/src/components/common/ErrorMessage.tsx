import { Flex, Text } from '@chakra-ui/react';
import { colors } from '@/theme/theme';

type ErrorMessageProps = {
  message: string;
  flex?: number;
};

export const ErrorMessage = ({ message, flex = 1 }: ErrorMessageProps) => {
  return (
    <Flex flex={flex} justify="center" align="center">
      <Text color={colors.alert}>{message}</Text>
    </Flex>
  );
};

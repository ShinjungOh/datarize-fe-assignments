import { Flex, Spinner } from '@chakra-ui/react';
import { colors } from '@/theme/theme';

type LoadingSpinnerProps = {
  flex?: number;
};

export const LoadingSpinner = ({ flex = 1 }: LoadingSpinnerProps) => {
  return (
    <Flex flex={flex} justify="center" align="center">
      <Spinner color={colors.info} animationDuration="0.8s" />
    </Flex>
  );
};

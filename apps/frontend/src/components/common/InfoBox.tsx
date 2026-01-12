import { Flex, Text } from '@chakra-ui/react';
import { colors } from '@/theme/theme';

type InfoBoxProps = {
  label: string;
  value: string | number;
};

export const InfoBox = ({ label, value }: InfoBoxProps) => {
  return (
    <Flex
      flex={1}
      p={4}
      minH="80px"
      bg="white"
      border="1px solid"
      borderColor={colors.gray2}
      borderRadius="md"
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      gap={1}
    >
      <Text fontSize="sm" color={colors.gray4}>
        {label}
      </Text>
      <Text fontSize="lg" fontWeight="semibold">
        {value}
      </Text>
    </Flex>
  );
};

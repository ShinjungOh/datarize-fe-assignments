import { Box, Flex } from '@chakra-ui/react';
import { colors } from '@/theme/theme';

export const Header = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <Box
      as="header"
      h="60px"
      display="flex"
      alignItems="center"
      px={6}
      borderBottom="1px solid"
      borderColor={colors.gray2}
    >
      <Flex h="100%" onClick={handleLogoClick}>
        <img
          src="https://cdn.datarize.io/console-v4/imgs/logo-black.svg"
          alt="logo"
          style={{ objectFit: 'contain', width: 140, cursor: 'pointer' }}
        />
      </Flex>
    </Box>
  );
};

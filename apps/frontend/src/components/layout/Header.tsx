import { Box } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box as="header" h="60px" display="flex" alignItems="center" px={6} borderBottom="1px solid black">
      <img
        src="https://cdn.datarize.io/console-v4/imgs/logo-black.svg"
        alt="logo"
        style={{ objectFit: 'contain', width: 140 }}
      />
    </Box>
  );
};

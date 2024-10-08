/* make a colorModeSwitcher.js file in src and add this code and import in the main.jsx or index.js */

import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      zIndex={'overlay'}
      variant="ghost"
      color="current"
      pos={"fixed"}
      top={"4"}
      right={"4"}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};

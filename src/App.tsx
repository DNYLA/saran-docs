import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  extendTheme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './components/Navbar';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};
const theme = extendTheme({ config: { initialColorMode: 'dark' }, colors });

export const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </BrowserRouter>
  );
};

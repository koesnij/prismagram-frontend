import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Styles/GlobalStyles';
import Client from '../Apollo/Client';
import Theme from '../Styles/Theme';
import Router from './Router';

export default () => (
  <ThemeProvider theme={Theme}>
    <ApolloProvider client={Client}>
      <GlobalStyles />
      <Router isLoggedIn={false} />
    </ApolloProvider>
  </ThemeProvider>
);

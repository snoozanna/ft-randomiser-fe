import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { QuestionProvider } from './src/context/questions.context';
import { MenuProvider } from './src/context/menu.context';
import client from './src/utils/client';
import Layout from './src/components/Layout';
import { FormProvider } from './src/context/form.context';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <QuestionProvider>
      <FormProvider>{element}</FormProvider>
    </QuestionProvider>
  </ApolloProvider>
);

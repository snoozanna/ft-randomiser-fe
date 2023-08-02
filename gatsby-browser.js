import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/gatsby-plugin-apollo/client';
import Layout from './src/components/Layout';
import { QuestionProvider } from './src/context/questions.context';
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

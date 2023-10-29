import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./src/gatsby-plugin-apollo/client";
import Layout from "./src/components/Layout";
import { QuestionProvider } from "./src/context/questions.context";
import { TimerProvider } from "./src/context/timer.context";

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <QuestionProvider>
      <TimerProvider>{element}</TimerProvider>
    </QuestionProvider>
  </ApolloProvider>
);

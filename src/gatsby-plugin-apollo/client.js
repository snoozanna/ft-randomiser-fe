import fetch from 'isomorphic-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://vlp0qz8p.api.sanity.io/v1/graphql/production/default/',
    credentials: 'include',
    fetchOptions: {
      mode: 'cors',
    },
    https: fetch,
  }),
});

export default client;

import { gql } from '@apollo/client';

const Q_BY_CATEGORY_QUERY = gql`
  query myQuery {
    allSanityCategory {
      nodes {
        id
        name
      }
    }
  }
`;

export default Q_BY_CATEGORY_QUERY;

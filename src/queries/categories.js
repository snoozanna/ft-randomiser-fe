import { gql } from '@apollo/client';

const CATEGORY_QUERY = gql`
  query CatQuery {
    categories: allCategory {
      _id
      name
    }
  }
`;

export default CATEGORY_QUERY;

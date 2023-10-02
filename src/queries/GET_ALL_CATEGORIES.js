import { gql } from '@apollo/client';

const GET_ALL_CATEGORIES = gql`
  query CatQuery {
    categories: allCategory {
      _id
      name
    }
  }
`;

export default GET_ALL_CATEGORIES;

import { gql } from '@apollo/client';

const QUESTIONS_QUERY = gql`
  query QQuery {
    questions: allQuestion {
      _id
      category {
        name
      }
      question
    }
    categories: allCategory {
      _id
      name
    }
  }
`;

export default QUESTIONS_QUERY;

// import { gql } from '@apollo/client';
import gql from 'graphql-tag';

const Q_BY_DEEP = gql`
  {
    questions: allQuestion(where: { level: { matches: "Deep" } }) {
      question
      _id
      category {
        name
      }
      level
    }
  }
`;

export default Q_BY_DEEP;

// import { gql } from '@apollo/client';
import gql from 'graphql-tag';

const Q_BY_MEDIUM = gql`
  {
    questions: allQuestion(where: { level: { matches: "Medium" } }) {
      question
      _id
      category {
        name
      }
      level
    }
  }
`;

export default Q_BY_MEDIUM;

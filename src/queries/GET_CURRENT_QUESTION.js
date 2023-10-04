import { gql } from '@apollo/client';
// import gql from 'graphql-tag';
const GET_CURRENT_QUESTION = gql`
query CurQueQuery  {
    currentQ: allCurrent(limit: 1) {
      question {
        _id
        question
      }
    }
  }
`;


export default GET_CURRENT_QUESTION;


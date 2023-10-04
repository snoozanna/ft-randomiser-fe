import { gql } from '@apollo/client';
// import gql from 'graphql-tag';
const GET_ALL_UNASKED_Q = gql`
  {
    questions: allQuestion(where: { beenAsked: { eq: false } }, limit: 10) {
      question
      _id
      category {
        name
      }
      level
    }
  }
`;


export default GET_ALL_UNASKED_Q;


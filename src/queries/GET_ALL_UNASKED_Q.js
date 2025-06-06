import { gql } from '@apollo/client';
// import gql from 'graphql-tag';
const GET_ALL_UNASKED_Q = gql`
  {
    # questions: allQuestion(where: { beenAsked: { eq: false } }, limit: 10) {
       questions: allQuestion(where: { beenAsked: { eq: false } }) {
      question
      altQuestion
      followUp
      _id
      category {
        name
      }
      level
      beenAsked
      requireLockIn
      nonNeg
      documentary
      needToComeLater
      onlySuitableForSpermHaver
    }
  }
`;


export default GET_ALL_UNASKED_Q;


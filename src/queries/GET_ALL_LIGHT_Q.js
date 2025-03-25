import { gql } from '@apollo/client';
// import gql from 'graphql-tag';
const GET_ALL_LIGHT_Q = gql`
  {
    # questions: allQuestion(where: { beenAsked: { eq: false } }, limit: 10) {
    questions: allQuestion(
      where: { beenAsked: { eq: false }, level: { eq: "lighthearted" } }
    ) {
      question
      _id
      category {
        name
      }
      level
      beenAsked
      requireLockIn
      nonNeg
      documentary
      onlySuitableForSpermHaver
    }
  }
`;


export default GET_ALL_LIGHT_Q;


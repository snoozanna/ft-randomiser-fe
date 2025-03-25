import { gql } from '@apollo/client';
// import gql from 'graphql-tag';
const GET_ALL_UNASKED_Q = gql`
  {
    # questions: allQuestion(where: { beenAsked: { eq: false } }, limit: 10) {
    questions: allQuestion(where: { beenAsked: { eq: false } }) {
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
    currentQ: allCurrentQ {
      question{
        question
      }
      questionInProgress
    }
  }
`;


export default GET_ALL_UNASKED_Q;


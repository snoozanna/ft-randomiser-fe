import { gql } from '@apollo/client';
// import gql from 'graphql-tag';
const GET_ALL_RAPID_Q = gql`
  {
    # questions: allQuestion(where: { beenAsked: { eq: false } }, limit: 10) {
       questions: allRapidFire(where: { beenAsked: { eq: false } }) {
    
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
    }
  
  }
`;


export default GET_ALL_RAPID_Q;


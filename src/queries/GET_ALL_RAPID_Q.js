import { gql } from '@apollo/client';
// import gql from 'graphql-tag';
const GET_ALL_RAPID_Q = gql`
  {
    # questions: allQuestion(where: { beenAsked: { eq: false } }, limit: 10) {
       rapidfire: allRapidFire(where: { beenAsked: { eq: false } }) {
      question
      _id
      beenAsked
    }
  }
`;


export default GET_ALL_RAPID_Q;


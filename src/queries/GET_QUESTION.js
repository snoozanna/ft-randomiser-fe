import { gql } from '@apollo/client';
// import gql from 'graphql-tag';
// TODO NOT SURE IF THIS WORKS 
const GET_QUESTION = gql`
  query SingleQueQuery($id: ID!) {
    question:Question(_id: { eq: $id }) {
      question
    }
  }
`;


export default GET_QUESTION;


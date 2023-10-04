import { gql } from "@apollo/client";

// const UPDATE_QUESTION = gql`
//   mutation UpdateQuestion($questionId: ID!) {
//     updateQuestion(id: $questionId, data: { beenAsked: true }) {
//       _id
//       _type
//       beenAsked
//       # Include any other fields you want to retrieve after the update
//     }
//   }
// `;

const UPDATE_QUESTION = gql`
  mutation UpdateQ($type: String!) {
    updateQ(type: $type) {
      _id
      type
    }
  }
`;


export default UPDATE_QUESTION;
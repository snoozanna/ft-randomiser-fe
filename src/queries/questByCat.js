// import { gql } from '@apollo/client';
import gql from 'graphql-tag';

const Q_BY_CATEGORY_QUERY = gql`
  # query QCatQuery {
  #   allQuestion(where: { category: { some: { name: { eq: "Life" } } } }) {
  #     category {
  #       name
  #     }
  #     question
  #   }
  # }
  {
    allQuestion(where: { category: { name: { matches: "Life" } } }) {
      question
      _id
      category {
        name
      }
    }
  }
`;

// const Q_BY_CATEGORY_QUERY = gql`
//   query QC($category: String!) {
//     allQuestion(filter: { name: { eq: $category } }) {
//       _id
//       question
//       category {
//         name
//       }
//     }
//   }
// `;

// const Q_BY_CATEGORY_QUERY = gql`
//   query QC($category: String!) {
//     allQuestion(name: { eq: $category }) {
//       _id
//       question
//       category {
//         name
//       }
//     }
//   }
// `;

export default Q_BY_CATEGORY_QUERY;

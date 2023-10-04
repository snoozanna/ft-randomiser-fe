import { gql } from '@apollo/client';
// import gql from 'graphql-tag';
const GET_QUESTION_CATEGORY = gql`

query QCQuery($name:String) {
  questions:allQuestion(where: {category: {name: {eq: $name}}}) {
    _id
      question
      category {
        name
        _id
      }
    
  }
  categories: allCategory{
    name
  }
}
  
`;


export default GET_QUESTION_CATEGORY;


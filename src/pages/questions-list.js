import { Link, graphql } from 'gatsby';
import React, { useContext } from 'react';
import styled from 'styled-components';

import SEO from '../components/SEO';
import { devices } from '../styles/breakpoints.js';

const QuestionListPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  .qcontainer{
    margin-bottom:2rem;
  }

  p{margin-bottom:0}
  .label-container{
  display:flex;
  margin-left:-3rem;
}
span.label{
  text-align:left;
  padding: 8px;
  border-radius: 10px;
  width: fit-content;
  font-size:1.2rem;
  font-weight:400;
    margin-right:2rem;

}
span.category.label{
  background: purple;
}

span.level.label{
  background: green;
}
`;

const QuestionListPage = ({ data }) => {
  const questions = data.questions.nodes;
  console.log(data)

  return (
    <QuestionListPageStyles>
      {questions.map((question) => (
        <>
          <div className='qcontainer'>
            <p key={question.id}>{question.question}</p>
            <div className='label-container'><span className='category label'> {question.category.name ? question.category.name : <p>none</p>}</span></div>
          </div>
        </>
      ))}
    </QuestionListPageStyles>
  );
};

export default QuestionListPage;

export const query = graphql`
  query QuestionListQuery {
    questions: allSanityQuestion {
      nodes {
        id
        question
        category {
          id
          name
        }
      }
    }
  }
`;

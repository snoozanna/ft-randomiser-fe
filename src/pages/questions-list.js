import { Link, graphql } from 'gatsby';
import React, { useContext } from 'react';
import styled from 'styled-components';

import SEO from '../components/SEO';
import { devices } from '../styles/breakpoints.js';

const QuestionListPageStyles = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionListPage = ({ data }) => {
  const questions = data.questions.nodes;
  console.log(data)

  return (
    <QuestionListPageStyles>
      {questions.map((question) => (
        <>
          <p key={question.id}>{question.question}</p>
          <p>Category: {question.category.name ? question.category.name : <p>none</p>}</p>
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

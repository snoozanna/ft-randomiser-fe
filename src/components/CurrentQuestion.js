import { graphql } from 'gatsby';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { QuestionContext } from '../context/questions.context';

const CurrentQStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  .question-wrapper {
    width: 100%;
    margin-block-end: 4rem;
    text-align: center;
    span.question {
      font-size: 4rem;
      font-weight: 600;
    }
  }
`;

const CurrentQ = () => {
  // TODO Make repeatable
  const { quest } = useContext(QuestionContext);

  return (
    <>
      <CurrentQStyles>
        <span className="category">
          {quest.category.length > 0
            ? `Category: ${quest.category[0].name}`
            : ''}
        </span>
        <div className="question-wrapper">
          <span className="question">
            {quest.question ? quest.question : ''}
          </span>
        </div>
      </CurrentQStyles>
    </>
  );
};

export default CurrentQ;

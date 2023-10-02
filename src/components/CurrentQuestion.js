import React, { useContext } from 'react'
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
  const { currentQuestion } = useContext(QuestionContext);
console.log("currentQuestion", currentQuestion)
  return (
    <>
      <CurrentQStyles>
        <span className="category">
          {currentQuestion.category.length > 0
            ? `Category: ${currentQuestion.category[0].name}`
            : ""}
        </span>
        <div className="question-wrapper">
          <span className="question">
            {currentQuestion.question ? currentQuestion.question : ""}
          </span>
        
        </div>
      </CurrentQStyles>
    </>
  );
};

export default CurrentQ;

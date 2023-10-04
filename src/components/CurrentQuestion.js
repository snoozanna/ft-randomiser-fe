import React, { useContext } from 'react'
import styled from 'styled-components';
import { QuestionContext } from '../context/questions.context';

const CurrentQStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
        <div className="question-wrapper">
          <h3 className="question">
            {currentQuestion.question ? currentQuestion.question : ""}
          </h3>
        
        </div>
      </CurrentQStyles>
    </>
  );
};

export default CurrentQ;

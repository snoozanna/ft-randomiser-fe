import { Link, graphql } from 'gatsby';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import buildSequence from "./../utils/utils.js"
import Sequence from '../components/Sequence.js';
import { QuestionContext } from '../context/questions.context';

const SequencePageStyles = styled.div`
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

const SequencePage = ({ data }) => {
  const { currentQuestion, setCurrentQuestion, alreadyCalled, setAlreadyCalled } =
    useContext(QuestionContext);
const [currentSequence, setCurrentSequence] = useState([])
  const questions = data.questions.nodes;

  const clickHandler = (questions) => {
    // console.log("building sequence")
    const sequence = buildSequence(questions)
    setCurrentSequence(sequence)
  }

  return (
    <>
      <SequencePageStyles>
        {/* <span className="category">
          {quest.category.length > 0
            ? `Category: ${quest.category[0].name}`
            : ''}
        </span> */}
        {/* {currentSequence[0].question} */}
        <div className="question-wrapper">
          <p>Sequence order: ["deep", "lighthearted", "deep", "deep", "medium", "lighthearted"] </p>
          {/* <h3 className="question">
            {currentQuestion.question ? currentQuestion.question : ''}
          </h3> */}
          {/* {currentSequence[0].question ? currentSequence[0].question : ""} */}
          {currentSequence ? <Sequence sequence={currentSequence}/> : <p>no sequence yet</p>}
        </div>
        <div className="button-wrapper">
          <button type="button" onClick={() => clickHandler({questions})}>
            Build sequence
          </button>
        </div>
      </SequencePageStyles>
    </>
  );
};

export default SequencePage;

export const query = graphql`
  query QuestionQuery {
    questions: allSanityQuestion {
      nodes {
        id
        question
        level
        category {
          name
        }
      }
    }
  }
`;

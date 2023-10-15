import { Link, graphql } from 'gatsby';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import {buildSequence} from "./../utils/utils.js"
import Sequence from '../components/Sequence.js';
import { QuestionContext } from '../context/questions.context';
import {levelSequences} from '../utils/constants.js';


const SequencePageStyles = styled.div`
padding: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* height: 100%; */
  width:100%;
  align-items: center;
  h3{
     margin-block-end: 2rem;
  }
  .question-wrapper {
    /* width: 70%; */
    margin-block-end: 4rem;
    text-align: center;
    display:flex;
      flex-direction: column;
     align-items: start;
    justify-content:center ;
    span.question {
      font-size: 4rem;
      font-weight: 600;
    }
  }
  .sequence-admin{
    /* max-width:30%; */
    display: flex;
    gap:1rem;
     ;
  }
`;

const SeqBtnContainerStyles = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
border: 2px solid white;
padding: 1.5rem;
border-radius: 10px;
h3{
  font-size:2rem;
   margin-bottom:2rem;
}
.label-container{
  display:flex;
  flex-wrap:wrap;
  gap:0.5rem;
   margin-bottom:2rem;
   width:min-content ;
}
span.label{
  text-align:left;
  padding: 8px;
  border-radius: 10px;
  width: fit-content;
  font-size:1.2rem;
  font-weight:400;
    margin-right:0.5rem;

}
span.category.label{
  background: purple;
}

span.level.label.deep{
  background: #a15526;
}
span.level.label.lighthearted{
  background: #308b30;
}
span.level.label.medium{
  background: #249faf;
}
`

const SequencePage = ({ data }) => {
  const { currentQuestion, setCurrentQuestion, alreadyCalled, setAlreadyCalled } =
    useContext(QuestionContext);
const [currentSequence, setCurrentSequence] = useState([])
  const questions = data.questions.nodes;

  const clickHandler = (questions, sequenceOrder) => {
    // console.log("building sequence")
    const sequence = buildSequence(questions, sequenceOrder)
    setCurrentSequence(sequence)
    console.log(currentSequence);
  }



  return (
    <>
      <SequencePageStyles>
        <div className="question-wrapper">
          {/* <h3 className="question">
            {currentQuestion.question ? currentQuestion.question : ''}
          </h3> */}
          {/* {currentSequence[0].question ? currentSequence[0].question : ""} */}

          {currentSequence ? (
            <Sequence sequence={currentSequence} />
          ) : (
            <p>no sequence yet</p>
          )}
        </div>
        <div className="sequence-admin">
          {/* <CallSequence sequence={currentSequence}/> */}

          <SeqBtnContainerStyles>
            <h3>Sequence 1</h3>

            <div className="label-container">
              {levelSequences["1"].map((level, i) => {
                return (
                  <span key={i} className={`level label ${level}`}>
                    {level}
                  </span>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => clickHandler({ questions }, levelSequences["1"])}
            >
              Build sequence
            </button>
          </SeqBtnContainerStyles>
          <SeqBtnContainerStyles>
            <h3>Sequence 2</h3>

            <div className="label-container">
              {levelSequences["2"].map((level, i) => {
                return (
                  <span key={i} className={`level label ${level}`}>
                    {level}
                  </span>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => clickHandler({ questions }, levelSequences["2"])}
            >
              Build sequence
            </button>
          </SeqBtnContainerStyles>
          <SeqBtnContainerStyles>
            <h3>Sequence 3</h3>

            <div className="label-container">
              {levelSequences["3"].map((level, i) => {
                return (
                  <span key={i} className={`level label ${level}`}>
                    {level}
                  </span>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => clickHandler({ questions }, levelSequences["3"])}
            >
              Build sequence
            </button>
          </SeqBtnContainerStyles>
        </div>
        <div className="explainer">
          <h3>Sequence Outline</h3>
          <p>Shuffles the questions. </p>
          <p>At least two non neg in the firts 8 questions</p>
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
        _id
        question
        level
        category {
          name
          _id
        }
        requireLockIn
        nonNeg
        documentary
      }
    }
  }
`;

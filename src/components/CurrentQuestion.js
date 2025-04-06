import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import { QuestionContext } from '../context/questions.context';
import GET_CURRENT_QUESTION from "../queries/GET_CURRENT_QUESTION";
import Loader from './Loader';
import { useQuery } from '@apollo/client';
import { askQuestion, createAskedQuestion, swapToAlternativeQuestionDB, updateCurrentQuestionNotInProgress } from '../utils/utils';

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
    h3.question {
      font-size: 4rem;
      font-weight: 600;
    }
   
  }
  .label-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  span.label {
    text-align: left;
    padding: 8px;
    border-radius: 10px;
    width: fit-content;
    font-size: 1.2rem;
    font-weight: 400;
    margin-right: 2rem;
  }
  span.category.label {
    background: purple;
  }

  span.level.label.deep {
    background: #a15526;
  }
  span.level.label.lighthearted {
    background: #308b30;
  }
  span.level.label.medium {
    background: #249faf;
  }
  .follow-container {
    font-size: 2rem;
    font-weight: 600;
    /* background: white; */
    padding: 1rem;
    border-radius: 10px;
    font-style: italic;
    color: darkslategrey;
    p {
      margin-bottom: 0;
    }
  }
`;

const LockInOuterWrapperStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const LockInWrapperStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* align-items: center; */
  gap:2rem;
`;

const LockInOptionsStyles = styled.div`
  text-align: center;
  width: 49%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  /* background: #b3750f; */
  padding: 2rem;
  border: black 3px solid;
  p {
    font-size: 2rem;
    font-size: 3rem;
    font-weight: 500;
    font-family: var(--subheadings);
  }
  button.lock-in {
    background: #6fc36f;
  }


`;

const CurrentQ = ({lockInMoment, setLockInMoment}) => {
  const {
    potentialQuestion,
    currentQuestion,
    setCurrentQuestion,
    setQuestionSequenceIndex,
    removeQuestionFromUnasked,
  } = useContext(QuestionContext);


 useEffect(() => {
  // console.log("useEffect fires")
  if(currentQuestion === null){
  updateCurrentQuestionNotInProgress();
  }

 }, [currentQuestion]);



  const confirmBtnHandler = async (selectedQuestion) => {
    await askQuestion(selectedQuestion);
      // collecting all asked questions for debugging
      await createAskedQuestion(selectedQuestion._id)
      //ends
    setCurrentQuestion(selectedQuestion);
    setQuestionSequenceIndex((currentIndex) => {
      return currentIndex + 1;
    });
    removeQuestionFromUnasked(selectedQuestion);
    setLockInMoment(false);
  }

    const confirmAltBtnHandler = async (selectedQuestion) => {
      // in state too?

      // if alternative is chosen, mutate question.question to question.altQuestion and inverse
      await swapToAlternativeQuestionDB(
        selectedQuestion._id,
        selectedQuestion.altQuestion,
        selectedQuestion.question,
      );
      // up date state with new question ??
  
      const correctedQuestion = {
        __typename: selectedQuestion.__typename,
        question: selectedQuestion.altQuestion,
        altQuestion: selectedQuestion.question,
        // followUp: selectedQuestion.followUp,
        _id: selectedQuestion._id,
        category: {
          __typename: selectedQuestion.category.__typename,
          name: "Material Possessions",
        },
        level: selectedQuestion.level,
        beenAsked: selectedQuestion.beenAsked,
        requireLockIn: selectedQuestion.requireLockIn,
        nonNeg: selectedQuestion.nonNeg,
        documentary: selectedQuestion.documentary,
      };
      // console.log("correctedQuestion", correctedQuestion);
  
      await askQuestion(correctedQuestion);
      setCurrentQuestion(correctedQuestion);
       // collecting all asked questions for debugging
      await createAskedQuestion(correctedQuestion._id)
      //ends
      setQuestionSequenceIndex((currentIndex) => {
        return currentIndex + 1;
      });
      removeQuestionFromUnasked(selectedQuestion);
      setLockInMoment(false);
    };


  return (
    <>
      {lockInMoment ? (
        <LockInOuterWrapperStyles>
          <LockInWrapperStyles className="options-wrapper">
            <LockInOptionsStyles>
              <p>{potentialQuestion.question}</p>
              <button
                onClick={() => confirmBtnHandler(potentialQuestion)}
                className="lock-in"
              >
                Lock in ?
              </button>
            </LockInOptionsStyles>
            <LockInOptionsStyles>
              <p>{potentialQuestion.altQuestion}</p>
              <button
                onClick={() => confirmAltBtnHandler(potentialQuestion)}
                className="lock-in"
              >
                Lock in ?
              </button>
            </LockInOptionsStyles>
          </LockInWrapperStyles>
        </LockInOuterWrapperStyles>
      ) : (
        <CurrentQStyles>
          <div className="question-wrapper">
            {currentQuestion ? (
              <h3 className="question">{currentQuestion.question}</h3>
            ) : null}
          </div>
            {/* {currentQuestion ? (  <p>{currentQuestion.nonNeg ? "non neg" : "not"}</p>) : null} */}
          <div className="follow-container">
            {" "}
            <p>{currentQuestion ? currentQuestion.followUp : null}</p>
            {/* <p>{currentQuestion ? (currentQuestion.nonNeg? "Non neg": null) : null}</p> */}
          </div>
        </CurrentQStyles>
      )}
    </>
  );
};

export default CurrentQ;

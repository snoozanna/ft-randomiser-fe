import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import { QuestionContext } from '../context/questions.context';
import GET_CURRENT_QUESTION from "../queries/GET_CURRENT_QUESTION";
import Loader from './Loader';
import { useQuery } from '@apollo/client';
import { askQuestion, updateCurrentQuestionNotInProgress } from '../utils/utils';

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
  align-items: center;
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

  //TODO EVENTUALLY NEEDS TO LISTEN TO DB
  // const { data, loading, error } = useQuery(GET_CURRENT_QUESTION);
  // if (loading) return <Loader />;
  // if (error) return <p>Error: {JSON.stringify(error)}</p>;
  // if (!data) return <text>Could not find data</text>;
  // console.log(data);

  // const currentQuestion = data.currentQ[0].question

  const { potentialQuestion,currentQuestion, setCurrentQuestion, setQuestionSequenceIndex} = useContext(QuestionContext);
  console.log("currentQuestion", currentQuestion);

 useEffect(() => {
  // console.log("useEffect fires")
  if(currentQuestion === null){
      console.log("tying to update current Q iin useEffect");
  updateCurrentQuestionNotInProgress();
  }

 }, [currentQuestion]);

  const standInLockInQ = {
    __typename: "Question",
    question: "Do you have a favourite Doctor Who?",
    _id: "5f72ba63-e50d-4bba-9cf5-011317f082bb",
    category: {
      __typename: "Category",
      name: "Material Possessions",
    },
    level: "deep",
    beenAsked: false,
    requireLockIn: false,
    nonNeg: true,
    documentary: false,
  };

  //useEffect triggered by ?/
  const lockInOptions = [potentialQuestion, standInLockInQ];
  // console.log("lockInOptions", lockInOptions);
  const confirmBtnHandler = async (selectedQuestion) => {
    // console.log("selectedQuestion", selectedQuestion)
        await askQuestion(selectedQuestion);
        setCurrentQuestion(selectedQuestion);
        setQuestionSequenceIndex((currentIndex) => {
          return currentIndex + 1;
        })
      setLockInMoment(false)}


  return (
    <>
      {lockInMoment ? (
        <LockInOuterWrapperStyles>
          {/* <h2>LOCK IN ONE OPTION</h2> */}
          <LockInWrapperStyles className="options-wrapper">
            {lockInOptions.map((option) => {
              console.log("option", option);
              return (
                <LockInOptionsStyles key={option._id}>
                  <p>{option.question}</p>
                  <button
                    // onClick={() => confirmBtnHandler({option})}
                    onClick={() => confirmBtnHandler(option)}
                    className="lock-in"
                  >
                    Lock in ?
                  </button>
                </LockInOptionsStyles>
              );
            })}
          </LockInWrapperStyles>
        </LockInOuterWrapperStyles>
      ) : (
        <CurrentQStyles>
          <div className="question-wrapper">
            {/* <span>Current Question from context:</span> */}
            {currentQuestion ?  <div className="label-container">
              <span className="category label">
                {" "}
                {currentQuestion ? currentQuestion.category.name : null}
              </span>
              <span
                className={`level label ${
                  currentQuestion ? currentQuestion.level : null
                }`}
              >
                {currentQuestion ? currentQuestion.level : null}
              </span>
            </div> :null}

            <h3 className="question">
              {currentQuestion ? currentQuestion.question : null}
            </h3>
            {/* <p> {currentQuestion ? currentQuestion._id : null}</p> */}
          </div>
          {/* <button>Refresh</button> */}
        </CurrentQStyles>
      )}
    </>
  );
};

export default CurrentQ;

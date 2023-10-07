import React, { useContext } from 'react'
import styled from 'styled-components';
import { QuestionContext } from '../context/questions.context';
import GET_CURRENT_QUESTION from "../queries/GET_CURRENT_QUESTION";
import Loader from './Loader';
import { useQuery } from '@apollo/client';

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
  //TODO EVENTUALLY NEEDS TO LISTEN TO DB
  // const { data, loading, error } = useQuery(GET_CURRENT_QUESTION);
  // if (loading) return <Loader />;
  // if (error) return <p>Error: {JSON.stringify(error)}</p>;
  // if (!data) return <text>Could not find data</text>;
  // console.log(data);

  // const currentQuestion = data.currentQ[0].question

  const { currentQuestion } = useContext(QuestionContext);
  console.log("currentQuestion", currentQuestion);

  //useEffect triggered by ?/
  return (
    <>
      <CurrentQStyles>
        <div className="question-wrapper">
          <span>Current Question from context:</span>
          <h3 className="question">
            {currentQuestion ? currentQuestion.question : null}
          </h3>
          <p> {currentQuestion ? currentQuestion._id : null}</p>
        </div>
        {/* <button>Refresh</button> */}
      </CurrentQStyles>
    </>
  );
};

export default CurrentQ;

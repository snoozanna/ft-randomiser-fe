import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { QuestionContext } from "../context/questions.context";
import SkipBtn from './Buttons/SkipBtn';
import GoBtn from './Buttons/GoBtn';


const CallSequenceStyles = styled.div`
width:100%;
display: flex;
justify-content:space-between;
align-items:center;
grid-area: c;
.go-container{
  display:flex;
  flex-direction: column;
  width: min-content;
}
`;

const CallSequence = ({ setLockInMoment }) => {
  const { questionSequence, questionSequenceIndex, setQuestionSequenceIndex } =
    useContext(QuestionContext);
  console.log("questionSequence", questionSequence);

  // useEffect(() => {
  //   console.log("questionSequence has changed", questionSequence);
  //   setShowGoButton(true);
  // }, [questionSequence]);
  // takes in sequence
  // go/next button appears
  // skip button appears
  //iterates through sequence
  // update sequence index
  //runs askQuestion on the question within the sequence
  // asks a question
  //checks Lockin
  //marks as called
  //sent to db current question

  return (
    <CallSequenceStyles>
  
      {/* <div className="btn-wrapper goskip"> */}
        {questionSequence.questions.length !== 0 &&
        questionSequenceIndex === -1 ? (
          <>
            {/* <span>Question sequence loaded!</span> */}
            <div/>
            <GoBtn setLockInMoment={setLockInMoment} />
          </>
        ) : null}
        {questionSequenceIndex >= 0 &&
        questionSequenceIndex !== questionSequence.questions.length - 1 ? (
          <>
            <SkipBtn />
            <GoBtn setLockInMoment={setLockInMoment} />
          </>
        ) : null}
        {questionSequenceIndex >= 0 &&
        questionSequenceIndex === questionSequence.questions.length - 1 ? (
          <SkipBtn />
        ) : null}
      {/* </div> */}
    </CallSequenceStyles>
  );
};


export default CallSequence;
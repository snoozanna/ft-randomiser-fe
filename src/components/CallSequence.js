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
  // console.log("questionSequence", questionSequence);

 

  return (
    <CallSequenceStyles>
        {questionSequence.questions.length !== 0 &&
        questionSequenceIndex === -1 ? (
          <>
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
    </CallSequenceStyles>
  );
};


export default CallSequence;
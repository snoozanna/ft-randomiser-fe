import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { QuestionContext } from "../context/questions.context";
import SkipBtn from './Buttons/SkipBtn';
import GoBtn from './Buttons/GoBtn';


const CallSequenceStyles = styled.div`
`
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

  // return (
  //   <>
  //     <div className="btn-container-lower">
  //       {/* <div className="btn-wrapper skip">
  //         <SkipBtn />
  //       </div> */}
  //       <div className="btn-wrapper go">
  //         {/* question sequence loaded  */}
  //         {questionSequence.questions.length !== 0 &&
  //         questionSequenceIndex === -1 ? (
  //           <>
  //             <span>Question sequence loaded!</span>
  //             <GoBtn setLockInMoment={setLockInMoment} />
  //           </>
  //         ) : null}
  //         {questionSequence.questions.length !== 0 &&
  //         questionSequenceIndex > -1 &&
  //         questionSequenceIndex < questionSequence.questions.length ? (
  //           <>
  //             <GoBtn setLockInMoment={setLockInMoment} />
  //             <SkipBtn />
  //           </>
  //         ) : null}
  //         {questionSequence.questions.length !== 0 &&
  //         questionSequenceIndex === questionSequence.questions.length - 1 ? (
  //           <>
  //             <SkipBtn />
  //           </>
  //         ) : null}
  //       </div>
  //     </div>
  //   </>
  // );
  // }

  return (
    <>
      {questionSequenceIndex}
      {questionSequence.questions.length}
      <div className="btn-container-lower">
        <div className="btn-wrapper go">
          {questionSequence.questions.length !== 0 &&
          questionSequenceIndex === -1 ? (
            <>
              <span>Question sequence loaded!</span>
              <GoBtn setLockInMoment={setLockInMoment} />
            </>
          ) : null}
          {questionSequenceIndex >= 0 && 
          questionSequenceIndex !== questionSequence.questions.length - 1 ? (
            <GoBtn setLockInMoment={setLockInMoment} />
          ) : null}
          {questionSequenceIndex >= 0 &&
          questionSequenceIndex === questionSequence.questions.length - 1 ? (
            <SkipBtn />
          ) : null}
        </div>
      </div>
    </>
  );
};


export default CallSequence;
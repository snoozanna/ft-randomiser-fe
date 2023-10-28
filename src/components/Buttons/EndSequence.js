import React, { useContext } from "react";
import { QuestionContext } from "./../../context/questions.context";
import styled from "styled-components";
import { sendCurrentCallToDB, updateQuestionBeenAsked } from "../../utils/utils";


const EndSequenceBtnStyles = styled.button`
  width: min-content;
  background: #fe4d1c;
`;

const EndSequenceBtn = () => {
   const {
     setCurrentQuestion,
     setQuestionSequence,
     setQuestionSequenceIndex,
     resetTimer,
   } = useContext(QuestionContext);

  const handleClick = async () => {
    // console.log("ending sequence")
    // clear sequence 
    setQuestionSequenceIndex(-1);
    setQuestionSequence({
      sequenceLevel: null,
      questions: [],
      label: ""
    });
    resetTimer();
    setCurrentQuestion(null)
    // TODO NEED TO SEND TO DATABASE 
  };


  return (
    <>
      <EndSequenceBtnStyles type="button" onClick={() => handleClick()} className="test">
        End Sequence
      </EndSequenceBtnStyles>
     
    </>
  );
};

export default EndSequenceBtn;

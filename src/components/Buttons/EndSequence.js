import React, { useContext } from "react";
import { QuestionContext } from "./../../context/questions.context";
import styled from "styled-components";
import { sendCurrentCallToDB, updateQuestionBeenAsked } from "../../utils/utils";


const EndSequenceBtnStyles = styled.button`
  width: min-content;
  background: #d8380c;
`;

const EndSequenceBtn = () => {
   const {
     setCurrentQuestion,
     setQuestionSequence,
     setQuestionSequenceIndex,

   } = useContext(QuestionContext);

  const handleClick = async () => {
    console.log("ending sequence")
    setQuestionSequenceIndex(-1);
    setQuestionSequence({
      sequenceLevel: null,
      questions: [],
    });
    setCurrentQuestion(null)
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

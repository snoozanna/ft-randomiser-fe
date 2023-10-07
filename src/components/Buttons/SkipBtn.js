import React, { useContext } from "react";
import { QuestionContext } from "./../../context/questions.context";
import styled from "styled-components";
import { sendCurrentCallToDB, updateQuestionBeenAsked } from "../../utils/utils";


const SkipBtnStyles = styled.button`
 width: fit-content;

`;

const SkipBtn = () => {
   const {
     setCurrentQuestion,
     questionSequence,
     questionSequenceIndex,
     setQuestionSequence,
     setQuestionSequenceIndex,
   } = useContext(QuestionContext);

  const handleClick = async () => {
    if (questionSequenceIndex < questionSequence.questions.length) {
      await updateQuestionBeenAsked(
        questionSequence.questions[questionSequenceIndex], false
      );
      await sendCurrentCallToDB(
        questionSequence.questions[questionSequenceIndex + 1],
      );
      setCurrentQuestion(questionSequence.questions[questionSequenceIndex + 1]);
      setQuestionSequenceIndex((currentIndex) => {
        return currentIndex + 1;
      });
    } else {
      setQuestionSequenceIndex(-1);
      setQuestionSequence({
        sequenceLevel: null,
        questions: [],
      });
    }
  };

  return (
    <SkipBtnStyles type="button" onClick={() => handleClick()} className="test">
      Skip
    </SkipBtnStyles>
  );
};

export default SkipBtn;

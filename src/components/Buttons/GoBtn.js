import React, { useContext } from "react";
import { QuestionContext } from "./../../context/questions.context";
import styled from "styled-components";
import { askQuestion } from "../../utils/utils";


const GoBtnStyles = styled.button`
 width: fit-content;

`;

const GoBtn = () => {
    const {
      setCurrentQuestion,
      questionSequence,
      questionSequenceIndex,
      setQuestionSequence,
      setQuestionSequenceIndex,
    } = useContext(QuestionContext);

  const handleClick = async () => {
    if (questionSequenceIndex < (questionSequence.questions.length)){
    await askQuestion(questionSequence.questions[questionSequenceIndex + 1]);
  setCurrentQuestion(questionSequence.questions[questionSequenceIndex + 1]);
  setQuestionSequenceIndex((currentIndex) => {
    return currentIndex + 1;
  });


  }else{
      setQuestionSequenceIndex(-1)
      setQuestionSequence({
        sequenceLevel: null,
        questions: [],
      });
    }
    
  };

  return (
    <GoBtnStyles type="button" onClick={() => handleClick()} className="test">
      Go
    </GoBtnStyles>
  );
};

export default GoBtn;

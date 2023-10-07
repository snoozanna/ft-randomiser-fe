import React, { useContext } from "react";
import { QuestionContext } from "./../../context/questions.context";
import styled from "styled-components";
import { askQuestion } from "../../utils/utils";


const GoBtnStyles = styled.button`
 width: fit-content;

`;

const GoBtn = ({setLockInMoment} ) => {
  const {
    setCurrentQuestion,
    questionSequence,
    questionSequenceIndex,
    setQuestionSequence,
    setQuestionSequenceIndex,
  } = useContext(QuestionContext);


  const handleClick = async () => {
    const nextQuestion = questionSequence.questions[questionSequenceIndex + 1];
    if (questionSequenceIndex < questionSequence.questions.length) {
      // if question is lock in
      // shpw lock in options
      //STOP LOCK IN HAPPENING NOW
      // choose one option
      // ask that option
      if( nextQuestion.requiresLockIn){
      setLockInMoment(true);
        } else {
    
      await askQuestion(nextQuestion);
      setCurrentQuestion(nextQuestion);
      setQuestionSequenceIndex((currentIndex) => {
        return currentIndex + 1;
      })
    }
    } else {
      setQuestionSequenceIndex(-1);
      setQuestionSequence({
        sequenceLevel: null,
        questions: [],
      });
    }


  

  return (
    <GoBtnStyles type="button" onClick={() => handleClick()} className="test">
      Go
    </GoBtnStyles>
  );
};

export default GoBtn;

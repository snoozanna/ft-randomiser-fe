import React, { useContext } from "react";
import { QuestionContext } from "./../../context/questions.context";
import styled from "styled-components";
import { askQuestion } from "../../utils/utils";

const GoBtnStyles = styled.button`
  width: fit-content;
  padding: 1.6rem;
  font-size: 3rem;
`;

const GoBtn = ({ setLockInMoment }) => {
  const {
    setCurrentQuestion,
    questionSequence,
    questionSequenceIndex,
    setQuestionSequence,
    setQuestionSequenceIndex,
    setPotentialQuestion,
    allUnaskedQuestions, removeQuestionFromUnasked
  } = useContext(QuestionContext);
console.log("allUnaskedQuestions",allUnaskedQuestions)
  const handleClick = async () => {
   
    const nextQuestion = questionSequence.questions[questionSequenceIndex + 1];
    if (questionSequenceIndex < questionSequence.questions.length -1) {
      // if question is lock in
      // shpw lock in options
      //STOP LOCK IN HAPPENING NOW
      // choose one option
      // ask that option
      if (nextQuestion.requireLockIn) {
        setPotentialQuestion(nextQuestion);
        setLockInMoment(true);
      } else {
        await askQuestion(nextQuestion);
        // TODO REMOVE FROM UNASKED QUESTIONS 
        setCurrentQuestion(nextQuestion);
        setQuestionSequenceIndex((currentIndex) => {
          return currentIndex + 1;
        });
        removeQuestionFromUnasked(nextQuestion);
      }
    } else {
      setQuestionSequenceIndex(-1);
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

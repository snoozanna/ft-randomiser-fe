import React, { useContext } from 'react';
import { QuestionContext } from "../../context/questions.context";

import levelSequences from '../../utils/constants';
import styled from 'styled-components';
import { shuffleArray } from '../../utils/utils';

const SequenceButtonStyles = styled.div`
  padding: 1.5rem;
  &.highlight {
    border: #ffc100 solid 3px;
    background: #6fc36f;
  }
`;


const SequenceBtn = ({ levelSequenceLabel }) => {
  const {
    setQuestionSequence,
    setQuestionSequenceIndex,
    questionSequence,
    questionSequenceIndex,
    allUnaskedQuestions,
    setAllUnaskedQuestions,
  } = useContext(QuestionContext);
  // const { data, loading, error } = useQuery(GET_ALL_UNASKED_Q);
  // if (loading) return <Loader />;
  // if (error) return <p>Error: {JSON.stringify(error)}</p>;
  // if (!data) return <text>Could not find data</text>;
  // const { questions } = data;

  const levelSequence = levelSequences[levelSequenceLabel];

  const buildSequence = (sequenceOrder, nonNegNum = 4) => {
  const questionsCopy = allUnaskedQuestions.map((question) => {
    return { ...question };
  });
  let shuffledQuestions = shuffleArray(questionsCopy);
  const sequence = [];
  const usedCategories = [];
  let nonNegCount = 0;

  sequenceOrder.forEach((level) => {
    const question = shuffledQuestions.find((question) => {
      if (nonNegCount < nonNegNum) {
        return (
          question.level === level &&
          !sequence.includes(question) &&
          !usedCategories.includes(question.category.name) &&
          question.nonNeg === true
        );
      } else {
        return (
          question.level === level &&
          !sequence.includes(question) &&
          !usedCategories.includes(question.category.name)
        );
      }
    });
    if (question === undefined) return "not enough questions";
    if (question.nonNeg) nonNegCount++;
    sequence.push(question);
    usedCategories.push(question.category.name);
  });
  if (sequence.length !== sequenceOrder.length) return "not enough questions";
  sequence.forEach((questionInSequence)=>{
    setAllUnaskedQuestions((currentAllUnaskedQuestions)=> {
return currentAllUnaskedQuestions.filter((question)=> {
return question._id !== questionInSequence._id;
})
    })
  })
  return sequence;
};

  const clickHandler = (sequenceOrder) => {
    console.log("allUnaskedQuestions in btn", allUnaskedQuestions);
    const sequence = buildSequence(sequenceOrder);
    setQuestionSequence({
      sequenceLevel: levelSequenceLabel,
      questions: sequence
    });
    setQuestionSequenceIndex(-1);
  };

  return (
    <SequenceButtonStyles
      className={
        questionSequence.sequenceLevel === levelSequenceLabel
          ? "highlight"
          : null
      }
    >
      <button
        type="button"
        onClick={() => clickHandler(levelSequence)}
      >
        {/* {btnName ? btnName : "Light"} */}
        Sequence {levelSequenceLabel}
      </button>
    </SequenceButtonStyles>
  );
};

export default SequenceBtn;


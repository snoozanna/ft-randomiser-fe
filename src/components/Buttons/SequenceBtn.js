import React, { useContext } from 'react';
import { QuestionContext } from "../../context/questions.context";

import {levelSequences2} from '../../utils/constants';
import styled from 'styled-components';
import { shuffleArray } from '../../utils/utils';

const SequenceButtonStyles = styled.div`
  padding: 1.5rem;
  &.highlight {
    border: #ffc100 solid 3px;
    background: #6fc36f;
      background: var(--lightgreen);
      border: var(--lightgreen) 0.125em solid;
      border-radius: 0.25em;
      box-shadow:
        inset 0 0 0.5em 0 var(--lightgreen),
        0 0 0.5em 0 var(--lightgreen);

  
  }
`;


const SequenceBtn = ({ levelSequenceLabel, label }) => {
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

  const levelSequence = levelSequences2[levelSequenceLabel];
console.log("all unasked questions in sequence", allUnaskedQuestions.length);
// NEW ONE 
const buildSequence = ( sequenceOrder, nonNegNum = 2) => {
  const questionsCopy = allUnaskedQuestions.map((question) => {
    return { ...question };
  });
  let shuffledQuestions = shuffleArray(questionsCopy);

  for (let i = 0; i < 150; i++) {
    //make an array of nonNegIndexes
    const arrayOfIndexes = [];
    for (let i = 0; i < sequenceOrder.length; i++) {
      arrayOfIndexes.push(i);
    }

    const randomisedIndexes = shuffleArray(arrayOfIndexes);
    const nonNegNumOfRandomisedIndexes = randomisedIndexes.slice(0, nonNegNum);
    const sequence = [];
    sequenceOrder.forEach((level, index) => {
      const chosenQuestion = shuffledQuestions.find((question) => {
        const isQuestionPickedAlready = sequence.includes(question);
        if (nonNegNumOfRandomisedIndexes.includes(index)) {
          return (
            question.level === level &&
            !isQuestionPickedAlready &&
            question.nonNeg
          );
        } else {
          return question.level === level && !isQuestionPickedAlready;
        }
      });
      sequence.push(chosenQuestion);
    });

    if (!sequence.includes(undefined)) {
      const listOfCategories = sequence.map((question) => question.category);
      const listOfUniqueCategories = new Set(listOfCategories);
      const arrayOfUniqueCategories = [...listOfUniqueCategories];
      if (
        arrayOfUniqueCategories.length >= 5 ||
        arrayOfUniqueCategories.length > sequenceOrder.length / 2
      ) {
        return sequence;
      }
    }
  }

  return "not enough questions 1";
};
// Function to shuffle an array using the Fisher-Yates algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

  const clickHandler = (sequenceOrder) => {
    // console.log("allUnaskedQuestions in btn", allUnaskedQuestions);
    const sequence = buildSequence(sequenceOrder);
    setQuestionSequence({
      sequenceLevel: levelSequenceLabel,
      questions: sequence, 
      label:label
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
        {/* Sequence {levelSequenceLabel} */}
        {label}
      </button>
    </SequenceButtonStyles>
  );
};

export default SequenceBtn;


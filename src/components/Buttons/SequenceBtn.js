import React, { useContext } from 'react';
import { QuestionContext } from "../../context/questions.context";

import {levelSequences5} from '../../utils/constants';
import styled from 'styled-components';
import { markAllNonNegQuestionsAsUnasked, shuffleArray } from '../../utils/utils';
import ParticipantContext from '../../context/participant.context';

const SequenceButtonStyles = styled.div`
  padding: 1.5rem;
  &.highlight {
    border: #ffc100 solid 3px;
    background: #6fc36f;
      background: var(--lightgreen);
      border: black 3px solid;
      border-radius: 0.25em;
  
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
    setResetRequired, 
    setNonNegResetRequired
  } = useContext(QuestionContext);
  const {
    personHasSperm
  } = useContext(ParticipantContext)

  // const { data, loading, error } = useQuery(GET_ALL_UNASKED_Q);
  // if (loading) return <Loader />;
  // if (error) return <p>Error: {JSON.stringify(error)}</p>;
  // if (!data) return <text>Could not find data</text>;
  // const { questions } = data;

  const levelSequence = levelSequences5[levelSequenceLabel];
  let errorMessage = "Could not build sequence";
const buildSequence = (sequenceOrder, nonNegNum = 2) => {
  const MAX_ATTEMPTS = 150;
  const MIN_CATEGORY_DIVERSITY = 5;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  let questionsCopy = allUnaskedQuestions.map((q) => ({ ...q }));
  // Track filters applied to help understand failures later
  const initialFilterReasons = [];

  if (!personHasSperm) {
    console.log("Questions being filtered for non-sperm haver");
    questionsCopy = questionsCopy.filter(
      (q) => q.onlySuitableForSpermHaver === false
    );
    initialFilterReasons.push("Filtered out sperm-haver-only questions");
  }

  const originalShuffledQuestions = shuffleArray(questionsCopy);
  const failureReasons = [];

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const shuffledQuestions = [...originalShuffledQuestions];
    const sequence = [];
    const attemptFailureLog = {
      attempt,
      missingMatches: [],
      notEnoughCategories: false,
    };

    sequenceOrder.forEach((levelEntry, index) => {
      const chosenQuestion = shuffledQuestions.find((question) => {
        const alreadyPicked = sequence.includes(question);

        const baseMatch =
          question.level === levelEntry.level &&
          question.nonNeg === levelEntry.nonNeg &&
          !alreadyPicked;
   
        const needToComeLaterMatch = question.needToComeLater
          ? levelEntry.needToComeLater === true
          : true;

        return baseMatch && needToComeLaterMatch;
      });
      
      if (!chosenQuestion) {
        if (levelEntry.level === "deep" && levelEntry.nonNeg === true) 
        
        {
           errorMessage = "Not enough nonNeg deep questions";
           setNonNegResetRequired(true);
        }
        attemptFailureLog.missingMatches.push({
          index,
          levelEntry,
          reason: `No match found at index ${index} for level ${levelEntry.level} and nonNeg ${levelEntry.nonNeg} and needToComeLater ${levelEntry.needToComeLater}`,
        });
      }
      sequence.push(chosenQuestion);
    });

    // Sequence is invalid if any undefined made it through
    if (sequence.includes(undefined)) {
      failureReasons.push(attemptFailureLog);
      continue;
    }

    // Validate category diversity
    const categories = sequence.map((q) => q.category);
    const uniqueCategories = [...new Set(categories)];

    if (
      uniqueCategories.length < MIN_CATEGORY_DIVERSITY &&
      uniqueCategories.length <= sequenceOrder.length / 2
    ) {
      attemptFailureLog.notEnoughCategories = {
        uniqueCount: uniqueCategories.length,
        required: `>= ${MIN_CATEGORY_DIVERSITY} or > ${
          sequenceOrder.length / 2
        }`,
        categories: uniqueCategories,
      };
      failureReasons.push(attemptFailureLog);
      continue;
    }

    // All good? Return the sequence
    return sequence;
  }

  // Final log before failure
  console.log("Not enough questions");
  if (errorMessage != "Not enough nonNeg deep questions" ){
    setResetRequired(true);
    console.log("trying to reset here", errorMessage);
  }
 
  const log = {
    error: errorMessage,
    attempts: MAX_ATTEMPTS,
    filterReasons: initialFilterReasons,
    reasons: failureReasons,
  };
console.log("log", log)
  return log;
};



  const clickHandler = async (sequenceOrder) => {
    console.log("allUnaskedQuestions in btn", allUnaskedQuestions);
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


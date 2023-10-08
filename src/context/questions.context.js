import React, { createContext, useState } from 'react';

// we provide empty fn as defaults so it doesn't break the app if forget to pass a fn
export const QuestionContext = createContext({
  questions: {
    allUnaskedQuestionsAtStart: [],
    potentialQuestion: {},
    currentQuestion: {},
    alreadyCalled: [""],
    questionError: "",
    reset: () => {},
    setAlreadyCalled: () => {},
    setAllUnaskedQuestionsAtStart: () => {},
    setPotentialQuestion: () => {},
    setCurrentQuestion: () => {},
    setQuestionError: () => {},
  },
  sequence: {
    questionSequence: {
      sequenceLevel: "",
      questions: [],
    },
    questionSequenceIndex: 0,
  },
});

export function QuestionProvider({ children }) {
  const [potentialQuestion, setPotentialQuestion] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [alreadyCalled, setAlreadyCalled] = useState('');
const [questionError, setQuestionError] = useState('');
const [allUnaskedQuestionsAtStart, setAllUnaskedQuestionsAtStart] = useState([]);

const [questionSequence, setQuestionSequence] = useState({
  sequenceLevel: null,
  questions: [],
});
const [questionSequenceIndex, setQuestionSequenceIndex] = useState(-1);

  const reset = () => {
    if (window.confirm('are you sure')) {
      setCurrentQuestion('...');
      setAlreadyCalled([]);
    } else {
      console.log('no thanks');
    }
  };

  return (
    <QuestionContext.Provider
      value={{
        potentialQuestion,
        setPotentialQuestion,
        currentQuestion,
        setCurrentQuestion,
        alreadyCalled,
        setAlreadyCalled,
        questionError,
        setQuestionError,
        allUnaskedQuestionsAtStart,
        setAllUnaskedQuestionsAtStart,
        questionSequence,
        setQuestionSequence,
        questionSequenceIndex,
        setQuestionSequenceIndex,
        reset,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
export default QuestionContext;

import { useQuery } from '@apollo/client';
import React, { createContext, useState } from 'react';
import GET_ALL_UNASKED_Q from '../queries/GET_ALL_UNASKED_Q';
import Loader from '../components/Loader';

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
    setAllUnaskedQuestions: () => {},
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
  const [alreadyCalled, setAlreadyCalled] = useState("");
  const [questionError, setQuestionError] = useState("");
 
  const [questionSequence, setQuestionSequence] = useState({
    sequenceLevel: null,
    questions: [],
  });
  const [questionSequenceIndex, setQuestionSequenceIndex] = useState(-1);
   const [allUnaskedQuestions, setAllUnaskedQuestions] = useState([]);



  const reset = () => {
    if (window.confirm("are you sure")) {
      setCurrentQuestion("...");
      setAlreadyCalled([]);
    } else {
      console.log("no thanks");
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
        allUnaskedQuestions,
        setAllUnaskedQuestions,
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

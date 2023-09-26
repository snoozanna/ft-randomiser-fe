import React, { createContext, useState } from 'react';

// we provide empty fn as defaults so it doesn't break the app if forget to pass a fn
export const QuestionContext = createContext({
  questions: {
    allQuestions: [],
    currentQuestion: {
      question: '',
      category: [],
    },
    alreadyCalled: [''],
    questionError: "",
    reset: () => {},
    setAlreadyCalled: () => {},
    setAllQuestions: () => {},
    setCurrentQuestion:() => {},
    setQuestionError: () => {}
  },
});

export function QuestionProvider({ children }) {
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    category: [],
  });
  const [alreadyCalled, setAlreadyCalled] = useState('');
const [questionError, setQuestionError] = useState('');
const [allQuestions, setAllQuestions] = useState([]);

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
        currentQuestion,
        setCurrentQuestion,
        alreadyCalled,
        setAlreadyCalled,
        questionError, 
        setQuestionError,
        allQuestions,
        setAllQuestions,
        reset,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
export default QuestionContext;

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
    loadAllQuestionsRequired: "",
    reset: () => {},
    setAlreadyCalled: () => {},
    setAllUnaskedQuestions: () => {},
    setPotentialQuestion: () => {},
    setCurrentQuestion: () => {},
    setQuestionError: () => {},
    setLoadAllQuestionsRequired: () => {}
  },
  sequence: {
    questionSequence: {
      sequenceLevel: "",
      questions: [],
      label: ""
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
    label: ''
  });
  const [questionSequenceIndex, setQuestionSequenceIndex] = useState(-1);
   const [allUnaskedQuestions, setAllUnaskedQuestions] = useState([]);
   const [loadAllQuestionsRequired, setLoadAllQuestionsRequired] = useState(true)

   console.log("question context");

   const countQuestionsByCategory = (questions) => {
     const categoryCounts = {};
     questions.forEach((question) => {
       const category = question.category.name;
       if (categoryCounts[category]) {
         categoryCounts[category]++;
       } else {
         categoryCounts[category] = 1;
       }
     });

     return categoryCounts;
   };
   const categoryCounts = countQuestionsByCategory(allUnaskedQuestions);
   console.log("categoryCounts", categoryCounts);

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
        loadAllQuestionsRequired,
        setLoadAllQuestionsRequired,

      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
export default QuestionContext;

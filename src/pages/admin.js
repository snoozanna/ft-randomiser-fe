import { Link, graphql } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import { QuestionContext } from '../context/questions.context';
import { Call } from '@mui/icons-material';
import { markAllQuestionsAsUnasked, updateCurrentQuestionNotInProgress } from '../utils/utils.js';

const AdminPageStyles = styled.div`
padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 100%; */
  width:100%;
  align-items: center;
  button.loading{
    background:red ;
  }
`;



const AdminPage = () => {
  const {
    setQuestionSequenceIndex,
    setQuestionSequence,
    setAllUnaskedQuestions,
    currentQuestion,
    setCurrentQuestion,
    setLoadAllQuestionsRequired,
  } = useContext(QuestionContext);
const [currentSequence, setCurrentSequence] = useState([])
const [isLoading, setIsLoading] = useState(false)

 useEffect(() => {
   // console.log("useEffect fires")
   if (currentQuestion === null) {
     console.log("tying to update current Q iin useEffect");
     updateCurrentQuestionNotInProgress();
   }
 }, [currentQuestion]);

const fullReset = async () => {
setIsLoading(true)
await markAllQuestionsAsUnasked()
 setQuestionSequenceIndex(-1);
 setQuestionSequence({
   sequenceLevel: null,
   questions: [],
 });
 setAllUnaskedQuestions([])
 setCurrentQuestion(null);
 setLoadAllQuestionsRequired(true);
setIsLoading(false);
}

  const clickHandler = () => {
  if (window.confirm("This will set all questions to unasked. Are you sure?")) {
          fullReset();
        } else {
          console.log("no thanks");
        }
  }


  return (
    <>
      <AdminPageStyles>
        <h3>Full Reset</h3>
        <p>This will mark all questions as unasked.</p>
        {isLoading ? (
          "Reset in progress"
        ) : (
          <button
            onClick={clickHandler}
            
          >
            Reset
          </button>
        )}
      </AdminPageStyles>
    </>
  );
};

export default AdminPage;



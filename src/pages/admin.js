import { Link, graphql } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import { QuestionContext } from '../context/questions.context';
import { markAllQuestionsAsUnasked, markAllRapidFireAsUnasked, updateCurrentQuestionNotInProgress } from '../utils/utils.js';
import mark from "./../assets/images/mark.png";
import AdminStatus from '../components/AdminStatus.js';

const AdminPageStyles = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* height: 100%; */
  width: 100%;
  align-items: center;
  button.loading {
    background: red;
  }
 
  .resetContainer{
    display:flex;
    flex-direction:column;
    align-items:center;
  }
`;



const AdminPage = () => {
  const {
    setQuestionSequenceIndex,
    setQuestionSequence,
    allUnaskedQuestions,
    setAllUnaskedQuestions,
    currentQuestion,
    setCurrentQuestion,
    setLoadAllQuestionsRequired,

    questionSequenceIndex,
    questionSequence
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
await markAllRapidFireAsUnasked();
 setQuestionSequenceIndex(-1);
 setQuestionSequence({
   sequenceLevel: null,
   questions: [],
 });
 setAllUnaskedQuestions([])
 setCurrentQuestion(null);
 setLoadAllQuestionsRequired(true);
setIsLoading(false);
window.location.reload();
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
        <AdminStatus/>
        <div className="resetContainer">
          <h3>Full Reset</h3>
          <p>This will mark all questions as unasked.</p>
          {isLoading ? (
            "Reset in progress"
          ) : (
            <button onClick={clickHandler}>Reset</button>
          )}
        </div>
      </AdminPageStyles>
    </>
  );
};

export default AdminPage;



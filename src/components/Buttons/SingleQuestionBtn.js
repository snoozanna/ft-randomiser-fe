import React, { useContext, useState } from "react";
import { QuestionContext } from "../../context/questions.context";
import { useQuery } from "@apollo/client";
import GET_ALL_RAPID_Q from "../../queries/GET_ALL_RAPID_Q";
import GET_ALL_NONNEG_Q from "../../queries/GET_ALL_NONNEG_Q";
import GET_ALL_LIGHT_Q from "../../queries/GET_ALL_LIGHT_Q";
import styled from "styled-components";
import Loader from "../Loader";
import { askQuestion, shuffleArray } from "../../utils/utils";
import ParticipantContext from "../../context/participant.context";


const SingleQuestionBtnStyles = styled.button`
  width: fit-content;
  /* background: #e7a069; */
  background: var(--yellow) ;
`;

const ButtonInfoStyles = styled.div`

    margin-top: 1rem;
    background: #2c1004;
    font-weight: 500;
    font-size: 1.4rem;
    padding: 0.5rem;
    border-radius: 2px;

`;

const SingleQuestionBtn = ( {buttonType}) => {
  // console.log("buttonType", buttonType);
    const { setCurrentQuestion, questionSequence, removeQuestionFromUnasked } =
      useContext(QuestionContext);
    
      const {
        personHasSperm
      } = useContext(ParticipantContext)
    

    const [areQuestionsRemaining, setAreQuestionsRemaining] =
      useState(true);
    let query;
    if (buttonType === "Rapid Fire") {
      query = GET_ALL_RAPID_Q;
    } else if (buttonType === "Non Negotiable") {
      query = GET_ALL_NONNEG_Q;
    } else if (buttonType === "Random Light") {
      query = GET_ALL_LIGHT_Q;
    }
  
  const { data, loading, error, refetch } = useQuery(query);
  
  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
  // console.log(`data in Single Q ${buttonType}`, data)
  const { questions } = data;


  const handleClick = async () => {

  const randomQCheckedAgainstSequence = (questions, questionSequence) => {
    // console.log("checking q", questions);
    // console.log("checking qs", questionSequence.questions);
    //shuffle q
    let questionsCopy = questions.map((question) => {
      return { ...question };
    });

    if (!personHasSperm && buttonType !== "Rapid Fire"){
      questionsCopy = questionsCopy.filter(question=> question.onlySuitableForSpermHaver === false)
    }
    
    questionsCopy.forEach(question => {
      if (question.onlySuitableForSpermHaver){
        console.log("This question is only suitable for a sperm haver")
      }
    })

    let shuffledQuestions = shuffleArray(questionsCopy);

    const questionSequenceCopy = questionSequence.questions.map((question) => {
    return { ...question };
     });

    const questionSequenceIDs = questionSequenceCopy.map((question)=> {
return question._id;
    })
    //iterate through them until matches requeiment

    for (let question of shuffledQuestions) {
      // console.log("should be false", !questionSequenceIDs.includes(question._id));
      if (!questionSequenceIDs.includes(question._id)) {
        return question;
      }
    }
    return false;
  };

  const nextQuestion = randomQCheckedAgainstSequence(
    questions,
    //to test this is working use (should show no q left):
    // questionSequence.questions,
    questionSequence,
  );

  setAreQuestionsRemaining(nextQuestion);
  if (areQuestionsRemaining){
    await askQuestion(nextQuestion);
    setCurrentQuestion(nextQuestion);
    if (buttonType !== "Rapid Fire") {
      removeQuestionFromUnasked(nextQuestion);
    }
    refetch();
    //TODO LOOK AT REFETCH
  }

  };

  return (
    <>
      <SingleQuestionBtnStyles
        type="button"
        onClick={() => handleClick()}
        className="test"
      >
       
        {buttonType}
      </SingleQuestionBtnStyles>
      {areQuestionsRemaining ? null : <ButtonInfoStyles className="info-wrapper">
        <span>No questions left</span>
      </ButtonInfoStyles>}
    </>
  );
};

export default SingleQuestionBtn;

// api request to the data base for all rapid fire unasked questions
// remove the ones in the current sequence, if there is a sequence
// push it into Current Question
// mark as asked

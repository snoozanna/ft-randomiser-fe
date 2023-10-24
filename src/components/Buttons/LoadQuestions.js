import React, { useContext } from "react";
import { QuestionContext } from "./../../context/questions.context";
import styled from "styled-components";
import { sendCurrentCallToDB, updateQuestionBeenAsked } from "../../utils/utils";
import GET_ALL_UNASKED_Q from "../../queries/GET_ALL_UNASKED_Q";
import { useQuery } from "@apollo/client";
import Loader from "../Loader";


const LoadQuestionsBtnStyles = styled.button`
  width: min-content;
  background: #fe4d1c;
`;

const LoadQuestionsBtn = () => {
   const {
     setAllUnaskedQuestions,
     setQuestionSequenceIndex,
     setQuestionSequence,
     setCurrentQuestion,
     setLoadAllQuestionsRequired,
   } = useContext(QuestionContext);
const { data, loading, error } = useQuery(GET_ALL_UNASKED_Q);
if (loading) return <Loader />;
if (error) return <p>Error: {JSON.stringify(error)}</p>;
if (!data) return <text>Could not find data</text>;
const { questions } = data;
console.log("loading data in load button",questions);
  const handleClick = async () => {
    // clear sequence
    setQuestionSequenceIndex(-1);
    setQuestionSequence({
      sequenceLevel: null,
      questions: [],
      label: ""
    });

    setCurrentQuestion(null);
    setAllUnaskedQuestions(questions)
    setLoadAllQuestionsRequired(false)
  };


  return (
    <>
      <LoadQuestionsBtnStyles type="button" onClick={() => handleClick()} className="test">
        Load Questions
      </LoadQuestionsBtnStyles>
     
    </>
  );
};

export default LoadQuestionsBtn;

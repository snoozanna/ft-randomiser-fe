import React, { useContext } from "react";
import { QuestionContext } from "./../../context/questions.context";
import { useQuery } from "@apollo/client";
import GET_ALL_RAPID_Q from "../../queries/GET_ALL_RAPID_Q";
import styled from "styled-components";
import Loader from "../Loader";
import { askQuestion } from "../../utils/utils";

const RapidBtnStyles = styled.button`
  width: fit-content;
`;

const RapidFireBtn = () => {
    const {setCurrentQuestion } = useContext(QuestionContext);

  const { data, loading, error } = useQuery(GET_ALL_RAPID_Q);
  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
  const { rapidfire } = data;
  const nextQuestion = rapidfire[Math.floor(Math.random() * rapidfire.length)];

  const handleClick = async () => {
    console.log("Rapid Fire button fires");
    await askQuestion(nextQuestion);
    setCurrentQuestion(nextQuestion);
  };

  return (
    <RapidBtnStyles
      type="button"
      onClick={() => handleClick()}
      className="test"
    >
      Rapid Fire
    </RapidBtnStyles>
  );
};

export default RapidFireBtn;

// api request to the data base for all rapid fire unasked questions
// remove the ones in the current sequence, if there is a sequence
// push it into Current Question
// mark as asked

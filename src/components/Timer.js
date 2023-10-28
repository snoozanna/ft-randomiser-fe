import React, { useContext } from "react";
import QuestionContext from "../context/questions.context";
import styled from "styled-components";

const TimerStyles = styled.div`
  background: black;
  color: white;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-size: 2.5rem;
  border-radius: 10px;
`;

const Timer = () => {
  const { time, isRunning } =
    useContext(QuestionContext);


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <TimerStyles>
      {/* <span>Time: </span> */}
       <span> {formatTime(time)}</span> 
    </TimerStyles>
  );
}

export default Timer;

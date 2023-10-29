import React, { useContext, useEffect, useState } from "react";
import { QuestionContext } from "./../../context/questions.context";
import styled from "styled-components";
import {makeScreenBlankTemp} from "./../../utils/utils"



const BlankScreenBtnStyles = styled.button`
  width: min-content;
  &.red {
    background: #fe4d1c;
  }
  &.green {
    background: var(--lightgreen);
  }
`;

const BlankScreenBtn = () => {
   const { currentQuestion } = useContext(QuestionContext);
const [color, setColor] =  useState("red")

useEffect(() => {
  setColor("red");
}, [currentQuestion]);

  const handleClick = async () => {
   await makeScreenBlankTemp()
   setColor("green")
  };


  return (
    <>
      <BlankScreenBtnStyles type="button" onClick={() => handleClick()} className={`${color}`} >
        Blank Screen
      </BlankScreenBtnStyles>
     
    </>
  );
};

export default BlankScreenBtn;

import React, { useContext } from "react";
import { QuestionContext } from "./../../context/questions.context";
import styled from "styled-components";



const BlankScreenBtnStyles = styled.button`
  width: min-content;
  background: #fe4d1c;
`;

const BlankScreenBtn = () => {
   const {

   } = useContext(QuestionContext);

  const handleClick = async () => {
   
  };


  return (
    <>
      <BlankScreenBtnStyles type="button" onClick={() => handleClick()} className="test">
        Blank Screen TBC
      </BlankScreenBtnStyles>
     
    </>
  );
};

export default BlankScreenBtn;

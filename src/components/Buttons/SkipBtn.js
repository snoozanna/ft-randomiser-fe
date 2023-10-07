import React from "react";
import styled from "styled-components";


const SkipBtnStyles = styled.button`
 width: fit-content;

`;

const SkipBtn = ({ setQuestionSequenceIndex }) => {
  const handleClick = () => {
    console.log("Go button fires");
    setQuestionSequenceIndex((currentIndex) => {
      return currentIndex + 1;
    });
  };

  return (
    <SkipBtnStyles type="button" onClick={() => handleClick()} className="test">
      Skip
    </SkipBtnStyles>
  );
};

export default SkipBtn;

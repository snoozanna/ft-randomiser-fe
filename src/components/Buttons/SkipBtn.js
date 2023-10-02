import React from "react";
import styled from "styled-components";


const SkipBtnStyles = styled.button`
 width: fit-content;

`;

const SkipBtn = () => {

  const handleClick = () => {
    console.log("Skip button fires")
  };

  return (
    <SkipBtnStyles type="button" onClick={() => handleClick()}  className="test">
      Skip
    </SkipBtnStyles>
  );
};

export default SkipBtn;

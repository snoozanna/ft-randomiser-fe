import React from "react";
import styled from "styled-components";


const NonNegBtnStyles = styled.button`
 width: fit-content;

`;

const NonNegBtn = () => {

  const handleClick = () => {
    console.log("Non Neg button fires")
  };

  return (
    <NonNegBtnStyles type="button" onClick={() => handleClick()}  className="test">
      Rapid Fire
    </NonNegBtnStyles>
  );
};

export default NonNegBtn;

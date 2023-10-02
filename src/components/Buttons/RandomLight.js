import React from "react";
import styled from "styled-components";


const RandomLightBtnStyles = styled.button`

`;

const RandomLightBtn = () => {

  const handleClick = () => {
    console.log("Random Lights button fires")
  };

  return (
    <RandomLightBtnStyles type="button" onClick={() => handleClick()}  >
      Random Light
    </RandomLightBtnStyles>
  );
};

export default RandomLightBtn;

import React from "react";
import styled from "styled-components";


const GoBtnStyles = styled.button`
 width: fit-content;

`;

const GoBtn = () => {

  const handleClick = () => {
    console.log("Go button fires")
  };

  return (
    <GoBtnStyles type="button" onClick={() => handleClick()}  className="test">
      Go
    </GoBtnStyles>
  );
};

export default GoBtn;

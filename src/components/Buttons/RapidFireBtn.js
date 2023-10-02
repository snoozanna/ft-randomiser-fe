import React from "react";
import styled from "styled-components";


const RapidBtnStyles = styled.button`
 width: fit-content;

`;

const RapidFireBtn = () => {

  const handleClick = () => {
    console.log("Rapid Fire button fires")
  };

  return (
    <RapidBtnStyles type="button" onClick={() => handleClick()}  className="test">
      Rapid Fire
    </RapidBtnStyles>
  );
};

export default RapidFireBtn;

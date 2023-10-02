import React, {useState} from "react";
import styled from "styled-components";


const LockInBtnStyles = styled.button`
 width: fit-content;
  &:disabled,
  &[disabled] {
    background: grey;
    pointer-events: none;
  }
`;

const LockInBtn = () => {
const [disabled, setDisabled] = useState(true)
  const handleClick = () => {
    console.log("Locked in button fires")
  };

  return (
    <LockInBtnStyles type="button" onClick={() => handleClick()} disabled={disabled} className="test">
      Lock In
    </LockInBtnStyles>
  );
};

export default LockInBtn;

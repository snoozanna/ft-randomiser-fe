import React, { useContext } from "react";
import styled from "styled-components";
import ParticipantContext from "../../context/participant.context";


const NonNegBtnStyles = styled.button`
 width: fit-content;

`;

const SetSpermHaverStatusBtn = ({setSpermStatusConfirmed}) => {
  const {
    personHasSperm, setPersonHasSperm
   } = useContext(ParticipantContext)


  return (
    <>
    <button onClick={()=>{ 
      setPersonHasSperm(true)
      setSpermStatusConfirmed(true)
    }} >Has sperm</button>
    <button onClick={()=>{
        setPersonHasSperm(false)
        setSpermStatusConfirmed(true)
    }} >Does not have sperm</button>
    </>
  );
};
    // <NonNegBtnStyles type="button" onClick={() => handleClick()}  className="test">

    // </NonNegBtnStyles>
export default SetSpermHaverStatusBtn;

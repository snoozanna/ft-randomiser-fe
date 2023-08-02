import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { QuestionContext } from '../context/questions.context';

import { devices } from '../styles/breakpoints';

const FooterStyles = styled.footer`
background-color:var(--blue);
z-index: 9999;
position:fixed;
bottom:0;
padding:  var(--padding);
padding-top: 0;
width: 90vw;
  display: flex;
  justify-content: flex-start;
  justify-content: space-between; 
   align-items:end;
  .scroller-wrapper{
    back
  }
    @media ${devices.mobileL} {
     align-items:end;

    }
`;

const Footer = () => {
  const { reset } = useContext(QuestionContext);

  return (
    <FooterStyles>
      <button type="button" onClick={() => reset()}>
        RESET
      </button>
      <Link to="/simple">Simple Randomiser</Link>
      <Link to="/questions-list">Question List</Link>
      <Link to="/by-category">Question by Category</Link>
      <Link to="/by-level">Question by Level</Link>
    </FooterStyles>
  );
};

export default Footer;

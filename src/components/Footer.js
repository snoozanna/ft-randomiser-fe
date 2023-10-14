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
width: 100%;
  display: flex;
  justify-content: flex-start;
  justify-content: space-around; 
   align-items:end;
  nav{
    width: 100%;
    display: flex;
  justify-content: space-around; 
  }
  .scroller-wrapper{
    back
  }
    @media ${devices.mobileL} {
     align-items:end;
     width: 100%;
nav{
    width: 100%;
    display: flex;
  justify-content: space-around; 
  flex-direction: column;
  a{
    text-align:right;
    margin-block-end:1rem;
  }
  }
    }
`;

const Footer = () => {
  const { reset } = useContext(QuestionContext);

  return (
    <FooterStyles>
      {/* <button type="button" onClick={() => reset()}>
        RESET
      </button> */}
      <nav>
        {/* <Link to="/simple">Simple Randomiser</Link> */}
        {/* <Link to="/questions-list">Question List</Link> */}
        {/* <Link to="/by-category">Question by Category</Link> */}
        {/* <Link to="/by-level">Question by Level</Link> */}
        <Link to="/sequence">Build Sequence</Link>
        <Link to="/randomiser">Randomiser</Link>
        <Link to="/listener">Listener</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </FooterStyles>
  );
};

export default Footer;

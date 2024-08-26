import React from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';





const HomePageStyles = styled.section`
  /* padding: clamp(5px, 5vw, 25px); */
  min-height: 70vh;

  display: flex;
  justify-content:center;
  align-items:center;

  @media ${devices.mobileL} {
    grid-template-columns: repeat(3, minmax(50px, 1fr));
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'a a .'
      'a a b'
      '. e d';
    gap: 2rem;
  }
`;

const HomePage = () => {
 
  return (
    <HomePageStyles>
      <h3>First Trimester Randomiser. </h3>
    </HomePageStyles>
  );
}
;

export default HomePage;

// export const query = graphql`

// `;

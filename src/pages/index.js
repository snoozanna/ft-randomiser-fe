import React from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';





const HomePageStyles = styled.section`
  /* padding: clamp(5px, 5vw, 25px); */
  min-height: 70vh;

  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  grid-template-rows: auto auto;
  grid-template-areas:
    'a a b b'
    'a a . d';
  /* gap: 2rem; */

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
 
  return <p>Randomiser </p>;
}
;

export default HomePage;

// export const query = graphql`

// `;

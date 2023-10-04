import { Link, graphql } from 'gatsby';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from "@apollo/client";
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import GET_CURRENT_QUESTION from '../queries/GET_CURRENT_QUESTION.js';
import Loader from '../components/Loader/index.js';



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
  const { data, loading, error } = useQuery(GET_CURRENT_QUESTION);

  if (loading) return <Loader />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (!data) return <text>Could not find data</text>;
  console.log(data);
    const { currentQ } = data;
  return <p>Randomiser {currentQ[0].question.question}</p>;
}
;

export default HomePage;

// export const query = graphql`

// `;

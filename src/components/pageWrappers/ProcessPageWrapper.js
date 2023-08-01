import { graphql } from 'gatsby';
import React, { useContext, useEffect, forwardRef } from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import ProcessStepsList from '../ProcessStepsList';
import { devices } from '../../styles/breakpoints';
import HeaderMob from '../HeaderMob';

// import SEO from '../components/SEO';
const StepsPageStyles = styled.section`
  padding: 5rem;
  min-height: 60vh;
  /* margin: -1vw; */
  display: flex;
  flex-direction: column;
  .hero-text-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${devices.mobileL} {
    padding: 2rem;
  }
`;

const StepsPageWrapper = forwardRef(({ data }, ref) => {
  StepsPageWrapper.displayName = 'StepsPageWrapper';
  const steps = data.nodes;

  return (
    <>
      <HeaderMob title="Process" />
      <StepsPageStyles ref={ref} id="process">
        <ProcessStepsList steps={steps} />
      </StepsPageStyles>
    </>
  );
});
export default StepsPageWrapper;

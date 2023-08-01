import { Link, graphql } from 'gatsby';
import React, { useContext, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import FAQList from '../FAQList';
import FAQCategoryFilter from '../FAQCategoryFilter';
// import SEO from '../SEO';
import { devices } from '../../styles/breakpoints';

import HeaderMob from '../HeaderMob';

const FAQPageStyles = styled.section`
  padding: clamp(5px, 1vw, 25px);
  min-height: 60vh;
  /* margin: -1vw; */
  display: flex;
  flex-direction: column;
  .css-wldg4a-MuiPaper-root-MuiAccordion-root:before {
    background-color: transparent;
  }
  @media ${devices.mobileL} {
  }
`;

const FAQPageWrapper = forwardRef(({ data }, ref) => {
  FAQPageWrapper.displayName = 'FAQPageWrapper';
  const faqs = data.nodes;

  return (
    <>
      <HeaderMob title="FAQs" />
      <FAQPageStyles className="narrow" ref={ref} id="faqs">
        {/* <SEO title="FAQs" /> */}
        {/* <FAQCategoryFilter /> */}
        <FAQList faqs={faqs} />
      </FAQPageStyles>
    </>
  );
});

export default FAQPageWrapper;

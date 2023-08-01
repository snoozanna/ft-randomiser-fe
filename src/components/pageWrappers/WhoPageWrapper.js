import React, { useContext, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import { PortableText } from '@portabletext/react';
// import { MenuContext } from '../context/menu.context';
import HeaderMob from '../HeaderMob';

const ParticipatePageStyles = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto;
  padding: clamp(5px, 1vw, 25px);
  min-height: 60vh;
  /* margin: -1vw; */

  .hero-text-wrapper {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
  }
  .hero-img-wrapper {
    background-color: var(--yellow);
    min-height: 400px;
    /* height: 400px; */
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      text-align: center;
      color: black;
    }
  }
`;
const WhoPageWrapper = forwardRef(({ data }, ref) => {
  // const { setCurrentPage } = useContext(MenuContext);
  // const { pathname } = location;
  WhoPageWrapper.displayName = 'WhoPageWrapper';
  const participate = data.nodes[0];

  // useEffect(() => {
  //   setCurrentPage(pathname);
  // }, []);

  return (
    <>
      <HeaderMob title="Who can participate?" />
      <ParticipatePageStyles className="narrow" id="who" ref={ref}>
        <div className="hero-text-wrapper">
          <div className="funTitle green">
            <h3 className="catName">{participate.heading}</h3>
          </div>
          <PortableText value={participate.copy} />
          <p>
            Read
            <Link to="/faqs"> FAQs </Link>to find out more.
          </p>
        </div>
        <div className="hero-img-wrapper">
          <span className="tagline">
            {' '}
            a funny picture of Krishna and Rent holding a doll or something
          </span>
        </div>
      </ParticipatePageStyles>
    </>
  );
});

export default WhoPageWrapper;

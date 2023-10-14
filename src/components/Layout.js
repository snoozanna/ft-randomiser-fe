import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import Footer from './Footer';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
// import { ScrollReveal } from 'gatsby-plugin-scroll-reveal';
import { devices } from '../styles/breakpoints.js';


const ContentStyles = styled.div`
  min-height: 100vh;
  /* background: white;*/

  /*  padding: clamp(5px, 1vw, 25px); */
  /* min-height: 100vh; */
  /* margin: 12rem auto 4rem auto; */
`;

const MainStyles = styled.main`
  height: 100%;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding: 4rem;
  @media ${devices.mobileL} {
    margin-bottom: 8rem;
  }
`;

const Layout = ({ children }) => {


return (
  <>
    <GlobalStyles />
    <Typography />
    {/* <SiteBorderStyles> */}
    <ContentStyles>
      {/* <NavButton /> */}
      <MainStyles>
        {/* <ScrollReveal> */}
        {children}

        {/* </ScrollReveal> */}
      </MainStyles>
      <Footer />
    </ContentStyles>
    {/* </SiteBorderStyles> */}
  </>
);

}
 


export default Layout;

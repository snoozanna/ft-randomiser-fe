import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import Footer from './Footer';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import {TimerContext} from "./../context/timer.context";
import { devices } from '../styles/breakpoints.js';

const LayoutStyles = styled.div`
  &.warning {
    background: #f4d2f3;
  }
`;

const ContentStyles = styled.div`
  min-height: 100vh;

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
 const {oneMinWarning } = useContext(TimerContext);

return (
  <LayoutStyles className={`${oneMinWarning ? "warning": ""}`}>
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
  </LayoutStyles>
);

}
 


export default Layout;

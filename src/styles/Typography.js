import { createGlobalStyle } from 'styled-components';
import { devices } from './breakpoints.js';
import heading from '../assets/fonts/KantataAksara.ttf';

const Typography = createGlobalStyle`

 @font-face {
    font-family: KantataAksara;
    src: url(${heading});
  } 

  html {
     font-family: "Roboto", -apple-system, 
     BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
     font-weight: 300;
    color: var(--black);
  }
  p, li {
    letter-spacing: 0.5px;
    line-height: 3rem;
  }

  
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;

  }
  h1, h2{
    font-family: var(--headings);
    text-transform:uppercase;
  }
  h3,h4,h5,h6{
    font-family: var(--subheadings); 
  }
h2{
  font-size:4rem;
}
  h3{
    font-size: 3.5rem;
    letter-spacing: 0.15rem;
  }

   h4{
    font-size: 2.5rem;
    letter-spacing: 0.15rem;
  }

  li{
    
  }

  .funTitle{
    border-bottom: 2px solid var(--yellow);
    width: fit-content;
 line-height: 5rem;
  
  }

  .funTitle > h3{
  font-weight: 600;
     width: calc(fit-content + 5rem);
  }

    .funTitle > h3.catName{
    font-family: var(--headings);
  }

  .funTitle > .color.pink{
    color: var(--pink);
  }

   .funTitle.green{
    color: var(--lightgreen);
  }

  
  a {
    color: var(--mintgreen);
    text-decoration-color: var(--red);
    /* Chrome renders this weird with this font, so we turn it off */
    text-decoration-skip-ink: none;
    font-weight: 600;
  }

    a:hover {
    color: var(--yellow);
    
  }

  mark, .mark {
    background: var(--yellow);
    padding: 0 2px 2px 2px;
    margin: 0;
    display: inline;
    line-height: 1;
  }

  .tagline{
     font-family: 'Inconsolata', monospace;
  }

  .center {
    text-align: center;
  }

  .tilt {
    transform: rotate(-2deg);
  }
   @media ${devices.mobileL} {
  h2{
  font-size:3.5rem;
}
  h3{
    font-size: 2.5rem;
    letter-spacing: 0.15rem;
  }
   h4{
    font-size: 2.2rem;
    letter-spacing: 0.15rem;
  }
  }
`;

export default Typography;

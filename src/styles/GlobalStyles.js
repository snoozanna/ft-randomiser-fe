import { createGlobalStyle } from 'styled-components';

import { devices } from './breakpoints.js';

const GlobalStyles = createGlobalStyle`
  :root {
    --red: #FF4949;
    --black: 0000;
    --white: #fff;
    --grey: #efefef;
    --blue:#3e31de;
       --mustyblue: #5E87EF;
    /* SET COLOURS  */
     --yellow: #FDC24C;
    --pink:#ff87e5;
    --orange:#dc7a30;
    --coral:#ff7f50;
    --brown: hsl(323 21% 16%);
    --mintgreen: #32D7B9;
     --lightgreen: #98e9d4;
    /* --purple: hsl(16.88deg 96.55% 45.49% / 30.98%); */
     --purple:#d866a7;
    --clr-neon: hsl(300 85% 73%);
  --clr-bg: hsl(323 21% 16%);
  --clr-blue-neon: #32D7B9;
    --headings: "KantataAksara";
    --subheadings: "Inconsolata";
    --body:"Roboto";
    --padding: 3rem;
  }

  html {
    /* background-image: url(${bg}); */
    background-color: var(--blue) ;
    background-color: var(--orange) ;

    font-size: 10px;
  }

/* GENERICS */
  html,
body {
  min-height: 100vh;
    font-size: 1.6rem;
  margin: 0;
  color: black;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

/* Try to keep your margins going in one direction to avoid margin collapase or grounding. I switch all the top margins off to avoid this issue. */
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
dl,
dt,
dd,
blockquote,
address,
article,
aside,
details,
dialogue,
fieldset,
figcaption,
figure,
footer,
form,
header,
hr,
main,
nav,
pre,
section,
table,
p {
  margin-top: 0;
  margin-block-start: 0;
}

a {
  color: inherit;
  text-decoration: none;
  /* You MUST make sure that links stand out from nomal text though...*/
}

/*
    a:hover,
    a:focus {
      text-decoration: underline;
    }
  */

/* stops icons being the target of JS click events */
a.btn *,
button * {
  pointer-events: null;
}

    img {
  /* This means that it can be less than 100% of the width of its parent IF the image is INTRINSICALLY smaller */
  max-width: 100%;

  height: auto;
  /* 'auto' is the initial value for height BUT for images (and other elements which have an intrinic height) that is not the case. To make an image responsive you set one dimension (usually width) to [max-]width: 100%; and the other to 'auto' to ensure it keeps aspect ratio. 'auto' basically tells the browser to decide. */
  vertical-align: middle;
  /* minor vertical centering. Works for images IF there is a baseline (i.e. they are displayed inline or inline-block) */
}


 

  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }

  button {
    background: var(--pink);
    color: black;
    font-weight: 600;
    border: 2px solid black;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    --cast: 4px;
    box-shadow: var(--cast) var(--cast) 0 var(--black);
    /* text-shadow: 0.5px 0.5px 0 var(--black); */
    transition: all 0.2s;
    &:hover {
      --cast: 6px;
    }
  
  }

  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }

  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--pink) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--pink) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }

  hr {
    border: 0;
    height: 8px;

    background-size: 1500px;
  }

  img {
    max-width: 100%;
  }

  .tilt {
    transform: rotate(-2deg);
    position: relative;
    display: inline-block;
  }
  html {
  box-sizing: border-box;
  font-size: 62.5%; /* Mostly equivalates to 10px but allows users accessibility zoom settings to work*/
  /* font-size: 10px; */
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Because we us <ul>s for lists that we don't always want bulletted. */
ul {
  list-style: none;
  padding-left: 0;
}

/* To make actual bulletted lists */
ul.typographic {
  list-style: initial;
  padding-inline-start: 20px;
}

/* For 'accessibility text'. If your button only has an image inside it that isn't good for accessibility. Put a span inside there and give it this class and put some descriptive text for what the button does into the span. */

.sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  -webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  clip-path: auto;
  -webkit-clip-path: auto;
  white-space: normal;
}
  

 


`;

export default GlobalStyles;

import React, { useContext } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
// import { animated } from '@react-spring/web';
import { MenuContext } from '../context/menu.context';
import { devices } from '../styles/breakpoints.js';
import icon from '../assets/images/baby.png';
import Nav from './Nav';

const NavButtonStyles = styled.div`
  width: fit-content;
  /* margin: -1vw; */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  padding: 1rem var(--padding);

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 2rem; /* margin-left: -10rem; */
  .flex-col {
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: right;
  }

  button {
    box-shadow: none;
    /* background-color: var(--pink); */
    z-index: 999;
  }
  @media ${devices.mobileL} {
    padding: 0 1rem;
    margin-bottom: var(--padding);
    /* padding-top: 2rem; */
    .siteTitle > h1 {
      text-align: center;
      font-size: 2rem;
    }
    h2 {
      font-size: 2.8rem;
    }
  }
`;

const MenuToggleButtonStyles = styled.div`
  width: 40px;
`;

const NavButton = () => {
  const { isOpen, toggle } = useContext(MenuContext);

  return (
    <>
      {/* <Scroll /> */}
      <NavButtonStyles>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggle}
          sx={{ boxShadow: 'none' }}
        >
          <MenuToggleButtonStyles>
            <img src={icon} alt="baby" />
          </MenuToggleButtonStyles>
        </IconButton>
      </NavButtonStyles>

      {isOpen ? <Nav /> : ''}
    </>
  );
};
export default NavButton;

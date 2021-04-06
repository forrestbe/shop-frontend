import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import NavStyles from './styles/NavStyles';
import { UseUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import { DropDown } from './Dropdown';

const MenuWrapper = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding-left: 0;
  
  li {
    display: flex;
    align-items: center;
    height: var(--header-height);
  }
`;

const IconWrapper = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding-left: 0;
 
  
  .search-icon {
    height: var(--icon-height);
    
    svg {
      height: var(--icon-height);
    }
  }
`;

const Logo = styled.h1`
  font-size: 3rem;
  margin: 0;
  position: relative;
  z-index: 2;
  a {
    text-decoration: none;
    text-transform: uppercase;
  }
`;

const IconStyles = styled.span`
  display: block;
  height: var(--icon-height);
  
  svg {
    height: var(--icon-height);
  }
`;

interface PropTypes {
  toggleSearch: any
}

export default function Nav({ toggleSearch }: PropTypes): JSX.Element {
  const user = UseUser();
  const { openCart } = useCart();
  const quantity = user?.cart.reduce((tally, cartItem) => {
    return tally + (cartItem.product ? cartItem.quantity: 0);
  }, 0)
  return (
    <NavStyles>
      <Logo>
        <Link href="/">Atma</Link>
      </Logo>
      <MenuWrapper>
        <li><Link href="/products">Products</Link></li>
        { user &&
          <React.Fragment>
            <li><Link href="/sell">Sell</Link></li>
            <li><Link href="/orders">Orders</Link></li>
            <li><Link href="/account">Account</Link></li>
          </React.Fragment>
        }
      </MenuWrapper>
      {
        user && (
          <IconWrapper>
            <li>
              <DropDown title={
                <IconStyles>
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m431.964 435.333c-.921-58.994-19.3-112.636-51.977-151.474-32.487-38.601-76.515-59.859-123.987-59.859s-91.5 21.258-123.987 59.859c-32.646 38.797-51.013 92.364-51.973 151.285 18.46 9.247 94.85 44.856 175.96 44.856 87.708 0 158.845-35.4 175.964-44.667z"/><circle cx="256" cy="120" r="88"/></svg>
                </IconStyles>
              }>
                <li><SignOut /></li>
              </DropDown>
            </li>
            <li>
              <button className="search-icon" onClick={toggleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999"><path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z"/></svg>
              </button>
            </li>
            <li>
              <button onClick={openCart} type="button">
                <CartCount count={quantity} />
              </button>
            </li>
          </IconWrapper>
        )
      }
      {
        !user && (
          <Link href="/signin">Sign In</Link>
        )
      }
    </NavStyles>
  );
}

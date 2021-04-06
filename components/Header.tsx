import React, { useState } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

const HeaderStyles = styled.header`
  .bar {
    height: var(--header-height);
    border-bottom: 1px solid var(--black, black);
    padding-right: 2rem;
    padding-left: 2rem;
    line-height: 1;
  }
  .sub-bar {
    display: none;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black);
  }
  .sub-bar--show-search {
    display: grid;
  }
`;

export default function Header(): JSX.Element {
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = (): void => setShowSearch(!showSearch);

  return (
    <HeaderStyles>
      <div className="bar">
        <Nav toggleSearch={toggleSearch} />
      </div>
      <div className={showSearch ? 'sub-bar sub-bar--show-search' : 'sub-bar'}>
        <Search />
      </div>
      <Cart />
    </HeaderStyles>
  );
}

import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
  :root {
    --base-border: 1px solid black;
  }

  @font-face {
    font-family: 'ww8';
    src: url('/static/wwbeta8_medium.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    --red: #ff0000;
    --black: #000000;
    --grey: #3A3A3A;
    --lightGrey: #E1E1E1;
    --offWhite: #EDEDED;
    --maxWidth: 1000px;
    --header-height: 60px;
    --bs: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
    box-sizing: border-box;
    font-size: 0.625em;
  }
  
  *, *:before, *:after {
  box-sizing: inherit;
  }
  
  body {
    font-family: 'ww8', serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
  
  h1 {
    font-size: 4.2rem;
  }
  
  a {
    text-decoration: none;
    color: var(--black);
  }
 
  button {
    font-family: 'ww8', -apple-system, Roboto, sans-serif;
  }
  
  img {
    height: auto;
  }
`;

interface PageProps {
  children: React.ReactNode
}

export default function Page({ children }: PageProps): JSX.Element {
  return (
    <div>
      <GlobalStyles />
      <Header />
      {children}
    </div>
  );
}

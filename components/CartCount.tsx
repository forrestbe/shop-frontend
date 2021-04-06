import React from 'react';
import styled from 'styled-components';

interface PropTypes {
  count: number;
}

const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  font-size: 1.3rem; 
`;

const CartCountStyles = styled.span`
  position: relative;
  display: block;
  svg {
    width: 30px;
    height: var(--icon-height);  
  }
  
  .count {
    position: absolute;
    top: 7px;
    left: 50%;
    transform: translateX(-50%);
    color: rgb(255, 255, 255);
    font-size: 1.2rem;
  }
`;

export default function CartCount({ count }: PropTypes): JSX.Element {
  return (
    <CartCountStyles>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 279 279"><path d="M262.421 270.339L246.466 72.896A7.5 7.5 0 00238.99 66h-42.833v-9.495C196.157 25.348 171.143 0 139.985 0h-.99c-31.157 0-56.838 25.348-56.838 56.505V66H39.99a7.5 7.5 0 00-7.476 6.896l-16 198A7.504 7.504 0 0023.99 279h231.02a7.499 7.499 0 007.411-8.661zM97.157 56.505C97.157 33.619 116.109 15 138.995 15h.99c22.886 0 41.172 18.619 41.172 41.505V66h-84v-9.495z"/></svg>
      <span className="count">{count}</span>
    </CartCountStyles>
  )
}

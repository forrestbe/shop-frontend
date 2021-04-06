import React from 'react';
import styled from 'styled-components';

const TickerStyles = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  border-top: 1px solid rgb(0, 0, 0);
  border-bottom: 1px solid rgb(0, 0, 0);
  overflow: hidden;
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: 9.2rem;
  text-transform: uppercase;
  line-height: 1;
  
  span {
    padding-right: 4rem;
    padding-left: 4rem;
    animation: marquee 8s linear infinite;
  }
  
  @keyframes marquee {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-100%, 0, 0); }
  }
`;

interface PropTypes {
  tickerText: string;
}

export function TickerComponent({ tickerText }: PropTypes): JSX.Element {
  return (
    <TickerStyles>
      <span>{tickerText}</span>
      <span>{tickerText}</span>
    </TickerStyles>
  )
}

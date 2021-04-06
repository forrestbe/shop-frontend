import React from 'react';
import styled from 'styled-components';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import RequestReset from '../components/RequestReset';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage(): JSX.Element {
  return (
   <GridStyles>
     <SignIn />
     <SignUp />
     <RequestReset />
   </GridStyles>
  )
}

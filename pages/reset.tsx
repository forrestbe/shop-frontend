import React from 'react';
import RequestReset from '../components/RequestReset';
import ResetPassword from '../components/Reset';

interface PropTypes {
  query: {
    token: string;
  }
}

export default function ResetPage({ query }: PropTypes): JSX.Element {
  const { token } = query;
  if (!token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    )
  }
  return (
    <div>
      <p>Reset your password {token}</p>
      <ResetPassword token={token} />
    </div>
  )
}

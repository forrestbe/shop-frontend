import useForm from '../lib/userForm';
import Form from './styles/Form';
import React from 'react';
import { gql } from '@apollo/client/core';
import { useMutation } from '@apollo/client';
import Error from './ErrorMessage';

interface PropTypes {
  token: string;
}

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($email: String!, $token: String!, $password: String!) {
    redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
      code
      message
    }
  }
`;

export default function ResetPassword({ token }: PropTypes): JSX.Element {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token
  })
  const [reset, { data, loading }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const error = data?.redemUserPasswordResetToken?.code ? data?.redemUserPasswordResetToken : undefined;
  async function handleSubmit(e) {
    e.preventDefault();
    await reset();
    console.log({ data, loading, error });
    resetForm();
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Reset your password</h2>
      <Error error={error} />
      <fieldset>
        {data?.redemUserPasswordResetToken === null && (
          <p>Success! You can now sign in!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            placeholder="password"
            type="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Request reset</button>
    </Form>
  )
}

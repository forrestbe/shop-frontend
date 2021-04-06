import useForm from '../lib/userForm';
import Form from './styles/Form';
import React from 'react';
import { gql } from '@apollo/client/core';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn(): JSX.Element {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  })
  const [signin, { data }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  async function handleSubmit(e) {
    e.preventDefault();
    await signin();
    console.log({ error });
    resetForm();
  }
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <h2>Sign in to your account</h2>
        <Error error={error} />
        <label htmlFor="userName">
          Username
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
      <button type="submit">Sign In</button>
    </Form>
  )
}

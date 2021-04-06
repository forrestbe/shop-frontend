import useForm from '../lib/userForm';
import Form from './styles/Form';
import React from 'react';
import { gql } from '@apollo/client/core';
import { useMutation } from '@apollo/client';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset(): JSX.Element {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  })
  const [signup, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    await signup();
    console.log({ data, loading, error });
    resetForm();
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Request a password reset</h2>
      <Error error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
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
      </fieldset>
      <button type="submit">Request reset</button>
    </Form>
  )
}

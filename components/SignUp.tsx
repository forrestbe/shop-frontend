import useForm from '../lib/userForm';
import Form from './styles/Form';
import React from 'react';
import { gql } from '@apollo/client/core';
import { useMutation } from '@apollo/client';
import Error from './ErrorMessage';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp(): JSX.Element {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  })
  const [signup, { data, loading, error }] = useMutation(SIGN_UP_MUTATION, {
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
      <h2>Sign up for an account</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && <p>Signed up with {data?.createUser?.email} - Please go ahead and sign in!</p>}
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
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            placeholder="name"
            type="name"
            value={inputs.name}
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
      <button type="submit">Sign Up</button>
    </Form>
  )
}

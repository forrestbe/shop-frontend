import React from 'react';
import useForm from '../lib/userForm';
import Form from './styles/Form';
import { gql } from '@apollo/client/core';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload!
  ) {
    createProduct(data:{
      name: $name,
      description: $description,
      price: $price,
      status: "AVAILABLE",
      photo: {
        create: {
          image: $image,
          altText: $name
        }
      }
    }) {
      id
      price
      description
    }
  }
`;

export function CreateProduct(): JSX.Element {
  const { inputs, handleChange, clearForm  } = useForm({
    image: '',
    name: 'Nice Shoes',
    price: 123123,
    description: 'Yves Tumor is a legend',
  });
  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }]
  })
  return (
    <Form onSubmit={async(e) => {
      e.preventDefault();
      // Submit the input fields to the backend
      const res = await createProduct();
      clearForm();
      // Go to that products page
      Router.push({
        pathname: `product/${res.data.createProduct.id}`
      })
    }}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            placeholder="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            id="price"
            name="price"
            placeholder="price"
            type="number"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">+ Add Product</button>
    </Form>
  );
}

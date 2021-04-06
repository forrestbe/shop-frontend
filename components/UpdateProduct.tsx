import React from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { SingleProductData } from '../models/Product.model';
import Form from './styles/Form';
import Router from 'next/router';
import DisplayError from './ErrorMessage';
import useForm from '../lib/userForm';

interface PropTypes {
  id: string;
}

const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!) {
        Product(where: { id: $id}) {
            id
            name
            description
            price
        }
    }
`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!
        $name: String
        $description: String
        $price: Int
    ) {
        updateProduct(
            id: $id,
            data: { name: $name, description: $description, price: $price }
        ) {
            id
            name
            description
            price
        }
    }
`;

export default function UpdateProduct({ id }: PropTypes): JSX.Element {
  const { data, loading, error } = useQuery<SingleProductData>(SINGLE_PRODUCT_QUERY, {
    variables: { id }
  });
  const [updateProduct, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_PRODUCT_MUTATION);
  const { inputs, handleChange, clearForm  } = useForm(data?.Product);
  if (loading) return <p>Loading...</p>;
  return (
    <Form onSubmit={async(e) => {
      // @TODO handle submit
      e.preventDefault();
      const { name, description, price } = inputs;
      const res = await updateProduct({
        variables: {
          id,
          name, description, price
        }
      });
    }}>
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
      <button type="submit">Update Product</button>
    </Form>
  );
}

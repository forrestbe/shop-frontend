import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($productId: ID!) {
    addToCart(productId: $productId) {
      id
    }
  }
`;

interface PropTypes {
  id: string;
}

export default function AddToCart({ id }: PropTypes): JSX.Element {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      productId: id,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  return <button disabled={loading} type="button" onClick={() => addToCart()}>Add to cart</button>
}

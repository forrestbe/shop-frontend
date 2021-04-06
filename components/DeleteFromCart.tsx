import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

const DELETE_FROM_CART_MUTATION = gql`
  mutation DELETE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

interface PropTypes {
  id: string;
}

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  cursor: pointer;
`;

function update(cache, payload): void {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function DeleteFromCart({ id }: PropTypes): JSX.Element {
  const [deleteCartItem, { loading }] = useMutation(DELETE_FROM_CART_MUTATION, {
    variables: { id },
    update,
  })

  return <BigButton
          onClick={() => deleteCartItem()}
          title="Remove item from cart"
          disabled={loading}
          type="button"
         >
          &times;
        </BigButton>
}

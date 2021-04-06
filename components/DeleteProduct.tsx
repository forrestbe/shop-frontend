import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

interface PropTypes {
  id: string,
  children: React.ReactNode
}

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload): void {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }: PropTypes): JSX.Element {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update
  });
  return <button type="button" onClick={() => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteProduct().catch(err => alert(err.message))
    }
  }}>{children}</button>;
}

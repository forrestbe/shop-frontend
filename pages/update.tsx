import React from 'react';
import UpdateProduct from '../components/UpdateProduct';

interface PropTypes {
  query: {
    id: string;
  }
}

export default function UpdatePage({ query }: PropTypes): JSX.Element {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}

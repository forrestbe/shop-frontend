import React from 'react';
import SingleProduct from '../../components/SingleProduct';

interface PropTypes {
  query: {
    id: string;
  }
}

export default function SingleProductPage({ query }: PropTypes): JSX.Element {
  return <SingleProduct id={query.id} />
}

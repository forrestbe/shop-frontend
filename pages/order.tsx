import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { OrderComponent } from '../components/Order';
import styled from 'styled-components';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      label
      total
      items {
        id
        name
        quantity
        price
        description
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

interface PropTypes {
  query: {
    id: string;
  }
}

const OrderPageStyles = styled.main`
  padding-top: 3.6rem;
`;

export default function OrderPage({ query }: PropTypes): JSX.Element {
  const { id } = query;
  const { data, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id }
  })
  if (loading) {
    return <p>Loading</p>;
  }
  const { Order } = data;
  return (
    <OrderPageStyles>
      <OrderComponent order={Order} />;
    </OrderPageStyles>
  )
}

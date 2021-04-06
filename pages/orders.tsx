import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { OrderData } from '../models/Order.model';
import { OrderComponent } from '../components/Order';

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    allOrders {
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

export default function OrdersPage(): JSX.Element {
  const { data, loading } = useQuery<OrderData>(ALL_ORDERS_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  const { allOrders } = data;
  return (
    <React.Fragment>
      <h1>Orders</h1>
      {allOrders.map(order => <OrderComponent key={order.id} order={order} />)}
    </React.Fragment>
  );
}

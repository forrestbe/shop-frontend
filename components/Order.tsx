import formatMoney from '../lib/formatMoney';
import { OrderItemComponent } from './OrderItem';
import React from 'react';
import styled from 'styled-components';
import { Order } from '../models/Order.model';

interface PropTypes {
  order: Order;
}

const OrderStyles = styled.section`
  margin-bottom: 4rem;
  border: var(--base-border);
  header {
    margin-bottom: 2rem;
    border-bottom: var(--base-border);
    padding: 1rem 2rem;
    h2,
    h3 {
      margin: 0;
      font-size: 1.4rem;
      line-height: 1.5; 
    }
  }
  ul {
    list-style: none;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export function OrderComponent({ order }: PropTypes): JSX.Element {
  return (
    <OrderStyles>
      <header>
        <h2>Order No: {order.label}</h2>
        <h3>Total: {formatMoney(order.total)}</h3>
      </header>
      <ul>
        {order.items.map(item => <li key={item.id}><OrderItemComponent orderItem={item} /></li>)}
      </ul>
    </OrderStyles>
  )
}

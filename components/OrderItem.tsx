import React from 'react';
import styled from 'styled-components';
import { OrderItem } from '../models/Order.model';

interface PropTypes {
  orderItem: OrderItem;
}

const OrderItemStyles = styled.div`
  display: flex;
  margin-bottom: 2rem;
  img {
    max-height: 200px;
    max-width: 200px;
  }
  .img-wrapper {
    flex-basis: 200px;
    max-width: 200px;
    text-align: center;
    margin-right: 1.6rem;
  }
`;

export function OrderItemComponent({ orderItem }: PropTypes): JSX.Element {
  return (
    <OrderItemStyles>
      <div className="img-wrapper">
        <img src={orderItem.photo?.image?.publicUrlTransformed} alt={orderItem.name} />
      </div>
      <div>
        <h3>{orderItem.quantity} x {orderItem.name}</h3>
      </div>
    </OrderItemStyles>
  );
}

import React from 'react';
import { CartItemType } from './User';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import DeleteFromCart from './DeleteFromCart';

interface PropTypes {
  cartItem: CartItemType
}

const CartItemStyles = styled.li`
  border-bottom: 1px solid var(--black);
  display: grid;
  grid-template-columns: 150px 1fr auto;
  padding: 20px;
  img {
    width: 100px;
    padding-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

export default function CartItem({ cartItem }: PropTypes): JSX.Element {
  const { product } = cartItem
  if (!product) return null;
  return (
    <CartItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} -
          <span>{cartItem.quantity} &times; {formatMoney(product.price)}</span>
        </p>
        <DeleteFromCart id={cartItem.id} />
      </div>
    </CartItemStyles>
  )
}

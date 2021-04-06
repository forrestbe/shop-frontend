import React from 'react';
import CartStyles from './styles/CartStyles';
import { UseUser } from './User';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import { calcTotalPrice } from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import Checkout from './Checkout';

export default function Cart(): JSX.Element {
  const user = UseUser();
  const { cartOpen, closeCart } = useCart();
  if (!user) return null;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <h3>{user.name}'s cart</h3>
        <button onClick={closeCart}>&times;</button>
      </header>
      <ul>
        {user?.cart?.map(cartItem =>
          <CartItem key={cartItem.id} cartItem={cartItem} />
        )}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  )
}

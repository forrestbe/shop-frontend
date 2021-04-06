import { CartItemType } from '../components/User';

export function calcTotalPrice(cart: CartItemType[]): number {
  return cart.reduce((tally, cartItem) => {
    return cartItem.product
      ? tally + (cartItem.product.price * cartItem.quantity)
      : tally
  }, 0)
}

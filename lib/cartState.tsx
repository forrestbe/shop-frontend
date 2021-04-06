import React, { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext(null);
const LocalStateProvider = LocalStateContext.Provider;

interface PropTypes {
  children: React.ReactNode
}

interface CartState {
  cartOpen: boolean;
  setCartOpen: () => boolean,
  toggleCart: () => void,
  closeCart: () => void,
  openCart: () => void,
}

function CartStateProvider({ children }: PropTypes): JSX.Element {
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart(): void {
    setCartOpen(!cartOpen);
  }

  function closeCart(): void {
    setCartOpen(false);
  }

  function openCart(): void {
    setCartOpen(true);
  }

  return <LocalStateProvider value={{cartOpen, setCartOpen, toggleCart, closeCart, openCart}}>{children}</LocalStateProvider>;
}

function useCart(): CartState {
  return useContext(LocalStateContext);
}

export { CartStateProvider, useCart };

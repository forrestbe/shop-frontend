import React, { useState } from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import SickButton from './styles/SickButton';
import nprogress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  display: grid;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm(): JSX.Element {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { closeCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [checkout, { error: graphQLError }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query:  CURRENT_USER_QUERY }]
  });
  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true);
    // 2. Start the page transition
    nprogress.start();
    // 3. Create the payment method via stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    console.log({ paymentMethod })
    // 4. Handle the error from stripe
    if (error) {
      setError(error);
      nprogress.done();
      return;
    }
    // 5. Send the token from step 3 to our keystone server via a custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id
      }
    });
    console.log('Finished with the order');
    console.log({ order });
    // 6. Change the page to view the order
    router.push({
      pathname: '/order',
      query: { id: order.data.checkout.id }
    })
    // 7. Close the cart
    closeCart();
    // 8. Turn the loader off
    setLoading(false);
    nprogress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p>{error?.message}</p>}
      {graphQLError && <p>{graphQLError?.message}</p>}
      <CardElement />
      <SickButton type="submit">Checkout Out Now</SickButton>
    </CheckoutFormStyles>
  )
}

export default function Checkout(): JSX.Element {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  )
}

import { useQuery, gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

 export interface User {
  id: string;
  email: string;
  name: string;
  cart:  CartItemType[];
}

export interface CartItemType {
  id: string;
  quantity: number;
  product: Product;
}

export interface Product {
  id: string;
  price: number;
  name: string;
  description: string;
  photo: {
    image: {
      publicUrlTransformed: string
    }
  }
}

export function UseUser(): User {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}

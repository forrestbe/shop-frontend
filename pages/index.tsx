import React from 'react';
import styled from 'styled-components';
import { TickerComponent } from '../components/Ticker';
import gql from "graphql-tag";
import { useQuery } from '@apollo/client';

const HeaderStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 750px;
  max-height: 90vh;
  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-right: 1px solid rgb(0, 0, 0);
  }
  h1,
  h2 {
    line-height: 1;
    margin: 0;
  }
  h1 {
    margin-bottom: 1.2rem;
    font-size: 4.6rem;
  }
  h2 {
    margin-bottom: 1.2rem;
  }
  div:nth-child(2) {
    background-image: url('/static/img/header-six.jpeg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
`;

const ProductGridStyles = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  list-style: none;
  img {
    width: 100%;
    height: 100%;
  }
`;

const FooterStyles = styled.div`
  background-image: url('/static/img/header-one.jpeg');
  background-position: top center;
  height: 900px;
`;

const FRONT_PAGE_PRODUCTS_QUERY = gql`
  query FRONT_PAGE_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip, where: { displayOnFrontPage: true }) {
      id
      name
      description
      price
      photo {
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function IndexPage(): JSX.Element {
  const tickerText = 'End of season sale: Explore here';
  const { data, loading } = useQuery(FRONT_PAGE_PRODUCTS_QUERY, {
    variables: {
      skip: 0,
      first: 8
    }
  });
  if (loading) {
    return <p>Loading</p>;
  }
  const { allProducts } = data;
  return (
    <React.Fragment>
      <HeaderStyles>
        <div>
          <h1>THE EROSCOPE</h1>
          <h2>2021-2022</h2>
        </div>
        <div></div>
      </HeaderStyles>
      <TickerComponent tickerText={tickerText} />
      <ProductGridStyles>
        {allProducts.map(product => (
          <li key={product?.id}>
            <img src={product?.photo?.image?.publicUrlTransformed} alt={product?.name} />
          </li>
        ))}
      </ProductGridStyles>
      <FooterStyles />
    </React.Fragment>
  );
}

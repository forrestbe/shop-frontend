import React from 'react';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import { Product as ProductModel } from '../models/Product.model';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';

interface ProductProps {
  product: ProductModel;
}

export default function Product({ product }: ProductProps): JSX.Element {
  return (
    <ItemStyles>
      <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <div className="buttonList">
        <Link href={{
          pathname: 'update',
          query: {
            id: product.id
          }
        }}>Edit️</Link>
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
        <AddToCart id={product.id} />
      </div>
    </ItemStyles>
  );
}

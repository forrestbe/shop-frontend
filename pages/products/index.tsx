import React from 'react';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/router';

export default function ProductsPage(): React.ReactNode {
  const { query } = useRouter();
  const pageQuery = query?.page as string;
  const page = parseInt(pageQuery);
  return (
    <div>
      <Pagination page={page || 1} />
      <Products page={page} />
    </div>
  );
}

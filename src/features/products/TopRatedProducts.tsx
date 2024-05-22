import React from 'react'
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { topRatedProductUrl } from '../../misc/endpoints';
import ProductCard from './ProductCard';

export default function TopRatedProducts() {
    const { products, loading, error } = useFetchProducts(topRatedProductUrl);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

import React from 'react'
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { topRatedProductUrl } from '../../misc/endpoints';
import ProductCard from '../../components/product/ProductCard';

export default function TopRatedProducts() {
    const { products, loading, error } = useFetchProducts(topRatedProductUrl);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

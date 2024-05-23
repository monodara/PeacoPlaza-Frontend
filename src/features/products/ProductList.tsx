import React from 'react';
import { ProductReadDto } from './productDto';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: ProductReadDto[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { ProductCreatedType, ProductType } from "../../misc/type";
import { ProductReadDto } from "../../features/products/productDto";

export let mockProducts: ProductReadDto[] = [
  {
    id: "mock-id-1",
    title: "product1",
    price: 1,
    description: "product1",
    inventory: 10,
    weight: 1.2,
    productImages: [{id:"mock-img-id-1", data:"mock-img-data-1"},{id:"mock-img-id-2", data:"mock-img-data-2"}],
    category: { id: "mock-cate-id", name: "clothes", image: "catImg" },
  },
  {
    id: "mock-id-1",
    title: "product2",
    price: 2,
    description: "product2",
    inventory: 10,
    weight: 1.2,
    productImages: [{id:"mock-img-id-1", data:"mock-img-data-1"},{id:"mock-img-id-2", data:"mock-img-data-2"}],
    category: { id: "mock-cate-id", name: "shoes", image: "catImg" },
  },
];

export const handler = [
  http.get("https://api.escuelajs.co/api/v1/products", () => {
    return HttpResponse.json(mockProducts, { status: 200 });
  }),
  http.post("https://api.escuelajs.co/api/v1/products", async ({ request }) => {
    const product = (await request.json()) as ProductCreatedType;
    const createdProduct: ProductType = {
      ...product,
      id: "mock-id",
      category: { id: product.categoryId, name: "clothes", image: "img" },
    };
    return HttpResponse.json(createdProduct, { status: 201 });
  }),
  http.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    async ({ request, params }) => {
      const { id } = params;
      if (!id) {
        return new HttpResponse(null, { status: 404 });
      }
      mockProducts.splice(0, 1);
      return HttpResponse.json(true, { status: 204 });
    }
  ),
  http.put(
    "https://api.escuelajs.co/api/v1/products/:id",
    async ({ params }) => {
      const { id } = params;
      const index = mockProducts.findIndex(
        product => product.id === id
      );
      const updatedProd = {
        ...mockProducts[index],
        title: "new Title",
        price: 999,
      };
      return HttpResponse.json(updatedProd, { status: 203 });
    }
  ),
];

export const productServer = setupServer(...handler);

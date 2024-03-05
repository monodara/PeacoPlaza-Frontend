import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { ProductCreatedType, ProductType } from "../../misc/type";

export let mockProducts: ProductType[] = [
  {
    id: 1,
    title: "product1",
    price: 1,
    description: "product1",
    images: ["img1", "img2"],
    category: { id: 1, name: "clothes", image: "catImg" },
  },
  {
    id: 2,
    title: "product2",
    price: 2,
    description: "product2",
    images: ["img1", "img2"],
    category: { id: 2, name: "shoes", image: "catImg" },
  },
];

export const handler = [
  http.get("https://api.escuelajs.co/api/v1/products", () => {
    console.log(HttpResponse.json(mockProducts, { status: 200 }));
    return HttpResponse.json(mockProducts, { status: 200 });
  }),
  http.post("https://api.escuelajs.co/api/v1/products", async ({ request }) => {
    const product = (await request.json()) as ProductCreatedType;
    const createdProduct: ProductType = {
      ...product,
      id: 3,
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
        (product) => product.id === Number(id)
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

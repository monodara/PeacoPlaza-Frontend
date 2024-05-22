import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { CategoryType } from "../../misc/type";
import { CategoryReadDto } from "../../features/categories/categoryDto";

export let mockCategories: CategoryReadDto[] = [
  {
    id: "mock-cate-id",
    name: "category1",
    image: "img",
  },
  {
    id: "mock-cate-id",
    name: "category2",
    image: "img",
  },
];

export const handler = [
  http.get("https://api.escuelajs.co/api/v1/categories", () => {
    return HttpResponse.json(mockCategories, { status: 200 });
  }),
];

export const categoryServer = setupServer(...handler);

import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

import { CategoryType } from "../../misc/type";

export let mockCategories: CategoryType[] = [
  {
    id: 1,
    name: "category1",
    image: "img",
  },
  {
    id: 2,
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

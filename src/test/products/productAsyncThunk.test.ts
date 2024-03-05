import { ProductCreatedType, ProductType } from "../../misc/type";
import productReducer, {
  createProductsAsync,
  deleteProductsAsync,
  fetchAllProductsAsync,
  updateProductsAsync,
} from "../../redux/slices/productSlice";
import store from "../../redux/store";
import { mockCategories } from "../shared/categoryServer";
import { mockProducts, productServer } from "../shared/productServer";

let initialState = {
  products: mockProducts,
  loading: false,
  wishList: [],
  searchKeyword: "",
};
beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

// Test suite
describe("product reducer", () => {
  const createdProduct: ProductCreatedType = {
    title: "New test product 10",
    price: 200,
    description: "New test product 10",
    images: ["product.png"],
    categoryId: 5,
  };
  // create new product
  test("should create new product", async () => {
    await store.dispatch(createProductsAsync(createdProduct));
    expect(store.getState().products.products.length).toBe(1);
  });

  test("deleteProductsAsync removes product from state", async () => {
    // Dispatch the deleteProductsAsync action
    await store.dispatch(deleteProductsAsync(mockProducts[0]));

    // Assert that the product is removed from the state
    expect(store.getState().products.products.length).toBe(1);
  });
  test("updateProductsAsync update a product in the state", async () => {
    // Dispatch the deleteProductsAsync action
    await store.dispatch(updateProductsAsync(mockProducts[0]));
    // Assert that the product is removed from the state
    expect(store.getState().products.products).toEqual({
      ...mockProducts[0],
      title: "new Title",
      price: 999,
    });
  });

  // test fetching asyncthunk with store dispatch
  test("should fetch all products from api", async () => {
    await store.dispatch(
      fetchAllProductsAsync("https://api.escuelajs.co/api/v1/products")
    );
    expect(store.getState().products.products).toEqual(mockProducts);
    expect(store.getState().products.error).toBeUndefined();
  });
});

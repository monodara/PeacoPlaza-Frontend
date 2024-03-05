import { ProductCreatedType, ProductType } from "../../misc/type";
import productReducer, {
  createProductsAsync,
  fetchAllProductsAsync,
} from "../../redux/slices/productSlice";
import store, { createNewStore } from "../../redux/store";
import { mockProducts, productServer } from "../shared/productServer";

// let store = createNewStore();
beforeAll(() => {
  productServer.listen();
});
// beforeEach(() => {
//   store = createNewStore();
// });
afterAll(() => {
  productServer.close();
});
afterEach(() => productServer.resetHandlers());
const initialState = {
  products: [],
  loading: false,
  wishList: [],
  searchKeyword: "",
};

// test suit
describe("product reducer", () => {
  // test0: initial state
  test("should return initial state", () => {
    const state = productReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });
  // test1: fetch data fulfill
  test("should return a list of products", () => {
    const state = productReducer(
      initialState,
      fetchAllProductsAsync.fulfilled(mockProducts, "", "fulfilled")
    );

    expect(state).toEqual({
      products: mockProducts,
      loading: false,
      wishList: [],
      searchKeyword: "",
    });
  });
  // test2: fetch data pending
  test("should have loading truthy when fetch is pending", () => {
    const state = productReducer(
      initialState,
      fetchAllProductsAsync.pending("pending", "")
    );
    expect(state).toEqual({
      products: [],
      loading: true,
      wishList: [],
      searchKeyword: "",
    });
  });
  // test 3: fetch data reject
  test("should have error", () => {
    const error = new Error("error");
    const state = productReducer(
      initialState,
      fetchAllProductsAsync.rejected(error, "", "error")
    );
    expect(state).toEqual({
      products: [],
      loading: false,
      wishList: [],
      searchKeyword: "",
      error: error.message,
    });
  });

  // test fetching async thunk with store dispatch
  test("should fetch all products from api", async () => {
    await store.dispatch(
      fetchAllProductsAsync("https://api.escuelajs.co/api/v1/products")
    );
    expect(store.getState().products.products).toEqual(mockProducts);
    expect(store.getState().products.error).toBeUndefined();
  });
  // create new product
  test("should create new product", async () => {
    const createdProduct: ProductCreatedType = {
      title: "New test product 10",
      price: 200,
      description: "New test product 10",
      images: ["product.png"],
      categoryId: 1,
    };
    await store.dispatch(createProductsAsync(createdProduct));
    expect(store.getState().products.products.length).toBe(3);
  });
});

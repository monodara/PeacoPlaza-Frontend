import { ProductCreatedType, ProductType } from "../../misc/type";
import productReducer, {
  addToWishList,
  createProductsAsync,
  deleteProductsAsync,
  fetchAllProductsAsync,
  getSearchKeyword,
  removeFromWishList,
  updateProductsAsync,
} from "../../redux/slices/productSlice";
import { createNewStore } from "../../redux/store";
import { mockProducts, productServer } from "../shared/productServer";

let store = createNewStore();
beforeAll(() => {
  productServer.listen();
});
beforeEach(() => {
  store = createNewStore();
});
afterAll(() => {
  productServer.close();
});
export const initialState = {
  products: [],
  loading: false,
  wishList: [],
  searchKeyword: "",
};

// test suit
describe("product reducer", () => {
  test("addToWishList function adds a product to wishlist", () => {
    const nextState = {
      ...initialState,
      wishList: [mockProducts[0]],
    };

    const action = addToWishList(mockProducts[0]);
    const resultState = productReducer(initialState, action);

    expect(resultState).toEqual(nextState);
  });

  test("removeFromWishList function removes a product from wishlist", () => {
    const initialState = {
      products: [],
      wishList: mockProducts,
      searchKeyword: "",
      loading: false,
      error: "",
    };

    const nextState = {
      ...initialState,
      wishList: [mockProducts[0]],
    };

    const action = removeFromWishList(mockProducts[1]);
    const resultState = productReducer(initialState, action);

    expect(resultState).toEqual(nextState);
  });

  test("getSearchKeyword function sets search keyword", () => {
    const keyword = "test";

    const nextState = {
      ...initialState,
      searchKeyword: keyword,
    };

    const action = getSearchKeyword(keyword);
    const resultState = productReducer(initialState, action);

    expect(resultState).toEqual(nextState);
  });
  //Fetch data test cases
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

  // create new product cases
  test("createProductsAsync action creates a new product", async () => {
    const newProduct = {
      id: "mock-id-3",
      title: "product3",
      price: 1,
      description: "product3",
      inventory: 10,
    weight: 1.2,
      productImages: [{id:"mock-img-id-1", data:"mock-img-data-1"},{id:"mock-img-id-2", data:"mock-img-data-2"}],
      category: { id: "mock-cate-id", name: "clothes", image: "catImg" },
    };
    const createdProduct: ProductCreatedType = {
      title: "product3",
      price: 1,
      description: "product3",
      productImages: [{id:"mock-img-id-1", data:"mock-img-data-1"},{id:"mock-img-id-2", data:"mock-img-data-2"}],
      categoryId: 1,
    };

    const nextState = {
      ...initialState,
      products: [newProduct],
      loading: false,
    };

    const action = createProductsAsync.fulfilled(
      newProduct,
      "fulfilled",
      createdProduct
    );
    const resultState = productReducer(initialState, action);

    expect(resultState).toEqual(nextState);
  });

  test("deleteProductsAsync action deletes a product", async () => {
    const initialState = {
      products: mockProducts,
      wishList: [],
      searchKeyword: "",
      loading: false,
      error: "",
    };

    const nextState = {
      ...initialState,
      products: [mockProducts[1]],
      loading: false,
    };

    const action = deleteProductsAsync.fulfilled(
      mockProducts[0],
      "fulfilled",
      mockProducts[0]
    );
    const resultState = productReducer(initialState, action);

    expect(resultState).toEqual(nextState);
  });

  test("updateProductsAsync action updates a product", async () => {
    const updatedProduct = {
      ...mockProducts[0],
      title: "Product Updated",
      price: 999,
    };

    const initialState = {
      products: mockProducts,
      wishList: [],
      searchKeyword: "",
      loading: false,
      error: "",
    };

    const nextState = {
      ...initialState,
      products: [updatedProduct, mockProducts[1]],
      loading: false,
    };

    const action = updateProductsAsync.fulfilled(
      updatedProduct,
      "fulfilled",
      mockProducts[0]
    );
    const resultState = productReducer(initialState, action);
    expect(resultState).toEqual(nextState);
  });
});

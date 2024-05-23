import { ProductCreateDto } from "../../features/products/productDto";
import { productsActions, productsReducer } from "../../features/products/productSlice";
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
  items: [],
  loading: false,
  // wishList: [],
};

// test suit
describe("product reducer", () => {
  // test("addToWishList function adds a product to wishlist", () => {
  //   const nextState = {
  //     ...initialState,
  //     wishList: [mockProducts[0]],
  //   };

  //   const action = addToWishList(mockProducts[0]);
  //   const resultState = productReducer(initialState, action);

  //   expect(resultState).toEqual(nextState);
  // });

  // test("removeFromWishList function removes a product from wishlist", () => {
  //   const initialState = {
  //     products: [],
  //     wishList: mockProducts,
  //     searchKeyword: "",
  //     loading: false,
  //     error: "",
  //   };

  //   const nextState = {
  //     ...initialState,
  //     wishList: [mockProducts[0]],
  //   };

  //   const action = removeFromWishList(mockProducts[1]);
  //   const resultState = productReducer(initialState, action);

  //   expect(resultState).toEqual(nextState);
  // });

  //Fetch data test cases
  // test0: initial state
  test("should return initial state", () => {
    const state = productsReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });
  // test1: fetch data fulfill
  test("should return a list of products", () => {
    const state = productsReducer(
      initialState,
      productsActions.fetchAll.fulfilled(mockProducts, "", {urlSuffix: "undefined"})
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
    const state = productsReducer(
      initialState,
      productsActions.fetchAll.pending("pending", {urlSuffix: "undefined"})
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
    const state = productsReducer(
      initialState,
      productsActions.fetchAll.rejected(error, "", {urlSuffix: "undefined"})
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
    const createdProduct: ProductCreateDto= {
      title: "product3",
      price: 1,
      description: "product3",
      // productImages: [{id:"mock-img-id-1", data:"mock-img-data-1"},{id:"mock-img-id-2", data:"mock-img-data-2"}],
      inventory: 10,
      weight: 1.2,
      categoryId: "mock-cate-id",
    };

    const nextState = {
      ...initialState,
      products: [newProduct],
      loading: false,
    };

    const action = productsActions.createOne.fulfilled(
      newProduct,
      "fulfilled",
      createdProduct
    );
    const resultState = productsReducer(initialState, action);

    expect(resultState).toEqual(nextState);
  });

  // test("deleteProductsAsync action deletes a product", async () => {
  //   const initialState = {
  //     products: mockProducts,
  //     wishList: [],
  //     searchKeyword: "",
  //     loading: false,
  //     error: "",
  //   };

  //   const nextState = {
  //     ...initialState,
  //     products: [mockProducts[1]],
  //     loading: false,
  //   };

  //   const action = productsActions.deleteOne.fulfilled(
  //     true,
  //     "fulfilled",
  //     mockProducts[0]
  //   );
  //   const resultState = productsReducer(initialState, action);

  //   expect(resultState).toEqual(nextState);
  // });

  // test("updateProductsAsync action updates a product", async () => {
  //   const updatedProduct = {
  //     title: "update product",
  //     price: 100,
  //     description: "description updated",
  //     productImages: [{id:"mock-img-id-1", data:"mock-img-data-1"},{id:"mock-img-id-2", data:"mock-img-data-2"}],
  //     inventory: 10,
  //     weight: 9.9,
  //     category: { id: "mock-cate-id", name: "clothes", image: "catImg" };
  //     id: "mock-id"
  //   };

  //   const initialState = {
  //     products: mockProducts,
  //     wishList: [],
  //     searchKeyword: "",
  //     loading: false,
  //     error: "",
  //   };

  //   const nextState = {
  //     ...initialState,
  //     products: [updatedProduct, mockProducts[1]],
  //     loading: false,
  //   };

  //   const action = productsActions.updateOne.fulfilled(
  //     updatedProduct,
  //     "fulfilled",
  //     mockProducts[0]
  //   );
  //   const resultState = productsReducer(initialState, action);
  //   expect(resultState).toEqual(nextState);
  // });
});

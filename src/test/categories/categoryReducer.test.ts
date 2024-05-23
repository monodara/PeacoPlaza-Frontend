import { categoriesActions, categoriesReducer } from "../../features/categories/categorySlice";
import store from "../../redux/store";
import { categoryServer, mockCategories } from "../shared/categoryServer";

beforeAll(() => {
  categoryServer.listen();
});

afterAll(() => {
  categoryServer.close();
});
const initialState = {
  items: [],
  loading: false,
};

// test suit
describe("category reducer", () => {
  // 3 tests
  // mock data

  // test0: initial state
  test("should return initial state", () => {
    const state = categoriesReducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });
  // test1: fetch data fulfill
  test("should return a list of categories", () => {
    const state = categoriesReducer(
      initialState,
      categoriesActions.fetchAll.fulfilled(mockCategories, "fulfilled", {urlSuffix: "undefined"})
    );

    expect(state).toEqual({
      categoryList: mockCategories,
      loading: false,
    });
  });
  // test2: fetch data pending
  test("should have loading truthy when fetch is pending", () => {
    const state = categoriesReducer(
      initialState,
      categoriesActions.fetchAll.pending("pending",{urlSuffix: "undefined"})
    );
    expect(state).toEqual({
      categoryList: [],
      loading: true,
    });
  });

  // test 3: fetch data reject
  test("should have error", () => {
    const error = new Error("error");
    const state = categoriesReducer(
      initialState,
      categoriesActions.fetchAll.rejected(error, "error", {urlSuffix: "undefined"})
    );
    expect(state).toEqual({
      categoryList: [],
      loading: false,
      error: error.message,
    });
  });
  // test fetching asyncthunk with store dispatch
  test("should fetch all products from api", async () => {
    await store.dispatch(categoriesActions.fetchAll({urlSuffix: "undefined"}));
    expect(store.getState().categories.items.length).toBe(2);
    expect(store.getState().categories.error).toBeUndefined;
  });
});

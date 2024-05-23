import {
  createAsyncThunk,
  createSlice,
  Draft,
  Slice,
  AnyAction,
} from "@reduxjs/toolkit";
import { AxiosError, AxiosRequestConfig } from "axios";
import { BaseEntity } from "../commonTypes/baseEntity";
import appAxios from "../features/shared/appAxios";

interface BaseState<T extends BaseEntity> {
  items: T[];
  loading: boolean;
  error?: string;
  selectedItem?: T;
}

export const createBaseSlice = <T extends BaseEntity, TCreateDto, TUpdateDto>(
  name: string,
  endpoint: string
) => {
  const initialState: BaseState<T> = {
    items: [],
    loading: false,
  };

  const fetchAll = createAsyncThunk<T[], {
      urlSuffix: string;
      headers?: AxiosRequestConfig["headers"];
    }>(
    `${name}/fetchAll`,
    async ({ urlSuffix, headers }, { rejectWithValue }) => {
        console.log(`${endpoint}${urlSuffix}`)
      try {
        const response = await appAxios.get(`${endpoint}${urlSuffix}`,{headers});
        return response.data;
      } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const createOne = createAsyncThunk<T, TCreateDto>(
    `${name}/createOne`,
    async (createDto, { rejectWithValue }) => {
      try {
        const response = await appAxios.post(endpoint, createDto);
        return response.data;
      } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const updateOne = createAsyncThunk<
    T,
    {
      id: string;
      updateDto: TUpdateDto;
      headers?: AxiosRequestConfig["headers"];
    }
  >(`${name}/updateOne`, async ({ id, updateDto, headers }, { rejectWithValue }) => {
    try {
      const response = await appAxios.patch(`${endpoint}/${id}`, updateDto,{ headers });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  });

  const deleteOne = createAsyncThunk<boolean, { id: string, headers?: AxiosRequestConfig["headers"]; }>(
    `${name}/deleteOne`,
    async ({id, headers}, { rejectWithValue }) => {
      try {
        const response = await appAxios.delete(`${endpoint}/${id}`, {headers});
        return response.data;
      } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const fetchById = createAsyncThunk<T, string>(
    `${name}/fetchById`,
    async (id, { rejectWithValue }) => {
      try {
        const response = await appAxios.get(`${endpoint}/${id}`);
        return response.data;
      } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const extraReducers = (builder: any) => {
    // Fetch all
    builder.addCase(
      fetchAll.fulfilled,
      (state: Draft<BaseState<T>>, action: AnyAction) => {
        state.loading = false;
        state.error = undefined;
        state.items = action.payload as Draft<T>[]; // only happen with generics in redux TS
      }
    );
    builder.addCase(fetchAll.pending, (state: Draft<BaseState<T>>) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      fetchAll.rejected,
      (state: Draft<BaseState<T>>, action: AnyAction) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );

    // Fetch by id
    builder.addCase(
      fetchById.fulfilled,
      (state: Draft<BaseState<T>>, action: AnyAction) => {
        state.loading = false;
        state.error = undefined;
        state.selectedItem = action.payload as Draft<T>;
      }
    );
    builder.addCase(fetchById.pending, (state: Draft<BaseState<T>>) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      fetchById.rejected,
      (state: Draft<BaseState<T>>, action: AnyAction) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );

    // Create one
    builder.addCase(
      createOne.fulfilled,
      (state: Draft<BaseState<T>>, action: AnyAction) => {
        state.loading = false;
        state.error = undefined;
        // state.selectedItem = action.payload as Draft<T>;
        state.items.push(action.payload);
      }
    );
    builder.addCase(createOne.pending, (state: Draft<BaseState<T>>) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      createOne.rejected,
      (state: Draft<BaseState<T>>, action: AnyAction) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
    // Update one
    builder.addCase(
      updateOne.fulfilled,
      (state: Draft<BaseState<T>>, action: AnyAction) => {
        state.loading = false;
        state.error = undefined;
        state.selectedItem = action.payload as Draft<T>;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          // Replace the item in the items array
          state.items[index] = action.payload as Draft<T>;
        }
      }
    );
    builder.addCase(updateOne.pending, (state: Draft<BaseState<T>>) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      updateOne.rejected,
      (state: Draft<BaseState<T>>, action: AnyAction) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
    // Delete one
    builder.addCase(
      deleteOne.fulfilled,
      (state: Draft<BaseState<T>>, action: AnyAction) => {
        state.loading = false;
        state.error = undefined;
        state.items = state.items.filter(user => user.id !== action.payload.id);
      }
    );
    builder.addCase(deleteOne.pending, (state: Draft<BaseState<T>>) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      deleteOne.rejected,
      (state: Draft<BaseState<T>>, action: AnyAction) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
    
  };

  const baseSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers,
  });

  return {
    slice: baseSlice,
    actions: { fetchAll, fetchById, createOne, updateOne, deleteOne },
    extraReducers,
  };
};

export default createBaseSlice;
export type { BaseState };
